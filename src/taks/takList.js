import {
  onGetTasks,
  saveTask
} from "./takCRUD.js"
import {
  showMessage
} from "./../vendor/showMessage.js";

export const showTareas = () => {

  const postList = document.querySelector(".taks-recent");

  onGetTasks((querySnapshot) => {
    let html = "";
    querySnapshot.forEach((taks) => {

      const user = taks.user;

      // Convertir el campo createdAt a una fecha legible
      //  const createdAt = new Date(taks.createdAt.seconds * 1000); // Multiplicar por 1000 para convertir a milisegundos
      const createdAt = getTimeAgo(taks.createdAt);
      const li = `
      <div class="d-flex text-body-secondary pt-3">
        <svg class="bd-placeholder-img flex-shrink-0 me-2 rounded" width="32" height="32"
          xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${user.name}"
          preserveAspectRatio="xMidYMid slice" focusable="false">
          <title>${user.name}</title>
          <rect width="100%" height="100%" fill="${user.color}" />
        </svg>
       
        <p class="pb-3 mb-0 small lh-sm border-bottom">
          <strong class="d-block text-gray-dark">${user.name}</strong>
          ${taks.tak}<br/>
          ${taks.lugar}<br/>
          <small>${createdAt}</small>
          <span class="badge text-bg-secondary">estado</span>
        </p>
      </div>
    `;
      html += li;
    });
    postList.innerHTML = html;
  });


  
}




const taskForm = document.getElementById("taks-form");

const btnAddTak = document.querySelector("#save-tak");

// Función para cuando hagan click en boton y  autenticar con Google y guardar el usuario en Firestore
//btnAddTak.addEventListener("click", async (e) => {
taskForm.addEventListener("submit", async (e) => {


e.preventDefault();
  const lugar = taskForm["lugar"];
  const estado = 1;
  const tak = taskForm["tarea"]
  if (saveTask(estado, lugar.value, tak.value)) {
    // show  message
    taskForm.reset();
    lugar.focus();
    showMessage("Tarea Guardada!");
    //window.location.href = "./";
  } else {
    showMessage(" tareasa  Ree", error);
  }


})


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
