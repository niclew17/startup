localStorage.setItem("counter", 1);

function login(e) {
  e.preventDefault();
  loginOrCreate(`/api/auth/login`);
}

async function loginOrCreate(endpoint) {
  const userName = document.querySelector('#loginName')?.value;
  const password = document.querySelector('#loginPassword')?.value;
  const response = await fetch(endpoint, {
    method: 'post',
    body: JSON.stringify({ username: userName, password: password }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  if (response.ok) {
    localStorage.setItem('profileName', userName);
    window.location.href = 'generator.html';
  } else if (endpoint.endsWith("/login")) {
    await loginOrCreate(`/api/auth/create`);
  } else {
    const body = await response.json();
    console.log(body.msg);
  }
}
function logout() {
localStorage.removeItem('userName');
fetch(`/api/auth/logout`, {
  method: 'delete',
}).then(() => (window.location.href = '/'));
}