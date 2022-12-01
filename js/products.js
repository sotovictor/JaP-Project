//Declaro variables.
const url = `https://japceibal.github.io/emercado-api/cats_products/${localStorage.getItem("catID")}.json`;
let myArray = [];
let list = [];

//Primer Evento: que me cargue el contenido de la url ya procesado por el json.
document.addEventListener("DOMContentLoaded", async e => {

  let response = await fetch(url);
  response = await response.json();
  console.log(response);
  myArray = response.products;
  contentToAppend(response.products);
  categoriesName(response.catName);
});

//Segundo evento: evento click para el boton "filtrar" y que filtre tomando los precios.
document.getElementById("rangeFilterCount").addEventListener("click", () => {

  let filterCountMin = document.getElementById("rangeFilterCountMin").value;
  let filterCountMax = document.getElementById("rangeFilterCountMax").value;

  list = myArray.filter(list => { return list.cost >= filterCountMin && list.cost <= filterCountMax });
  contentToAppend(list);
});

//Tercer evento: evento click que agregue funcionalidad al boton limpiar, limpiando campos y retornando mi lista nuevamente.
document.getElementById("clearRangeFilter").addEventListener("click", () => {

  document.getElementById("rangeFilterCountMin").value = "";
  document.getElementById("rangeFilterCountMax").value = "";
  contentToAppend(myArray);
});

//Cuarto evento: evento click para el boton ascendente tomando como referencia los precios.
document.getElementById("sortAsc").addEventListener("click", () => {

  myArray.sort((a, b) => {
    if (a.cost < b.cost) {
      return -1;
    }
    if (a.cost > b.cost) {
      return 1;
    }
  });
  contentToAppend(myArray);
});

//Quinto evento: evento click para el boton descendiente tomando como referencia la cantidad de articulos vendidos.
document.getElementById("sortDesc").addEventListener("click", () => {
  myArray.sort((a, b) => {
    if (a.soldCount < b.soldCount) {
      return 1;
    }
    if (a.soldCount > b.soldCount) {
      return -1;
    }
  });
  contentToAppend(myArray);
});

//FUNCIONES
 //1
function contentToAppend(array) {

  let htmlContent = "";

  for (let i = 0; i < array.length; i++) {
    let element = array[i];

    htmlContent += `<div onclick="setCatID(${element.id})" class="list-group-item list-group-item-action cursor-active">
       <div class="row">
    <div class="col-3">
       <img src="${element.image}" alt="${element.description}" class="img-thumbnail">
    </div>
     <div class="col">
       <div class="d-flex w-100 justify-content-between">
           <h4 class="mb-1">${element.name} ${element.currency} ${element.cost}</h4>
           <small class="text-muted">${element.soldCount} artículos</small>
       </div>
     <p class="mb-1">${element.description}</p>
    </div>
   </div>
  </div>`
    document.getElementById("main").innerHTML = htmlContent;
  }
}

//2
function categoriesName(name) {

  document.getElementById("categorieName").innerHTML += `<p class="lead">Verás aquí todos los prodcutos de la categoria ${name}</p>`
}

//3
function setCatID(id) {
  localStorage.setItem("catID", id);
  window.location = "product-info.html"
}

//------------------------------------------------------Desafiate filtro----------------------------------------------------------------

let search = [];

document.getElementById("search").addEventListener("input", (e) => {

  search = myArray.filter(({ name, description }) =>
    name.toLowerCase().includes(e.target.value.toLowerCase()) ||
    description.toLowerCase().includes(e.target.value.toLowerCase())
  );
  if (search.length != "") {
    contentToAppend(search)
  } else {
    document.getElementById("main").innerHTML = `
      <div class"container">
        <p class="text-center mt-5">No se han encontrado resultados de su búsqueda</p>
      </div>`;
  }
});
