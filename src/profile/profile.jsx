import React from 'react';

import './profile.css';

export function Profile() {

  // Demonstrates calling a service asynchronously so that
  // React can properly update state objects with the results.
  React.useEffect(() => {
    const outputTextarea = document.getElementById("outputName");
   
    outputTextarea.value = localStorage.getItem("profileName") || "John Jones";
    
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    const socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
  
  
    const outputTextarea3 = document.getElementById("outputCount");
  
    socket.onmessage = async (event) => {
      const data = JSON.parse(await event.data);
      
      if (data.type === 'userCount') {
        // Update the user count display
        outputTextarea3.textContent = `${data.count}`;
      } else {
        // Handle other message types as before
        const chat = data;
        appendMsg('friend', chat.name, chat.msg);
      }
    };


    async function loadGenerations() {
      let generations = [];
      try {
        // Get the latest high scores from the service
        const response = await fetch('/api/generation');
        generations = await response.json();
    
        // Save the scores in case we go offline in the future
        localStorage.setItem('generations', JSON.stringify(generations));
      } catch {
        // If there was an error then just use the last saved scores
        const generationsText = localStorage.getItem('generations');
        if (generationsText) {
          generations = JSON.parse(generationsText);
        }
      }
    
      displayGenerations(generations);
    }
    
    
    function displayGenerations(generations) {
        // Update the DOM with the scores
        generations.forEach((row, index) => {
          if (index === 0) {
              row.rank = 1;
          }
          else {
            row.rank = generations[index - 1].rank + 1;
          }
          }); 
        
        generations.forEach((row) => {
          const downloadButton = `<textarea style='width:100%'>${row.response}</textarea>`;
          
          $("#example").append(
              "<tr>" +
              "<td style='width: 10%'>" + row.rank + "</td>" +  
              "<td style='width: 10%'>" + row.name + "</td>" +
              "<td style='width: 20%'>" + row.job + "</td>" +
              "<td style='width: 60%'>" + downloadButton + "</td>" +
              "</tr>"
          );
        })
          $(document).ready(function () {
            $("#example").DataTable({
                autoWidth: "false",
                scrollY: true,
                scrollX: true,
                tableLayout: fixed,
                dom: '<lf<t>Bip>',
                lengthMenu: [
                  [10, 20, 25, 50, -1],
                  [10, 20, 25, 50, "All"]
                ],
                columnDefs: [
                  { "width": "100px", "targets": 0 },
                  { "width": "250px", "targets": 1 },
                  { "width": "70px", "targets": 2 },
                  { "width": "70px", "targets": 3 },
                ],
                buttons: [
                  'csv',
                  {
                    extend: 'pdfHtml5',
                    orientation: 'landscape',
                    pageSize: 'LEGAL'
                  },
                ],
              });
            });
        }

      
    
    
      loadGenerations();
  }, []);

  return (
    <main className="container-fluid bg-secondary text-center" style={{marginTop:"80px"}}> 
      <div className="polaroid" style={{width: "100%"}}>
        <img src="images/ProfilePicture.png" alt="AppliRank" width="400px"/>
        <div className="container">
            <h1>Profile</h1>
            <p>
            <textarea id="outputName" name="output" rows="1" cols="20" readOnly></textarea>
            </p>
            <label htmlFor="count">Users Online:</label>
            <p><textarea id="outputCount" name="output" rows="1" cols="20" readOnly></textarea>
            </p>
      </div>
      </div>
        <div className="table" style={{width: "100%"}}>
            <table id="example" className="table-striped hover" style={{width: "100%"}}>
            <thead>
                <tr>
                <th>Number</th>
                <th>Candidate</th>
                <th>Job</th>
                <th>Download</th>
                </tr>
            </thead>
            <tbody id="profileTableBody">
            </tbody>
            </table>
        </div>
    </main>
  );
}
