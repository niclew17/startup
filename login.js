
function login() {
  const name = document.querySelector("#loginName");
  const password = document.querySelector("#loginPassword");
  
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

  