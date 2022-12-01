//Variables
const urlInfo = `https://japceibal.github.io/emercado-api/products/${localStorage.getItem("catID")}.json`;
const urlComments = `https://japceibal.github.io/emercado-api/products_comments/${localStorage.getItem("catID")}.json`

//Funcion async
async function getJson(url) {
  let response = await fetch(url);
  response = await response.json();
  console.log(response);
  return response;
}

//Evento
document.addEventListener("DOMContentLoaded", async e => {
  let response = await getJson(urlInfo);
  let { id, name, description, cost, currency, soldCount, category, images, relatedProducts } = response;
  document.getElementById("title").innerText = name;
  document.getElementById("cost").innerText = cost, currency;
  document.getElementById("description").innerText = description;
  document.getElementById("category").innerText = category;
  document.getElementById("soldCount").innerText = soldCount;

  document.getElementById("images").innerHTML +=

    `<div class="row d-flex justify-content-center">
    <div id="carouselExampleControls" class="carousel slide w-25 d-flex justify-content-center border"
      data-bs-ride="carousel">
      <div class="carousel-inner" id="Prueba">
        <div class="carousel-item active">
          <img src="${images[0]}" alt="${description}" width="400">
        </div>`
  for (let i = 1; i < images.length; i++) {
    let element = images[i]; document.getElementById("Prueba").innerHTML += `
          <div class="carousel-item">
          <img src="${element}" width="400" alt="${description}">
      </div>
      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>`
  }

  let result = await getJson(urlComments);
  for (let i = 0; i < result.length; i++) {
    let element = result[i];
    document.getElementById("comments").innerHTML += `
               <div class="p-2 bg-light border">
                  <p><strong>${element.user}</strong> ${element.dateTime} ${myStar(element.score)}</p>
                  <p>${element.description}</p>
               </div>
               `
  }

  document.getElementById("related").innerHTML += `
  <div class="container">
    <div id="Prueba2" class="row">`
relatedProducts.forEach(element =>
 document.getElementById("Prueba2").innerHTML += `
         <div class="col" "p-2 bg-light border">
             <div onclick="setProductID(${element.id})" class="list-group-item-action cursor-active">
               <img src="${element.image}" width="350" alt="${description}" class="img-thumbnail">
               <p> ${element.name} </p>
             </div>
         </div>
     </div> 
  </div> `)

//----------------------------------------------Desafiate. (Agregar productos al carrito.)------------------------------------------
  document.getElementById("buttonBuy").addEventListener("click", (e) => {

    let myCart = new Object();
    myCart.id = id;
    myCart.name = name;
    myCart.cost = cost;
    myCart.currency = currency;
    myCart.images = images[0];
    window.location = "cart.html"
    localStorage.setItem("buyProduct", JSON.stringify(myCart));
  });
});
//-----------------------------------------------------------------------------------------------------------------------------------

//Funciones
//1
function myStar(element) {
  let score = "";
  for (let i = 1; i <= 5; i++) {
    if (i <= element) {
      score += "<span class='fa fa-star checked'></span>";
    } else {
      score += "<span class='fa fa-star'></span>";
    }
  }
  return score;
}

//2
let cont;
function calificar(item) {
  console.log(item);
  cont = item.id[0]; //capturar el id de cada estrella
  let name = item.id.substring(1); //captura todo menos el primer caracter. EJ: 3star= star
  for (let i = 0; i < 5; i++) {
    if (i < cont) {
      document.getElementById((i + 1) + name).style.color = "orange";
    }
    else {
      document.getElementById((i + 1) + name).style.color = "black";
    }
  }
}

//3
function setProductID(id) {
  localStorage.setItem("catID", id);
  window.location = "product-info.html"
}