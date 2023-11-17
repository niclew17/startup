document.addEventListener("DOMContentLoaded", function () {
  const nameInput = document.getElementById("Name");
  const positionInput = document.getElementById("Position");
  const jobDescriptionInput = document.getElementById("JobDescription");
  const resumeInput = document.getElementById("Resume");
  const outputTextarea = document.getElementById("output");
  const generateButton = document.getElementById("generateButton");
  


  generateButton.addEventListener("click", function () {

    const name = nameInput.value;
    const position = positionInput.value;
    const jobDescription = jobDescriptionInput.value;
    const resume = resumeInput.value;
    
    const data = {
      "Applicant Name": name,
      "Job Position": position,
      "Job Description": jobDescription,
      "Resume": resume
    };
    const jsonData = JSON.stringify(data, null, 2);
    info = "Please take the following information and compare the Resume with the Job Description and the Job Position, give feedback as to if the candidate would perform well based off of the given information. Here is the information." + jsonData;
    generateResponse(info, data);
    generateButton.setAttribute("disabled", "disabled");
  });
});

const generateResponse = (userMessage, inData) => {
  const API_URL = "https://api.openai.com/v1/chat/completions";
  const messageElement = document.getElementById("output");
  const config = require('.././dbConfig.json');
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${config.KEY}`,
    },  
    body: JSON.stringify({
      model: "gpt-3.5-turbo-0613",
      messages: [{ role: "user", content: userMessage }],
    }),
  };
  console.log(inData);
  fetch(API_URL, requestOptions)
    .then((res) => res.json())
    .then((data) => {
      messageElement.textContent = data.choices[0].message.content.trim();
      let generations = {  
        "name": inData["Applicant Name"],
        "job": inData["Job Position"],
        "response": data.choices[0].message.content.trim()
      };
      fetch('api/generation', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(generations),
      })
      .catch(error => {
        // Handle errors
        console.error('Error:', error);
      });
    })
    .catch((r) => {
      console.log(r);
      messageElement.classList.add("error");
      messageElement.textContent = "Oops! Something went wrong. Please try again.";
    })
    .finally(() => {
      messageElement.scrollTo(0, messageElement.scrollHeight);
      messageElement.style.height = (messageElement.scrollHeight > messageElement.clientHeight) ? (messageElement.scrollHeight)+"px" : "60px";
      generateButton.removeAttribute("disabled");
    });
};
