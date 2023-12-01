import { auth,db } from "./../vendor/firebase.js";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import {  doc, getDoc , setDoc ,serverTimestamp  } from "firebase/firestore"
import { showMessage } from "./../vendor/showMessage.js";



// Función para guardar los datos del usuario logueado en Firestore
const saveUserToFirestore = async (user) => {
  // Obtén la referencia del documento del usuario
  const userRef = doc(db, "users", user.uid);
   // Verifica si el usuario ya existe en Firestore
   const userSnapshot = await getDoc(userRef);

  if (userSnapshot.exists()) {
    console.log("El usuario ya existe en Firestore");
    return;
  }
  // Crea un objeto con los datos a guardar en Firestore
  const userData = {
    name: user.displayName,
    email: user.email,
    color:getRandomColorHex() ,
    uid: user.uid,
    createdAt: serverTimestamp(),
    rol : 'user'
    };

  // Guarda los datos del usuario en Firestore
  await setDoc(userRef, userData);
 

};


const googleButton = document.querySelector("#googleLogin");
// Función para cuando hagan click en boton y  autenticar con Google y guardar el usuario en Firestore
googleButton.addEventListener("click", async (e) => {
  e.preventDefault();

  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);

  // El usuario ha iniciado sesión exitosamente
  const user = result.user;

  // Guarda los datos del usuario en Firestore
  saveUserToFirestore(user);

  // show welcome message
  showMessage("¡Bienvenido! " + user.displayName);
 // window.location.href = "./crud.html";
}catch (error) {
    console.log(error);
    showMessage("Okurrio un erorr " ,error);
  }
});

const getRandomColorHex = ()=> {
  // Genera un número hexadecimal aleatorio de 6 dígitos
  const color = Math.floor(Math.random() * 16777215).toString(16);

  // Asegura que el color siempre tenga 6 dígitos agregando ceros a la izquierda si es necesario
  return "#" + color.padStart(6, "0");
}

async function getRol(uid) {
  const docuRef = doc(db, `usuarios/${uid}`);
  const docuCifrada = await getDoc(docuRef);
  const infoFinal = docuCifrada.data().rol;
  return infoFinal;
}

 export const setUserRol= (usuario) => {

  getRol(usuario.uid).then((rol) => {
    const userData = {
      uid: usuario.uid,
      email: usuario.email,
      name: usuario.name,
      rol: rol,
    };
   return userData;
   
  });
}

