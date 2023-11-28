import { app } from "./../vendor/firebase.js";
import { getMessaging,
   //getToken,
    onMessage } from 'firebase/messaging';
import './sw2.js';

// Obtener la instancia de Firebase Messaging
const messaging = getMessaging(app);

// Solicitar el permiso para recibir notificaciones (opcional)
Notification.requestPermission().then((permission) => {
  if (permission === 'granted') {
    console.log('Permiso para recibir notificaciones concedido.');
  } else {
    console.log('Permiso para recibir notificaciones denegado.');
  }
});


// Escucha los mensajes de notificación push
onMessage(messaging, (payload) => {
  // Aquí puedes personalizar la lógica para mostrar la notificación
  const { title, body } = payload.notification;
  new Notification(title, { body });
});

/*
// Obtener el token de registro del dispositivo
getToken(messaging, { vapidKey: 'YOUR_VAPID_KEY' }).then((currentToken) => {
  if (currentToken) {
    console.log('Token:', currentToken);
  } else {
    console.log('No se pudo obtener el token.');
  }
}).catch((error) => {
  console.log('Error al obtener el token:', error);
});

// Escuchar mensajes entrantes
onMessage(messaging, (payload) => {
  console.log('Mensaje recibido:', payload);
});
*/