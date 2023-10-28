document.addEventListener("DOMContentLoaded", function () {
  // Retrieve values from localStorage
  const outputTextarea = document.getElementById("outputName");
  const outputTextarea2 = document.getElementById("outputPassword");
  const outputTextarea3 = document.getElementById("outputCount");
  // Set values in the profile page
  outputTextarea.value = localStorage.getItem("profileName") || "John Jones";
  outputTextarea2.value = localStorage.getItem("profilePassword") || "*******";
  outputTextarea3.value = localStorage.getItem("counter") || "*******";


  fetch("JSON/generator.json") 
  .then((response) => response.json())
  .then((data) => {
    
    data.forEach((row, index) => {
      if (index === 0) {
          row.rank = 1;
      }
      else {
        row.rank = data[index - 1].rank + 1;
      }
      }); 
    
    data.forEach((row) => {
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
    
    

  )}); 







