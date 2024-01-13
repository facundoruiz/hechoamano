
// ir a un lugar espedifico
export const scrollToMarca = (marcaid) => {
    var miMarcaElemento = document.getElementById(marcaid);
    var seccionTop = miMarcaElemento.offsetTop;
  var heighttitle = seccionTop-document.querySelector(".article").offsetHeight;
    
    if (miMarcaElemento) {
   
      window.scrollTo({
        top: heighttitle,
        behavior: 'auto' // O 'auto' para un desplazamiento instantáneo
      });
    }
  }

  //ir arriba
export const scrollToTop = () => {
    window.scrollTo(0, 0);
  }
  
  
  /** filtra elemento seudo buscador 
   * con el plus dde chat gpt
  */
  
export const filterFunction = (p_elementos,p_input) =>{
  var input, filterWords, txtList, txt, div;
  input = document.getElementById(p_input);
  // Dividir el filtro en palabras
  filterWords = quitarDiacriticos(input.value.toLowerCase()).split(' ');

  // Obtener el contenedor del acordeón
  div = document.getElementById(p_elementos);

  // Obtener todas las secciones del acordeón
  const secciones = div.querySelectorAll('.hcf-isotope-item');

  secciones.forEach(seccion => {
   
    // Obtener los enlaces dentro de la sección
    txtList = seccion.querySelectorAll("h3");
    
    // Variable para verificar si al menos un enlace coincide
    let algunEnlaceCoincidente = false;

    // Recorrer cada enlace en la sección
    txtList.forEach(enlace => {
      txt = enlace.textContent || enlace.innerText || enlace.innerHTML;
   
      const txtWords = quitarDiacriticos(txt.toLowerCase()).split(' ');
      const allFilterWordsPresent = filterWords.every(word => txtWords.includes(word));
      
      if (allFilterWordsPresent) {
        //enlace.style.display = "block";
        seccion.style.display = 'block';
        algunEnlaceCoincidente = true;
        
      } else {
        enlace.style.display = "none";
      }
    });

    // Mostrar u ocultar la sección basándose en si algún enlace coincide
    if (algunEnlaceCoincidente) {
      seccion.style.display = 'block';
    
    } else {
      seccion.style.display = 'none';
    }
  });
}
/** tome tu otro nombre de acentos */
function quitarDiacriticos(texto) {
  return texto.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

export const share = () => {
  var text = 'Muy Pronto! un nuevo lugar de encuentro';
  if ('share' in navigator) {
    navigator.share({
      title: document.title,
      text: text,
      url: location.href,
    })
  } else {
    // Here we use the WhatsApp API as fallback; remember to encode your text for URI
    location.href = 'https://api.whatsapp.com/send?text=' + encodeURIComponent(text + ' - ') + location.href
  }
}