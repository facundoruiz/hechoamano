import {
  onGetTasks,
  saveTask, getTask
} from "./productos_crud.js"
import {
  showMessage
} from "../vendor/showMessage.js";


const productoList = document.getElementById("tablaProducto");
export const showTareas = () => {

  // Obtener la referencia del elemento TBODY de la tabla.
  let tBody = productoList.getElementsByTagName("tbody")[0];
  let elemento
  const fragment = document.createDocumentFragment();
  const template = document.querySelector("#productrow").content;


  onGetTasks((querySnapshot) => {
    elemento = 0;
    tBody.innerHTML = ""

    querySnapshot.forEach((task) => {

      elemento++;
      template.querySelectorAll('td')[0].textContent = elemento;
      //https://sabe.io/blog/javascript-change-image-src
      template.querySelector(".productrow-image").src = task.src_img ? task.src_img : '';
      template.querySelector(".productrow-image").alt = task.nombre ? task.nombre : '';
      template.querySelector(".productrow-image").title = task.nombre ? task.nombre : '';
      template.querySelector(".productrow-image").width = '80';

      template.querySelectorAll('td')[2].textContent = task.nombre
      template.querySelectorAll('td')[3].textContent = task.precio
      template.querySelector(".btn-edit").dataset.id = task.id

      const clone = template.cloneNode(true);
      // const clone = document.importNode(template, true);
      fragment.appendChild(clone);

    });
    tBody.appendChild(fragment)
    wakeBtn() //agrego aqui para que cada vez q se liste despierte a los btn edit
  });

}

const taskForm = document.getElementById("taks-form");

if (taskForm) {

  const btnAddTak = document.querySelector("#save-tak");

  // Función para cuando hagan click en boton y  autenticar con Google y guardar el usuario en Firestore
  //btnAddTak.addEventListener("click", async (e) => {
  taskForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    if (await saveTask(taskForm)) {
      // show  message
      taskForm.reset();
      taskForm['codigo'].focus();
      showMessage("pieza Guardada!");
      //window.location.href = "./";
    } else {
      showMessage(" Errror !!", 'error');
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

const wakeBtn = () => {

  /**
   * cuando hagan click en editar
   */
  const btnsEdit = productoList.querySelectorAll(".btn-edit");

  btnsEdit.forEach((btn) => {
    btn.addEventListener("click", async (event) => {
      event.preventDefault();
      try {
        const doc = await getTask(event.target.dataset.id);
        const task = doc.data();
        console.log(task);

        document.getElementById('codigo').value=task.codigo
        document.getElementById('nombre').value=task.nombre
        document.getElementById('descripcion').value=task.descripcion
        document.getElementById('precio').value=task.precio

      } catch (error) {
        console.log(error);
      }
    });
  });
}


/** Close MODAL */
const myModalEl = document.getElementById('agregaTak')
myModalEl.addEventListener('hidden.bs.modal', event => {
  taskForm.reset();
})