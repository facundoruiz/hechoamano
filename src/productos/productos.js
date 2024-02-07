import {
  onGetTasks,
  saveTask, getTask
} from "./productos_crud.js"
import {
  showMessage
} from "../vendor/showMessage.js";
import Cropper from 'cropperjs';
import "cropperjs/dist/cropper.css"


const productoList = document.getElementById("tablaProducto");
export const showTareas = () => {

  // Obtener la referencia del elemento TBODY de la tabla.
  let tBody = productoList.getElementsByTagName("tbody")[0];
  let elemento
  const fragment = document.createDocumentFragment();
  const template = document.querySelector("#productrow").content;


  onGetTasks((querySnapshot) => {
    elemento = 0;
    tBody.innerHTML = ""

    querySnapshot.forEach((task) => {

      elemento++;
      template.querySelectorAll('td')[0].textContent = elemento;
      //https://sabe.io/blog/javascript-change-image-src
      template.querySelector(".productrow-image").src = task.src_img ? task.src_img : 'https://firebasestorage.googleapis.com/v0/b/hecho-mano.appspot.com/o/productos%2Fno-imagen.png?alt=media&token=a9b754b3-d75b-4ebd-b077-366a46231163';
      template.querySelector(".productrow-image").alt = task.nombre ? task.nombre : '';
      template.querySelector(".productrow-image").title = task.nombre ? task.nombre : '';
      template.querySelector(".productrow-image").width = '80';
      template.querySelector(".productrow-image").dataset.id = task.id

      template.querySelectorAll('td')[2].textContent = task.nombre
      template.querySelectorAll('td')[3].textContent = task.precio
      template.querySelector(".btn-edit").dataset.id = task.id

      const clone = template.cloneNode(true);
      // const clone = document.importNode(template, true);
      fragment.appendChild(clone);

    });
    tBody.appendChild(fragment)
    wakeBtn() //agrego aqui para que cada vez q se liste despierte a los btn edit
  });

}

const taskForm = document.getElementById("taks-form");

