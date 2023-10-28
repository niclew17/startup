const totalUsers = 0;

function login() {
  const name = document.querySelector("#loginName");
  const password = document.querySelector("#loginPassword");
  
  if(!localStorage.getItem("profileName")){
    totalUsers++;
  }

  localStorage.setItem("profileName", name.value);
  localStorage.setItem("profilePassword", password.value);
  
  const loginData = {
    "Name": name,
    "Password": password
  };
  const loginjsonData = JSON.stringify(data, null, 2);
  localStorage.setItem("profileJSON", loginjsonData);
  window.location.href = "generator.html";

  

}

  