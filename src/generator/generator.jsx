import React from 'react';

import './generator.css';


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

export function Generator(){
    React.useEffect(() => {
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
    return (
    <main className="container-fluid bg-secondary text-center">
        <table id="generate" style={{width:'70%'}}>
            <thead>
            <tr>
              <th colSpan="2"><h1>Generator</h1><p>This generator uses AI to compare an applicant's resume to a given job description, and explains how fit an applicant is for the job.</p></th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <td><input type="text" id="Name" placeholder="Applicant Name" /></td>
              <td><input type="text" id="Position" placeholder="Job Position"  /></td>
            </tr>
            <tr>
              <td><input type="text" id="JobDescription" placeholder="Job Description" /></td>
              <td><input type="text" id="Resume" placeholder="Resume" /></td>
            </tr>
            <tr>
              <td colSpan="2"><div>
                <textarea id="output" name="output" rows="4" cols="90"></textarea>
              <br/>
                <button id="generateButton" type="submit">Generate</button>
              
              </div></td>
             </tr>
             </tbody>
          </table>
          
    </main>
    );
}