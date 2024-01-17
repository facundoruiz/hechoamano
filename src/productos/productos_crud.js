import { app,auth, db, storage } from "../vendor/firebase.js";
import {
  collection,
  getDocs,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  getDoc,
  updateDoc, serverTimestamp, limit, startAfter, query, orderBy, endBefore
} from "firebase/firestore"
import { getStorage ,ref,uploadBytesResumable,getDownloadURL } from "firebase/storage";


const coleccion = "productos"

export const saveTask = async (producto) => {
  //addDoc(collection(db, coleccion), { estado,lugar,tak,uid ,serverTimestamp()});
  try {
    const user = auth.currentUser;
    
    //cargar el archivo
    const imgenUp = await updateImg(producto["formFile"].files[0]);
  
    // Obtener el usuario autenticado actualmente
    const docRef = await addDoc(collection(db, coleccion), {
      estado: 1, //habilitadosiempre
      codigo: producto["codigo"].value,
      nombre: producto["nombre"].value,
      descripcion: producto["descripcion"].value,
      precio: producto["precio"].value,
      uid: user.uid,
      createdAt: serverTimestamp(),
      src_img: imgenUp
    });

    return docRef.id;

  } catch (error) {
    console.error("Error al guardar el documento:", error);
    return false;
  }
};


export const onGetTasks = (callback) => {
  // Crear una consulta para obtener los últimos 10 taks ordenados por createdAt de forma descendente
  const queryTareas = query(collection(db, coleccion), orderBy("createdAt", "asc"), limit(10));

  onSnapshot(queryTareas, async (querySnapshot) => {
    const productos = [];
    for (const docu of querySnapshot.docs) {
      const task = docu.data(); //transformo a objeto
      /* const userId = task.uid;
       const userRef = doc(db, "users", userId);
       const userSnapshot = await getDoc(userRef);
       
       if (userSnapshot.exists()) { // Verificar si el snapshot del usuario existe antes de acceder a sus datos
         const userData = userSnapshot.data();
         tasks.push({ ...task, user: userData });
       }
       */
       task.id= docu.id //add el id del documento
      productos.push({ ...task });
    }
    callback(productos);
  });
};

/**
 *
 * @param {string} id Task ID
 */
export const deleteTask = (id) =>
  deleteDoc(doc(db, coleccion, id)
  );

export const getTask = (id) =>
  getDoc(doc(db, coleccion, id)
  );

export const updateTask = (id, newFields) =>
  updateDoc(doc(db, coleccion, id), newFields);


export const getTasks = () => getDocs(collection(db, coleccion));

const updateImg =async (file) =>  {
  if (!file) return;
  const storage = getStorage(app);
  // Points to the root reference
  const storageRef = ref(storage, `productos/${file.name}`);
  const uploadTask = uploadBytesResumable(storageRef, file);
  /*
  // Data URL string
  const message4 = 'data:text/plain;base64,5b6p5Y+344GX44G+44GX44Gf77yB44GK44KB44Gn44Go44GG77yB';
  uploadString(storageRef , message4, 'data_url').then((snapshot) => {
    console.log('Uploaded a data_url string!');
  });*/
  // Listen for state changes, errors, and completion of the upload.
   uploadTask.on('state_changed',
    (snapshot) => {
      // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      console.log('Upload is ' + progress + '% done');
      switch (snapshot.state) {
        case 'paused':
          console.log('Upload is paused');
          break;
        case 'running':
          console.log('Upload is running');
          break;
      }
    },
    (error) => {
      // A full list of error codes is available at
      // https://firebase.google.com/docs/storage/web/handle-errors
      switch (error.code) {
        case 'storage/unauthorized':
          // User doesn't have permission to access the object
          break;
        case 'storage/canceled':
          // User canceled the upload
          break;

        // ...

        case 'storage/unknown':
          // Unknown error occurred, inspect error.serverResponse
          break;
      }
    })
    await uploadTask; // 👈 uploadTask is a promise itself, so you can await it
  
    let downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                   // 👆 getDownloadURL returns a promise too, so... yay more await
  
    return downloadURL; // 👈 return the URL to the caller
}


/** Paginado  
 * https://github.com/falconmasters/paginacion-firebase/blob/master/main.js
 * https://www.youtube.com/watch?v=Vi6Axq3RaNE&t=5s&ab_channel=FernandoHerrera
*/

let ultElem = null
export const listar  = (callback) => {

  // Ultimos cargados primero 
  //const queryTareas = query(collection(db, coleccion), orderBy("createdAt", "desc"), limit(3),endBefore(ultElem));
  // Primeros cargados primeros listado
  const queryTareas = query(collection(db, coleccion), orderBy("createdAt", "asc"), limit(4),startAfter(ultElem));

  onSnapshot(queryTareas, async (querySnapshot) => {
    const productos = [];
    for (const docu of querySnapshot.docs) {
      const task = docu.data(); //transformo a objeto
      task.id= docu.id //add el id del documento
      productos.push({ ...task });
    }
    // unattach event listeners if no more docs
    if (querySnapshot.empty) {
     
      return 0;
    }else{
      ultElem = querySnapshot.docs[querySnapshot.docs.length-1];
      callback(productos);
    }
     
  
    
  });

 
}
