import {
  onGetTasks
} from "./productos_crud.js"


export const showTareas = () => {

  const postList = document.querySelector(".taks-recent");

  onGetTasks((querySnapshot) => {
    let html = "";
    querySnapshot.forEach((taks) => {

          // Convertir el campo createdAt a una fecha legible
      //  const createdAt = new Date(taks.createdAt.seconds * 1000); // Multiplicar por 1000 para convertir a milisegundos
     // const createdAt = getTimeAgo(taks.createdAt);


      const li = `
      <div class="col-12 col-md-6 col-lg-3 hcf-isotope-item">
        <a class="hcf-masonry-card rounded rounded-4" href="#!">
            <img  alt="${taks.nombre}" class="card-img img-fluid" loading="lazy" src="${taks.src_img}">
            <div class="card-overlay d-flex flex-column justify-content-center bg-dark p-4" style="--bs-bg-opacity: .5;">
            <h3 class="card-title text-white text-center mb-1">${taks.nombre}</h3>
            <div class="card-category text-white text-center">${taks.category}</div>
          <p class="card-text text-white text-center">${taks.descripcion}</p>
        
        </a>
      
    </div>
      
    `;
      html += li;
    });
    postList.innerHTML = html;
  });


  
}


