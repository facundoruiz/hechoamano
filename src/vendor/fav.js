// Función para agregar una URL fav
export const addDesos =(elem) =>{
  
  // {} objeto set id , [] array no set index
    const Desoss = JSON.parse(localStorage.getItem('Desoss')) || {};
   
     Desoss[elem.id]= {...elem} 
    localStorage.setItem('Desoss', JSON.stringify(Desoss));
   // Actualizar la lista de favoritos en tu interfaz de usuario
   //showDeseos() 
  }
 
    
function showDeseos() {
    const DesossContainer = document.getElementById('DesossContainer');
    const Desoss = JSON.parse(localStorage.getItem('Desoss')) || {};
  
    DesossContainer.innerHTML = '';
  
    Desoss.forEach( (metadata) => {
    let  li = document.createElement("li");
      li.setAttribute("class","list-group-item");

      // Crear elementos HTML para mostrar el título, favicon y URL
      const titleElement = document.createElement('div');
      titleElement.textContent = metadata.titulo;
  
      /*const faviconElement = document.createElement('img');
      faviconElement.src = metadata.favicon;
      faviconElement.alt = 'Favicon';
  */
      const urlElement = document.createElement('a');
      urlElement.href = metadata.url;
      urlElement.target = '_blank';
      urlElement.textContent = metadata.url;
  
      // Agregar los elementos al contenedor
      li.appendChild(titleElement);
      
      li.appendChild(urlElement);
      DesossContainer.appendChild(li);
      //DesossContainer.appendChild(document.createElement('br'));
    });
  }
  // Mostrar las URLs favoritas cuando la página se carga
  