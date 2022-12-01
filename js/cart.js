//Delcaro variable array vacio
let myArray = [];

//Declaro variable
const userID = `https://japceibal.github.io/emercado-api/user_cart/25801.json`

//Genero evento al cargar el sistema muestre datos
document.addEventListener("DOMContentLoaded", async e => {
  let response = await fetch(userID);
  response = await response.json();
  let {user, articles} = response;
  myArray = articles;
  contentToAppend(myArray)
  subtotal(myArray)
  calcEnvioYTotal()
})

//Creo funcion que reescriba HTML
function contentToAppend(array) {
 
  let htmlContent = "";

 for (let i = 0; i < array.length; i++) {
   let element = array[i];

   htmlContent =`
           <tr>
             <th scope="row"></th>
             <td> <img width="80x" src="${element.image}" alt="${element.name}"></td>
             <td>${element.name}</td>
             <td>${element.currency} ${element.unitCost}</td>
             <td><input type="number" id="cantidad" name="cantidad" value="${element.count}"
             min="0" max="100"></td>
             <td id="subtotal1" class="fw-bold">${element.unitCost}</td>
           </tr>`

   document.getElementById("container").innerHTML = htmlContent;
   document.getElementById("subtotal2").innerText = document.getElementById("subtotal1").innerHTML;
  }
}

//Funcion input
function subtotal(array) {
  for (let element of array) {
    document.getElementById("cantidad").addEventListener("input", () => {
      document.getElementById("CostoEnvio").innerText = "";
      document.getElementById("Total").innerText = "";
      document.getElementById("subtotal1").innerText = document.getElementById("cantidad").value * element.unitCost;
      document.getElementById("subtotal2").innerText = document.getElementById("subtotal1").innerHTML;
    })
  }
}

//Funcion que se encarga de calcular los costos de envio y total.
function calcEnvioYTotal() {
  let subTotalNumber;

  document.getElementById("premiun").addEventListener("click", () => {
    subTotalNumber = Number(document.getElementById("subtotal2").innerText)
    if (document.getElementById("premiun").cheked = true) {
      document.getElementById("CostoEnvio").innerText = (subTotalNumber * 0.15).toFixed(2);
      document.getElementById("Total").innerText = (subTotalNumber + (subTotalNumber * 0.15)).toFixed(2);
    }
  })
  document.getElementById("express").addEventListener("click", () => {
    subTotalNumber = Number(document.getElementById("subtotal2").innerText)
    if (document.getElementById("express").cheked = true) {
      document.getElementById("CostoEnvio").innerText = (subTotalNumber * 0.07).toFixed(2);
      document.getElementById("Total").innerText = (subTotalNumber + (subTotalNumber * 0.07)).toFixed(2);
    }
  })
  document.getElementById("standard").addEventListener("click", () => {
    subTotalNumber = Number(document.getElementById("subtotal2").innerText)
    if (document.getElementById("standard").cheked = true) {
      document.getElementById("CostoEnvio").innerText = (subTotalNumber * 0.05).toFixed(2);
      document.getElementById("Total").innerText = (subTotalNumber + (subTotalNumber * 0.05)).toFixed(2);
    }
  })
}

//Funcion Bootstrap para deshabilitar el envío de formularios si hay campos no válidos

(function () {
  'use strict'
  let forms = document.querySelectorAll('.needs-validation')
  Array.prototype.slice.call(forms)
    .forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (!form.checkValidity()) {
          event.preventDefault()
          event.stopPropagation()
        }
        form.classList.add('was-validated')
      }, false)
    })
})()

//Funcion que checkea los botones en el modal y envia la alerta si los inputs no estan vacios.
function myAlert() {
  let btnTarjeta = document.getElementById("btnTarjeta");
  let btntrans = document.getElementById("btnTransferencia");
  let inputs = document.querySelectorAll("input");

  if (!btnTarjeta.cheked && !btntrans.checked) {
    document.getElementById("divError").innerHTML = `<div class="text-danger">Debe seleccionar una forma de pago y completar los campos</div>`
  }
  else if (inputs[4].value === "" || inputs[5].value === "" || inputs[6].value === "") {
    document.getElementById("alertafinal").innerHTML = "";
  } else {
    document.getElementById("alertafinal").innerHTML = `<div class="alert alert-success" role="alert">
                                                          ¡Has comprado con éxito!
                                                         </div>`
  }
}
//----------------------------------------Medios de pagos.----------------------------------------

document.getElementById("btnTransferencia").addEventListener("click", () =>{
  document.getElementById("divError").innerHTML = ""
  document.getElementById("tipodepago").innerHTML = `Usted ha seleccionado: <span class="fw-bold">Transferencia bancaria</span>`;
  document.getElementById("numeroCuenta").disabled = false;
  document.getElementById("fieldset").disabled = true;
})

document.getElementById("btnTarjeta").addEventListener("click", () =>{
  document.getElementById("divError").innerHTML = ""
  document.getElementById("tipodepago").innerHTML = `Usted ha seleccionado: <span class="fw-bold">Tarjeta de credito</span>`;
  document.getElementById("fieldset").disabled = false;
  document.getElementById("numeroCuenta").disabled = true;
})
