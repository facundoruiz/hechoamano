import { auth,db } from "../vendor/firebase.js";
import {   
    collection,
    getDocs,
    onSnapshot,
    addDoc,
    deleteDoc,
    doc,
    getDoc,
    updateDoc,serverTimestamp,limit,where,query,orderBy } from "firebase/firestore"
    
    const coleccion = "taks"

export const saveTask = async (estado,lugar,tak) =>
{
    //addDoc(collection(db, coleccion), { estado,lugar,tak,uid ,serverTimestamp()});
   try {
       const user = auth.currentUser;
      // Obtener el usuario autenticado actualmente
      const docRef = await addDoc(collection(db, coleccion), {
        estado: estado,
        lugar: lugar,
        tak: tak,
        uid: user.uid,
        createdAt: serverTimestamp()
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
    const tasks = [];
    for (const docu of querySnapshot.docs) {
      const task = docu.data();
      const userId = task.uid;
      const userRef = doc(db, "users", userId);
      const userSnapshot = await getDoc(userRef);
    

      if (userSnapshot.exists()) { // Verificar si el snapshot del usuario existe antes de acceder a sus datos
        const userData = userSnapshot.data();
        tasks.push({ ...task, user: userData });
      }
      
    }
    callback(tasks);
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