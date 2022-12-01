//Evento que al cargar el sistema checkea el local storage.
document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("infoProfile") != null && localStorage.getItem("infoProfile") != "undefined") {
        
        let obj = JSON.parse(localStorage.getItem("infoProfile"));
        document.getElementById("FirstName").value = obj.FirstName;
        document.getElementById("SecondName").value = obj.SecondName;
        document.getElementById("FirstLastName").value = obj.FirstLastName;
        document.getElementById("SecondLastName").value = obj.SecondLastName;
        document.getElementById("email").value = obj.email;
        document.getElementById("contact").value = obj.contact;
    } else {
        document.getElementById("email").value = localStorage.getItem("usuario");
    }
})
//Evento que condiciona el envio de datos.
document.querySelector("form").addEventListener("submit", e => {
    e.preventDefault();
    if (e.target.FirstName.value !== "" && e.target.FirstLastName.value !== "" && e.target.email.value !== "") {
        const data = Object.fromEntries(new FormData(e.target));
        localStorage.setItem("infoProfile", JSON.stringify(data));
        document.getElementById("alert").innerHTML = `<div class="alert alert-success alert-dismissible fade show" role="alert">
                                                         Se han Guardado los datos.
                                                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                       </div>`
    } else {
        document.getElementById("alert").innerHTML = `<div class="alert alert-danger alert-dismissible fade show" role="alert">
                                                         Debes completar todos los campos
                                                        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                                       </div>`
    }
})
//Funcion para cargar la imagen
function previewImage() {
    let file = document.getElementById("img").files;
    if (file.length > 0) {
        let fileReader = new FileReader();
        fileReader.onload = function (event) {
            document.getElementById("previewimage").setAttribute("src", event.target.result);
        };
        fileReader.readAsDataURL(file[0]);
    }
}