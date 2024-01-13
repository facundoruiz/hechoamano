import {scrollToTop,share} from './util.js'

// Función para agregar una URL fav
export const addDesos =(elem) =>{
  
  // {} objeto set id , [] array no set index
    const Desoss = JSON.parse(localStorage.getItem('Desoss')) || {};
   
     Desoss[elem.id]= {...elem} 
    localStorage.setItem('Desoss', JSON.stringify(Desoss));
   // Actualizar la lista de favoritos en tu interfaz de usuario
   showDeseos() 
  }
 // Función para borrar una URL fav
export const delDesos =(elem) =>{
  
    localStorage.setItem('Desoss', JSON.stringify({}));
    showDeseos() 
  }
    
function showDeseos() {
    const DesossContainer = document.getElementById('DesossContainer'); // un UL
    const Desoss = JSON.parse(localStorage.getItem('Desoss')) || {}; //saco del localstaore
    const corazon = document.getElementById('corazon');
    if (Object.keys(Desoss).length === 0){

      corazon.setAttribute("class","bi bi-heart");
      DesossContainer.innerHTML = '';
    }else{
      corazon.setAttribute("class","bi bi-heart-fill text-danger");
      DesossContainer.innerHTML = '';

      Object.entries(Desoss).forEach(([key, metadata]) => {
     
        let  card = document.createElement("div");
          card.setAttribute("class","card col-md-2 col-sm-3 col-4");
          let body =  document.createElement("div");
          body.setAttribute("class","card-body");
          // Crear elementos HTML para mostrar el título, favicon y URL
          const titleElement = document.createElement('div');
           titleElement.setAttribute("class","card-title");
          titleElement.textContent = '#'+metadata.codigo+' - '+metadata.nombre;
      
          const faviconElement = document.createElement('img');
          faviconElement.src = metadata.src_img;
          faviconElement.alt =  metadata.descripcion;
          faviconElement.setAttribute("class","card-img-top rounded img-thumbnail");
      
          // Agregar los elementos al contenedor
          card.appendChild(faviconElement);
          body.appendChild(titleElement);
          card.appendChild(body);
          DesossContainer.appendChild(card);
          
        });
    }

   
  }


  document.getElementById('btnShowDeseos').addEventListener('click', () => {
    scrollToTop();
  });

  //ejecuta
  showDeseos() 