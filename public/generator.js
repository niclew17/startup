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
    generateResponse(info);
  });
});

const generateResponse = (userMessage) => {
  const API_URL = "https://api.openai.com/v1/chat/completions";
  const messageElement = document.getElementById("output");

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${API_KEY}`,
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: userMessage }],
    }),
  };

  fetch(API_URL, requestOptions)
    .then((res) => res.json())
    .then((data) => {
      messageElement.textContent = data.choices[0].message.content.trim();
    })
    .catch(() => {
      messageElement.classList.add("error");
      messageElement.textContent = "Oops! Something went wrong. Please try again.";
    })
    .finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
};
