import {
  onGetTasks,
  getTask
} from "./productos_crud.js"

import{addDesos,delDesos} from '../vendor/fav.js'

import{filterFunction} from '../vendor/util.js'

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

      template.querySelector(".card-category").textContent = '$ '+taks.precio
      template.querySelector(".card-code").textContent = '#'+taks.codigo

      template.querySelector(".card-title").textContent =  taks.nombre
      template.querySelector(".card-text").textContent = taks.descripcion
      template.querySelector(".btn-deseo").dataset.info = taks.id
      template.querySelector(".btn-share").dataset.info = taks.id
      template.querySelector(".btn-share").dataset.nombre = taks.nombre
      template.querySelector(".btn-share").dataset.codigo = taks.codigo
     
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



document.getElementById('btnLimpiar').addEventListener('click', () => {
  delDesos()
});

window.btnShare = (object) => {
  let id= object.getAttribute('data-info')
  let nombre= object.getAttribute('data-nombre')
  let codigo= object.getAttribute('data-codigo')
  var text = 'Mira! esta ceramica codigo: #'+codigo +' - '+nombre;
  if ('share' in navigator) {
    navigator.share({
      title: document.title+' - '+nombre,
      text: text,
      url: location.href,
    })
  } else {
    // Here we use the WhatsApp API as fallback; remember to encode your text for URI
    location.href = 'https://api.whatsapp.com/send?text=' + encodeURIComponent(text + ' - ') + location.href
  }
}


/****  Buscador */
/*
document.getElementById('buscaInputBtn').addEventListener("keyup", function(event) {
  filterFunction("ListadoProductos","buscaInputBtn");
  var target = event.target;
 
  if (target.classList.contains('clear-data')) {
    toggleClass(target, toggleCondition(target.value), 'x-1');
  }
 });
 
 
 document.addEventListener('mousemove', function (event) {
   var target = event.target;
 
   if (target.classList.contains('x-1')) {
     toggleClass(target, toggleCondition(target.offsetWidth - 18 < event.clientX - target.getBoundingClientRect().left), 'onX-1');
   }
 });
 
 document.addEventListener('touchstart', function (event) {
   var target = event.target;
 
   if (target.classList.contains('onX-1')) {
     toggleClass(target, false, 'x-1', 'onX-1');
     target.value = '';
     triggerEvent(target, 'keyup');
      // Obtener el contenedor del acordeón
      const div = document.getElementById("ListadoProductos");
      const secciones = div.querySelectorAll('.hcf-isotope-item');

      secciones.forEach(seccion => {
        seccion.style.display = 'block';
        
            })
    }
 });
 
 document.addEventListener('click', function (event) {
   var target = event.target;
 
   if (target.classList.contains('onX-1')||target.classList.contains('X-1')) {
     toggleClass(target, false, 'x-1', 'onX-1');
     target.value = '';
     triggerEvent(target, 'keyup');
 
                         // Obtener el contenedor del acordeón
                       const div = document.getElementById("ListadoProductos");
                       const secciones = div.querySelectorAll('.hcf-isotope-item');
 
                       secciones.forEach(seccion => {
                         seccion.style.display = 'block';
                         
                             })
                       
   }
 });
 
 
 function toggleCondition(value) {
   return value ? true : false;
 }
 
 function toggleClass(element, condition, ...classNames) {
   for (var className of classNames) {
     element.classList[condition ? 'add' : 'remove'](className);
   }
 }
 
 function triggerEvent(element, eventName) {
   var event = new Event(eventName);
   element.dispatchEvent(event);
 }
*/