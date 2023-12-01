import {
  onGetTasks,
  saveTask
} from "./productos_crud.js"
import {
  showMessage
} from "../vendor/showMessage.js";

export const showTareas = () => {

  const productoList = document.getElementById("tablaProducto");
  // Obtener la referencia del elemento TBODY de la tabla.
var tBody = productoList.getElementsByTagName("tbody")[0];

  onGetTasks((querySnapshot) => {
    
    querySnapshot.forEach((task) => {
 // Convertir el campo createdAt a una fecha legible
 const createdAt = getTimeAgo(task.createdAt);

 // Añadir fila.
 var row = tBody.insertRow(-1);

 // Celdas
 var cell1 = row.insertCell(0); // Primera celda para la imagen
 var img = document.createElement("img");
 img.src = task.src_img ? task.src_img : '';
 img.alt = task.nombre ? task.nombre : '';
 img.width = '80';
 cell1.appendChild(img);

 var cell2 = row.insertCell(1); // Segunda celda para el nombre
 cell2.appendChild(document.createTextNode(task.nombre));

 var cell3 = row.insertCell(2); // Tercera celda para el precio
 cell3.appendChild(document.createTextNode(task.precio));

 var cell4 = row.insertCell(3); // Cuarta celda para la fecha
 cell4.appendChild(document.createTextNode(createdAt));
   
    });
   
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