if (taskForm) {

  const btnAddTak = document.querySelector("#save-tak");

  // Función para cuando hagan click en boton y  autenticar con Google y guardar el usuario en Firestore
  //btnAddTak.addEventListener("click", async (e) => {
  taskForm.addEventListener("submit", async (e) => {

    e.preventDefault();

    if (await saveTask(taskForm)) {
      // show  message
      taskForm.reset();
      taskForm['codigo'].focus();
      taskForm['id'].value='';
      document.getElementById('img-content').style.display = "none";
      showMessage("pieza Guardada!");
      
      //window.location.href = "./";
    } else {
      showMessage(" Errror !!", 'error');
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

const wakeBtn = () => {

  /**
   * cuando hagan click en editar
   */
  const btnsEdit = productoList.querySelectorAll(".btn-edit");

  btnsEdit.forEach((btn) => {
    btn.addEventListener("click", async (event) => {
      event.preventDefault();
      try {
        const doc = await getTask(event.target.dataset.id);
        const task = doc.data();
       

        document.getElementById('codigo').value=task.codigo
        document.getElementById('nombre').value=task.nombre
        document.getElementById('descripcion').value=task.descripcion
        document.getElementById('precio').value=task.precio
        document.getElementById('id').value=event.target.dataset.id

        document.querySelector(".img-thumbnail").src = task.src_img ? task.src_img : 'https://firebasestorage.googleapis.com/v0/b/hecho-mano.appspot.com/o/productos%2Fno-imagen.png?alt=media&token=a9b754b3-d75b-4ebd-b077-366a46231163';
        document.querySelector(".img-thumbnail").alt = task.nombre ? task.nombre : '';
         document.querySelector(".img-thumbnail").width = '80';
         document.querySelector(".img-thumbnail").style.display = "block";
         document.getElementById('img-content').style.display = "block";
        // document.getElementById('formFile').removeAttribute("required");
        
      } catch (error) {
        showMessage("Problemas de Lectura, intente de nuevo", 'error');
        console.log(error.message);
      }
    });
  });

  const btnCropperpic = productoList.querySelectorAll(".btn-cropperpic");

  btnCropperpic.forEach((btn) => {
    btn.addEventListener("click", async (event) => {
      event.preventDefault();
      try {
       
        const doc = await getTask(event.target.dataset.id);
        const task = doc.data();
        document.getElementById('idProduct').value=event.target.dataset.id

        document.querySelector(".img-original").src = task.src_img ? task.src_img : 'https://firebasestorage.googleapis.com/v0/b/hecho-mano.appspot.com/o/productos%2Fno-imagen.png?alt=media&token=a9b754b3-d75b-4ebd-b077-366a46231163';
        document.querySelector(".img-original").alt = task.nombre ? task.nombre : '';
         document.querySelector(".img-original").width = '80';
         

         document.querySelector(".img-cortar").src = task.src_img ? task.src_img : '';
      
        cortar()
      } catch (error) {
        console.log(error.message);
      }
    });
  });




}


/** Close MODAL */
const myModalEl = document.getElementById('agregaTak')
myModalEl.addEventListener('hidden.bs.modal', event => {
  taskForm.reset();
  document.querySelector(".img-thumbnail").style.display = "none";
  document.getElementById('img-content').style.display = "none";
  document.getElementById('id').value = "";
//  document.getElementById('formFile').setAttribute("required", "");
  
})


const cortar = () => {



/** CROOP IMG */
var container = document.querySelector('.img-container');
var image = container.getElementsByTagName('img').item(0);
var actions = document.getElementById('actions');

var URL = window.URL || window.webkitURL;


var options = {
  aspectRatio: 16 / 9,
  preview: '.img-preview',
  ready: function (e) {
    console.log(e.type);
  },
  cropstart: function (e) {
    console.log(e.type, e.detail.action);
  },
  cropmove: function (e) {
    console.log(e.type, e.detail.action);
  },
  cropend: function (e) {
    console.log(e.type, e.detail.action);
  },
  crop: function (e) {
    var data = e.detail;

   
  },
  zoom: function (e) {
    console.log(e.type, e.detail.ratio);
  }
};

let cropper

  cropper = new Cropper(image, options);


var originalImageURL = image.src;
var uploadedImageType = 'image/jpeg';
var uploadedImageName = 'cropped.jpg';
var uploadedImageURL;




 // Options
 actions.querySelector('.docs-toggles').onchange = function (event) {
  var e = event || window.event;
  var target = e.target || e.srcElement;
  var cropBoxData;
  var canvasData;
  var isCheckbox;
  var isRadio;

  if (!cropper) {
    return;
  }

  

  isCheckbox = target.type === 'checkbox';
  isRadio = target.type === 'radio';

  if (isCheckbox || isRadio) {
    if (isCheckbox) {
      options[target.name] = target.checked;
      cropBoxData = cropper.getCropBoxData();
      canvasData = cropper.getCanvasData();

      options.ready = function () {
        console.log('ready');
        cropper.setCropBoxData(cropBoxData).setCanvasData(canvasData);
      };
    } else {
      options[target.name] = target.value;
      options.ready = function () {
        console.log('ready');
      };
    }

    // Restart
    cropper.destroy();
    cropper = new Cropper(image, options);
  }
};

// Methods
actions.querySelector('.docs-buttons').onclick = function (event) {
  var e = event || window.event;
  var target = e.target || e.srcElement;
  var cropped;
  var result;
  var input;
  var data;

  if (!cropper) {
    return;
  }

  while (target !== this) {
    if (target.getAttribute('data-method')) {
      break;
    }

    target = target.parentNode;
  }

  if (target === this || target.disabled || target.className.indexOf('disabled') > -1) {
    return;
  }

  data = {
    method: target.getAttribute('data-method'),
    target: target.getAttribute('data-target'),
    option: target.getAttribute('data-option') || undefined,
    secondOption: target.getAttribute('data-second-option') || undefined
  };

  cropped = cropper.cropped;

  if (data.method) {
    if (typeof data.target !== 'undefined') {
      input = document.querySelector(data.target);

      if (!target.hasAttribute('data-option') && data.target && input) {
        try {
          data.option = JSON.parse(input.value);
        } catch (e) {
          console.log(e.message);
        }
      }
    }

    switch (data.method) {
      case 'rotate':
        if (cropped && options.viewMode > 0) {
          cropper.clear();
        }

        break;

      case 'getCroppedCanvas':
        try {
          data.option = JSON.parse(data.option);
        } catch (e) {
          console.log(e.message);
        }

        if (uploadedImageType === 'image/jpeg') {
          if (!data.option) {
            data.option = {};
          }

          data.option.fillColor = '#fff';
        }

        break;
    }

    result = cropper[data.method](data.option, data.secondOption);

    switch (data.method) {
      case 'rotate':
        if (cropped && options.viewMode > 0) {
          cropper.crop();
        }

        break;

      case 'scaleX':
      case 'scaleY':
        target.setAttribute('data-option', -data.option);
        break;

      case 'getCroppedCanvas':
        if (result) {
          // Bootstrap's Modal
          $('#getCroppedCanvasModal').modal().find('.modal-body').html(result);

          if (!download.disabled) {
            download.download = uploadedImageName;
            download.href = result.toDataURL(uploadedImageType);
          }
        }

        break;

      case 'destroy':
        cropper = null;

        if (uploadedImageURL) {
          URL.revokeObjectURL(uploadedImageURL);
          uploadedImageURL = '';
          image.src = originalImageURL;
        }

        break;
    }

    if (typeof result === 'object' && result !== cropper && input) {
      try {
        input.value = JSON.stringify(result);
      } catch (e) {
        console.log(e.message);
      }
    }
  }
}



 // Import image
 var inputImage = document.getElementById('inputImage');
 if (URL) {
  inputImage.onchange = function () {
    var files = this.files;
    var file;

    if (files && files.length) {
      file = files[0];

      if (/^image\/\w+/.test(file.type)) {
        uploadedImageType = file.type;
        uploadedImageName = file.name;

        if (uploadedImageURL) {
          URL.revokeObjectURL(uploadedImageURL);
        }

        image.src = uploadedImageURL = URL.createObjectURL(file);

        if (cropper) {
          cropper.destroy();
        }

        cropper = new Cropper(image, options);
        inputImage.value = null;
      } else {
        window.alert('Please choose an image file.');
      }
    }
  };
} else {
  inputImage.disabled = true;
  inputImage.parentNode.className += ' disabled';
}


}
