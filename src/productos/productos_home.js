import {
  listar
} from "./productos_crud.js"

import { addDesos, delDesos } from '../vendor/fav.js'


const productoslist = []
const gridProductos = document.querySelector(".hcf-isotope-grid");
const loadingElement = document.querySelector(".cargando");
// load more books (scroll)
let block = false

export const showTareas = async () => {

  listar((querySnapshot) => {
        
    // if (querySnapshot.empty) {
    //     block =true
    //   window.removeEventListener('scroll', handleScroll);
    //   return;
    // }
    const fragment = document.createDocumentFragment();
    const template = document.querySelector("#templateProduct").content;

    querySnapshot.forEach((taks) => {

      template.querySelector(".produto-img").src = taks.src_img ? taks.src_img : '';
      template.querySelector(".produto-img").alt = taks.nombre ? taks.nombre : '';
      template.querySelector(".produto-img").title = taks.nombre ? taks.nombre : '';
      template.querySelector(".produto-img-url").href = taks.src_img ? taks.src_img : '#';

      template.querySelector(".card-category").textContent = '$ ' + taks.precio
      template.querySelector(".card-code").textContent = '#' + taks.codigo

      template.querySelector(".card-title").textContent = taks.nombre
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

  })

}

/**
 *  fn para agregar al lista de deseo
 */
//https://copyprogramming.com/howto/how-to-export-function-with-webpack
window.btnDeseo = (object) => {
  let id = object.getAttribute('data-info')
  productoslist.forEach((elem) => {
    if (elem.id == id)
      addDesos(elem)
  })
}


document.getElementById('btnLimpiar').addEventListener('click', () => {
  delDesos()
});

window.btnShare = (object) => {
  let id = object.getAttribute('data-info')
  let nombre = object.getAttribute('data-nombre')
  let codigo = object.getAttribute('data-codigo')
  var text = 'Mira! esta ceramica codigo: #' + codigo + ' - ' + nombre;
  if ('share' in navigator) {
    navigator.share({
      title: document.title + ' - ' + nombre,
      text: text,
      url: location.href,
    })
  } else {
    // Here we use the WhatsApp API as fallback; remember to encode your text for URI
    location.href = 'https://api.whatsapp.com/send?text=' + encodeURIComponent(text + ' - ') + location.href
  }
}


export const handleScroll = async () => {
  const scrollHeight = window.scrollY;
  const viewportHeight = document.documentElement.clientHeight;
  const moreScroll = document.getElementById('mas-post').offsetTop;
  const currentScroll = scrollHeight + viewportHeight;


  if ((currentScroll >= moreScroll) && block === false) {
    block = true;

    loadingElement.style.display = "block";
    window.setTimeout(() => {
      // Espera 300 milisegundos antes de ocultar el elemento

      // Oculta el elemento cambiando el estilo
      loadingElement.style.display = "none";
       showTareas()
        block = false;
    }, 2000);
  }


}

