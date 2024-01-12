/**
 * Script de usos freguntes
 */
import {
  Popover
} from 'bootstrap';

import './color-modes'

(() => {
    'use strict'

    document.querySelector('#navbarSideCollapse').addEventListener('click', () => {
      document.querySelector('.offcanvas-collapse').classList.toggle('open')
    })


    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]')
    const tooltipList = [...tooltipTriggerList].map(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl))
    
  

})()