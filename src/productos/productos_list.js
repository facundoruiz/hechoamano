import {
  onGetTasks
} from "./productos_crud.js"
import {
  showMessage
} from "../vendor/showMessage.js";

export const showTareas = () => {

  const postList = document.querySelector(".taks-recent");

  onGetTasks((querySnapshot) => {
    let html = "";
    querySnapshot.forEach((taks) => {

          // Convertir el campo createdAt a una fecha legible
      //  const createdAt = new Date(taks.createdAt.seconds * 1000); // Multiplicar por 1000 para convertir a milisegundos
     // const createdAt = getTimeAgo(taks.createdAt);
      const li = `
      <div class="col-lg-3 col-sm-6">
      <div class="single-post-wrap style-white">
          <div class="thumb">
              <img src="${taks.src_img}" alt="${taks.nombre}">
              <a class="tag-base tag-blue" href="cat-tech.html">${taks.category}</a>
          </div>
          <div class="details">
          <h2 class="title">${taks.nombre}</h2>
              <h6 class="descrip">${taks.descripcion}</h6>
              <div class="post-meta-single mt-3">
                  <ul>
                      <li><i class="fa fa-mone"></i>${taks.precio}</li>
                  </ul>
              </div>
          </div>
      </div>
  </div>
    `;
      html += li;
    });
    postList.innerHTML = html;
  });


  
}


