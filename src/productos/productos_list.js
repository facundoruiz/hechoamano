import {
  onGetTasks,
  saveTask
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
      const createdAt = getTimeAgo(taks.createdAt);
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
                      <li><i class="fa fa-clock-o"></i>${createdAt}</li>
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




const taskForm = document.getElementById("taks-form");
if(taskForm){

  const btnAddTak = document.querySelector("#save-tak");
  
// Función para cuando hagan click en boton y  autenticar con Google y guardar el usuario en Firestore
//btnAddTak.addEventListener("click", async (e) => {
  taskForm.addEventListener("submit", async (e) => {

    
    e.preventDefault();
    
    console.log(taskForm["formFile"].files[0]);

  if (saveTask( taskForm,file)) {
    // show  message
    taskForm.reset();
    taskForm['nombre'].focus();
    showMessage("pieza Guardada!");
    //window.location.href = "./";
  } else {
    showMessage(" Errror", error);
  }
  
  
})

}

const DATE_UNITS = {
  day: 86400,
  hour: 3600,
  minute: 60,
  second: 1
};

const getSecondsDiff = timestamp => {
  const now = new Date();
  const timestampDate = timestamp instanceof Date ? timestamp : timestamp.toDate();
  return (now.getTime() - timestampDate.getTime()) / 1000;
};


const getUnitAndValueDate = secondsElapsed => {
  for (const [unit, secondsInUnit] of Object.entries(DATE_UNITS)) {
    if (secondsElapsed >= secondsInUnit || unit === "second") {
      const value = Math.floor(secondsElapsed / secondsInUnit) * -1;
      return { value, unit };
    }
  }
};

const getTimeAgo = timestamp => {
  if (!timestamp) {
    return 'recien';
  }
  const rtf = new Intl.RelativeTimeFormat();

  const secondsElapsed = getSecondsDiff(timestamp);
  const { value, unit } = getUnitAndValueDate(secondsElapsed);
  return rtf.format(value, unit);
};
