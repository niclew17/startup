
function login() {
  const name = document.querySelector("#loginName");
  const password = document.querySelector("#loginPassword");
  
  localStorage.setItem("profileName", name.value);
  localStorage.setItem("profilePassword", password.value);

  window.location.href = "generator.html";
}

  