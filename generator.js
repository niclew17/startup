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
