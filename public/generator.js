const API_KEY = "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";
document.addEventListener("DOMContentLoaded", function () {
  const nameInput = document.getElementById("Name");
  const positionInput = document.getElementById("Position");
  const jobDescriptionInput = document.getElementById("JobDescription");
  const fileInput = document.getElementById("File");
  const outputTextarea = document.getElementById("output");
  const generateButton = document.getElementById("generateButton");
  


  generateButton.addEventListener("click", function () {

    const name = nameInput.value;
    const position = positionInput.value;
    const jobDescription = jobDescriptionInput.value;
    const selectedFile = fileInput.files[0];
    
    const data = {
      "Applicant Name": name,
      "Job Position": position,
      "Job Description": jobDescription,
      "Selected File": selectedFile ? selectedFile.name : "No file selected",
    };
    const jsonData = JSON.stringify(data, null, 2);
    outputTextarea.value = "This will get outputed to an External API and the received data will go here\n" + jsonData;
  });
});

const generateResponse = (chatElement) => {
  const API_URL = "https://api.openai.com/v1/chat/completions";
  const messageElement = chatElement.querySelector("p");
  // Define the properties and message for the API request
  const requestOptions = {
      method: "POST",
      headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{role: "user", content: userMessage}],
      })
  }
  // Send POST request to API, get response and set the reponse as paragraph text
  fetch(API_URL, requestOptions).then(res => res.json()).then(data => {
      messageElement.textContent = data.choices[0].message.content.trim();
  }).catch(() => {
      messageElement.classList.add("error");
      messageElement.textContent = "Oops! Something went wrong. Please try again.";
  }).finally(() => chatbox.scrollTo(0, chatbox.scrollHeight));
}