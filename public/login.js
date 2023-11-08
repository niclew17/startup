localStorage.setItem("counter", 1);

function login() {
  const name = document.querySelector("#loginName");
  const password = document.querySelector("#loginPassword");

  localStorage.setItem("profileName", name.value);
  localStorage.setItem("profilePassword", password.value);
  
  console.log(name.value);
  console.log(password.value);
  const loginData = {
    "Name": name.value,
    "Password": password.value
  };
  const loginjsonData = JSON.stringify(data, null, 2);
  localStorage.setItem("profileJSON", loginjsonData);
  window.location.href = "generator.html";
  
}
function addUser() {
  const currentCounter = parseInt(localStorage.getItem("counter")) || 0;
  const newCounter = currentCounter + 1;
  localStorage.setItem("counter", newCounter);
}

  