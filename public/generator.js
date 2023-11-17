
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
    generateResponse(data);
    generateButton.setAttribute("disabled", "disabled");
  });
});

const generateResponse = (inData) => {
  const messageElement = document.getElementById("output");
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
        inData:inData 
      }),
  };
  fetch('/api/chat', requestOptions)
  .then(r=>r.json()).then(r=>{
    messageElement.textContent = r.msg;
  })
  .catch((r) => {
    messageElement.classList.add("error");
    messageElement.textContent = "Oops! Something went wrong. Please try again.";
  })
  .finally((r) => {
    messageElement.scrollTo(0, messageElement.scrollHeight);
    messageElement.style.height = (messageElement.scrollHeight > messageElement.clientHeight) ? (messageElement.scrollHeight)+"px" : "60px";
    generateButton.removeAttribute("disabled");
  });
};
