/**
 * @copyright Amit Singhal 2024
 */

'use strict';

// Importing the modules
import { addEventOnElements } from './utils.js';

// Toggle sidebar in small screen

const /** {HTMLElement} */ $sidebar = document.querySelector( '[data-sidebar]' );
const /** {Array<HTMLElement>} */ $sidebarTogglers = document.querySelectorAll( '[data-sidebar-toggler]' );
const /** {HTMLElement} */ $overlay = document.querySelector( '[data-sidebar-overlay]' );

addEventOnElements( $sidebarTogglers, 'click', () => {
    $sidebar.classList.toggle( 'active' );
    $overlay.classList.toggle( 'active' );
} );
