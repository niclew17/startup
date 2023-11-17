document.addEventListener("DOMContentLoaded", function () {
  const outputTextarea = document.getElementById("outputName");
  const outputTextarea3 = document.getElementById("outputCount");
  outputTextarea.value = localStorage.getItem("profileName") || "John Jones";

}); 



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
        const downloadButton = '<button id=dwn-btn class="download-button">' + row.download + '</button>';
        $("#example").append(
          "<tr>" +
          "<td>" + row.rank + "</td>" +
          "<td>" + row.name + "</td>" +
          "<td>" + row.job + "</td>" +
          "<td>" + downloadButton + "</td>" +
          "</tr>"
        );
      });
    
    
      $(document).ready(function () {
       $("#example").DataTable({
          autoWidth: true,
          scrollY: true,
          scrollX: true,
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












