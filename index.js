// Import our custom CSS
import './scss/styles.scss';

// script de de uso frecuente
import './vendor/darkModeControl.js'
import {showTareas} from  './productos/productos_list.js'
import './vendor/notify.js'



// Create an example popover
document.querySelectorAll('[data-bs-toggle="popover"]')
  .forEach(popover => {
    new Popover(popover)
  })

// Evento 'DOMContentLoaded' para asegurar que el DOM ha sido cargado
document.addEventListener('DOMContentLoaded', () => {
  // Tu código JavaScript aquí
  
  // Registrar el Service Worker
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(() => {
        console.log('Service Worker registrado correctamente');
      })
      .catch((error) => {
        console.error('Error al registrar el Service Worker:', error);
      });
  }

  // Verificar si la PWA se puede instalar
window.addEventListener('beforeinstallprompt', (event) => {
  event.preventDefault(); // Evitar que se muestre el banner de instalación automáticamente
  const installButton = document.getElementById('install-button');
  
  installButton.addEventListener('click', () => {
    event.prompt(); // Mostrar el banner de instalación al hacer clic en el botón
    event.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === 'accepted') {
        console.log('La PWA se instaló correctamente.');
      } else {
        console.log('El usuario canceló la instalación de la PWA.');
      }
    });
  });
  
  installButton.style.display = 'block'; // Mostrar el botón de instalación
});

  
  
   /*    Loader     Obtén el elemento con la clase 'loading'    */
          
var loadingElement = document.querySelector('.loading');

// Espera 300 milisegundos antes de ocultar el elemento
setTimeout(function() {
  // Oculta el elemento cambiando el estilo
  loadingElement.style.display = 'none';
}, 300);




});








    showTareas()


