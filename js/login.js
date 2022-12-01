//Declaro variables.
let validEmail = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
let email = document.getElementById("email");
let password = document.getElementById("password");

//Genero evento para condicionar el envio de datos.
document.getElementById("formulario").addEventListener('submit', e => {
  e.preventDefault();

  if (validEmail.test(email.value) && password.value !== "") {

    localStorage.setItem("usuario", document.getElementById("email").value);
    localStorage.setItem("password", document.getElementById("password").value);
    window.location = "index.html"
  } else {
    alert("Debes completar ambos campos")
  }
});
