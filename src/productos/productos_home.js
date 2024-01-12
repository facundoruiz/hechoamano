import {
  onGetTasks,
  getTask
} from "./productos_crud.js"

import{addDesos} from '../vendor/fav.js'

const productoslist = []

export const showTareas = () => {

  const gridProductos = document.querySelector(".hcf-isotope-grid");

  onGetTasks((querySnapshot) => {
    let html = "";
    const fragment = document.createDocumentFragment();
    const template = document.querySelector("#templateProduct").content;

    querySnapshot.forEach((taks) => {

       template.querySelector(".produto-img").src = taks.src_img ? taks.src_img : '';
      template.querySelector(".produto-img").alt = taks.nombre ? taks.nombre : '';
      template.querySelector(".produto-img").title = taks.nombre ? taks.nombre : '';

      template.querySelector(".card-category").textContent = taks.precio
      template.querySelector(".card-code").textContent = taks.codigo

      template.querySelector(".card-title").textContent = taks.nombre
      template.querySelector(".card-text").textContent = taks.descripcion
      template.querySelector(".btn-deseo").dataset.info = taks.id

      const clone = template.cloneNode(true);
      // const clone = document.importNode(template, true);
     fragment.appendChild(clone);
     productoslist.push({ ...taks });
    });
    gridProductos.appendChild(fragment)

 

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
function resizeGridItem(item) {
  let grid = document.getElementsByClassName("hcf-isotope-grid")[0];
  let rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
  let rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap'));
  let rowSpan = Math.ceil((item.querySelector('.hcf-masonry-card').getBoundingClientRect().height + rowGap) / (rowHeight + rowGap));
  item.style.gridRowEnd = "span " + rowSpan;

}



export const resizeAllGridItems = () => {
  let allItems = document.querySelectorAll(".hcf-isotope-item");
  // Itera sobre los elementos utilizando forEach
  allItems.forEach(function (item) {
    // Llama a imagesLoaded para cada elemento
    resizeGridItem(item)

  });


}

export const resizeInstance = (instance) => {
  let item = instance.elements[0];
  resizeGridItem(item);
}

window.addEventListener("resize", resizeAllGridItems);

/**
 * Botonpara despertar loselelemtos dibujados no funciona bien
 */
export const wakeBtn = () => {
  console.log('wu');
  /**
   * cuando hagan click en deseo
   */

  const btnDeseo = document.querySelectorAll(".btn-deseo");
  btnDeseo.forEach((btn) => {
    btn.addEventListener("click", async (event) => {
      try {
        /*    const doc = await getTask(event.target.dataset.info);
            const task = doc.data();*/
        console.log(event.target.dataset.info);
      } catch (error) {
        console.log(error);
      }
    });
  });
}

/**
 *  fn para agregar al lista de deseo
 */
//https://copyprogramming.com/howto/how-to-export-function-with-webpack
window.btnDeseo  =  (object) =>{
  let id= object.getAttribute('data-info')
  productoslist.forEach((elem)=>{
    if(elem.id==id)
    addDesos(elem)
  })
}