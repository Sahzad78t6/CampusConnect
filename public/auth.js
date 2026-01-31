function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  firebase.auth()
    .signInWithEmailAndPassword(email, password)
    .then(() => {
      window.location.href = "dashboard.html";
    })
    .catch(error => {
      document.getElementById("msg").innerText = error.message;
    });
}
