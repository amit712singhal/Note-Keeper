/**
 * @copyright Amit Singhal 2024
 */

'use strict';

// Importing the modules
import { addEventOnElements , getGreetingMsg} from './utils.js';

// Toggle sidebar in small screen

const /** {HTMLElement} */ $sidebar = document.querySelector( '[data-sidebar]' );
const /** {Array<HTMLElement>} */ $sidebarTogglers = document.querySelectorAll( '[data-sidebar-toggler]' );
const /** {HTMLElement} */ $overlay = document.querySelector( '[data-sidebar-overlay]' );

addEventOnElements( $sidebarTogglers, 'click', () => {
    $sidebar.classList.toggle( 'active' );
    $overlay.classList.toggle( 'active' );
} );

// show greeting message on home page

const /** {HTMLElement} */ $greetElem = document.querySelector( '[data-greeting]' );
const /** {number} */ currentHour = new Date().getHours();
$greetElem.textContent = getGreetingMsg(currentHour);

// show current date on home page

const /** {HTMLElement} */ $currentDateElem = document.querySelector( '[data-current-date]' );
$currentDateElem.textContent = new Date().toDateString().replace(' ',', ');
