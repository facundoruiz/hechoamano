import { auth,db,storage } from "../vendor/firebase.js";
import {   
    collection,
    getDocs,
    onSnapshot,
    addDoc,
    deleteDoc,
    doc,
    getDoc,
    updateDoc,serverTimestamp,limit,where,query,orderBy } from "firebase/firestore"
    
    const coleccion = "productos"

export const saveTask = async (producto,file) =>
{
    //addDoc(collection(db, coleccion), { estado,lugar,tak,uid ,serverTimestamp()});
   try {
       const user = auth.currentUser;
       
      // Obtener el usuario autenticado actualmente
      const docRef = await addDoc(collection(db, coleccion), {
        estado: producto["estado"].value,
        codigo: producto["codigo"].value,
        nombre: producto["nombre"].value,
        descripcion: producto["descripcion"].value,
        precio: producto["precio"].value,
        uid: user.uid,
        createdAt: serverTimestamp(),
        src_url : updateImg(file)
      });

    return docRef.id ;
      
    } catch (error) {
      console.error("Error al guardar el documento:", error);
      return false;
    }
  };
    
  
export const onGetTasks = (callback) => {
  // Crear una consulta para obtener los últimos 10 taks ordenados por createdAt de forma descendente
const queryTareas = query(collection(db, coleccion), orderBy("createdAt", "desc"), limit(10));

  onSnapshot(queryTareas, async (querySnapshot) => {
    const productos = [];
    for (const docu of querySnapshot.docs) {
      const task = docu.data();
     /* const userId = task.uid;
      const userRef = doc(db, "users", userId);
      const userSnapshot = await getDoc(userRef);
      
      if (userSnapshot.exists()) { // Verificar si el snapshot del usuario existe antes de acceder a sus datos
        const userData = userSnapshot.data();
        tasks.push({ ...task, user: userData });
      }
      */
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

 const updateImg  =(file)=>{
  // Points to the root reference
const storageRef = ref(storage, `producto/${file.name}`);
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
  }, 
  () => {
    // Upload completed successfully, now we can get the download URL
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
    });
  })
 }