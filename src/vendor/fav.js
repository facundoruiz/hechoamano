import { scrollToTop, share } from './util.js'

// Función para agregar una URL fav
export const addDesos = (elem) => {

  // {} objeto set id , [] array no set index
  const Desoss = JSON.parse(localStorage.getItem('Desoss')) || {};

  Desoss[elem.id] = { ...elem }
  localStorage.setItem('Desoss', JSON.stringify(Desoss));
  // Actualizar la lista de favoritos en tu interfaz de usuario
  showDeseos()
}
// Función para borrar una URL fav
export const delDesos = (elem) => {

  localStorage.setItem('Desoss', JSON.stringify({}));
  showDeseos()
}

function showDeseos() {
  const DesossContainer = document.getElementById('DesossContainer'); // un UL
  const Desoss = JSON.parse(localStorage.getItem('Desoss')) || {}; //saco del localstaore
  const corazon = document.getElementById('corazon');
  if (Object.keys(Desoss).length === 0) {

    corazon.setAttribute("class", "bi bi-heart");
    DesossContainer.innerHTML = '';
  } else {
    corazon.setAttribute("class", "bi bi-heart-fill text-danger");
    DesossContainer.innerHTML = '';

    Object.entries(Desoss).forEach(([key, metadata]) => {

      let card = document.createElement("div");
      card.setAttribute("class", "card col-md-2 col-sm-3 col-4");
      let body = document.createElement("div");
      body.setAttribute("class", "card-body");
      // Crear elementos HTML para mostrar el título, favicon y URL
      const titleElement = document.createElement('div');
      titleElement.setAttribute("class", "card-title");
      titleElement.textContent = '#' + metadata.codigo + ' - ' + metadata.nombre;

      const btn = document.createElement('button');
      btn.setAttribute("class", "btn text-danger");
      btn.setAttribute("data-info",metadata.id);
      btn.setAttribute("onclick","btnQuitar(this)");
    
      const icon = document.createElement('i');
      icon.setAttribute("class", "bi bi-heartbreak-fill");
      icon.setAttribute("title", "Quitar !");
      icon.setAttribute("data-bs-toggle-tool", "tooltip" )
      icon.setAttribute("data-bs-title", "Quitar de Lista de Deseos") 
      icon.setAttribute("aria-label", "Quitar de Lista de Deseos" )
      icon.setAttribute("data-bs-original-title", "Quitar de Lista de Deseos")

      const faviconElement = document.createElement('img');
      faviconElement.src = metadata.src_img;
      faviconElement.alt = metadata.descripcion;
      faviconElement.setAttribute("class", "card-img-top rounded img-thumbnail");

      // Agregar los elementos al contenedor
      card.appendChild(faviconElement);
      body.appendChild(titleElement);
      btn.appendChild(icon);
      body.appendChild(btn);
      card.appendChild(body);
      DesossContainer.appendChild(card);

    });
  }


}

export const quitarDesos = (claveAEliminar) =>{
 // Obtén el objeto almacenado en el localStorage (asumiendo que tiene la clave "miObjeto")
const objetoEnLocalStorage = JSON.parse(localStorage.getItem("Desoss")) || {};

// Verifica si la clave que deseas eliminar existe en el objeto
if (objetoEnLocalStorage.hasOwnProperty(claveAEliminar)) {
  // Elimina la propiedad del objeto
  delete objetoEnLocalStorage[claveAEliminar];

  // Guarda el objeto actualizado en el localStorage
  localStorage.setItem("Desoss", JSON.stringify(objetoEnLocalStorage));
} else {
  console.log("La clave no existe en el objeto.");
}
showDeseos()
}


document.getElementById('btnShowDeseos').addEventListener('click', () => {
  scrollToTop();
});

//ejecuta
showDeseos() 