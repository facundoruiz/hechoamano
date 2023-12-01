import {
  onGetTasks
} from "./productos_crud.js"
import imagesLoaded from "imagesloaded";

export const showTareas = () => {

  const postList = document.querySelector(".hcf-isotope-grid");

  onGetTasks((querySnapshot) => {
    let html = "";
    querySnapshot.forEach((taks) => {

      // Convertir el campo createdAt a una fecha legible
      //  const createdAt = new Date(taks.createdAt.seconds * 1000); // Multiplicar por 1000 para convertir a milisegundos
      // const createdAt = getTimeAgo(taks.createdAt);


      const li = `
      <div class="hcf-isotope-item">
        <a class="rounded rounded-4" href="#!">
        <div  class="hcf-masonry-card ">
        <img  alt="${taks.nombre}" class="card-img " loading="lazy" src="${taks.src_img}">
        <div class="card-category text-white text-center float-end">${taks.category}</div>
        <div class="card-code float-start text-white"> #${taks.codigo}</div>
            <div class="card-overlay d-flex flex-column justify-content-center bg-dark p-4" style="--bs-bg-opacity: .5;">
               <h3 class="card-title text-white text-center mb-1">${taks.nombre} </h3>
               <p class="card-text text-white text-center">${taks.descripcion}</p>
            </div>    
            </div>    
        </a>
    </div>   
    `;
    postList.innerHTML += li;
    });
   
  });

  
  
}

/*
function resizeGridItem(item) {
  // Obtén la cuadrícula y las propiedades de fila
  const grid = document.querySelector(".hcf-isotope-grid");
  const rowHeight = parseInt(window.getComputedStyle(grid).gridAutoRows);
  const rowGap = parseInt(window.getComputedStyle(grid).gridRowGap);
  const masonryCard = item.querySelector(".hcf-masonry-card");
  
  // Verificar si se obtuvieron correctamente las propiedades necesarias
  if (masonryCard && !isNaN(rowHeight) && !isNaN(rowGap)) {
      const elementHeight = masonryCard.getBoundingClientRect().height;
  
      // Verificar si la altura del elemento es válida para evitar divisiones por cero
      if (elementHeight > 0) {
          const calculatedRows = Math.ceil((elementHeight + rowGap) / (rowHeight + rowGap));
          item.style.gridRowEnd = `span ${calculatedRows}`;
      } else {
          console.error("La altura del elemento es cero o negativa.");
          item.style.gridRowEnd = `span 1`;
      }
  } else {
    item.style.gridRowEnd = `auto`;
      console.error("No se pudieron obtener las propiedades necesarias para el cálculo.");
  }
}
*/
function resizeGridItem(item){
 let grid = document.getElementsByClassName("hcf-isotope-grid")[0];
 let rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
 let rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
 let rowSpan = Math.ceil((item.querySelector('.hcf-masonry-card').getBoundingClientRect().height+rowGap)/(rowHeight+rowGap));
    item.style.gridRowEnd = "span "+rowSpan;
}



export const resizeAllGridItems = () => {
  let allItems = document.querySelectorAll(".hcf-isotope-item");
    // Itera sobre los elementos utilizando forEach
  allItems.forEach(function (item) {
    // Llama a imagesLoaded para cada elemento
    resizeGridItem(item)
   
  });

}

export const resizeInstance = (instance)=> {
  let item = instance.elements[0];
  resizeGridItem(item);
}

window.addEventListener("resize", resizeAllGridItems);
