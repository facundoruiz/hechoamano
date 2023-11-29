// Import our custom CSS
import './scss/styles.scss';

import { auth } from "./vendor/firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import { loginCheck } from "./vendor/check.js";
import './auth/auth.js'

// script de de uso frecuente

import './vendor/notify.js'
import './auth/logout.js'
import './vendor/menu.js'
import {showTareas} from  './productos/productos.js'




// list for auth state changes
onAuthStateChanged(auth, async (user) => {
  loginCheck(user);
  if (user) {
    showTareas()
  } 
});
