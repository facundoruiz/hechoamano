// Import our custom CSS
import './scss/styles.scss';

import { auth } from "./vendor/firebase.js";
import { onAuthStateChanged } from "firebase/auth"; //si existe usuario se puede 
import { loginCheck } from "./vendor/check.js"; // parate visual

// script de de uso frecuente

import './vendor/notify.js'
import './auth/logout.js' //para desloguear
import './auth/auth.js' // para logear
import './vendor/menu.js'
import { showTareas } from './productos/productos.js'

// Evento 'DOMContentLoaded' para asegurar que el DOM ha sido cargado
document.addEventListener("DOMContentLoaded", async () => {

  /*    Loader     Obtén el elemento con la clase 'loading'    */
  var loadingElement = document.querySelector(".loading");
  // Espera 300 milisegundos antes de ocultar el elemento
  setTimeout(function () {
    // Oculta el elemento cambiando el estilo
    loadingElement.style.display = "none";
  }, 1500);
});

// list for auth state changes
onAuthStateChanged(auth, async (user) => {

  loginCheck(user);
  if (user) {
    showTareas()
  }
});

