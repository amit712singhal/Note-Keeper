/**
 * @copyright Amit Singhal 2024
 */

'use strict';

// Importing the modules
import { addEventOnElements, getGreetingMsg, activeNotebook, makeElemEditable } from './utils.js';
import { Tooltip } from './components/Tooltip.js';
import { db } from './db.js';
import { client } from './client.js';

/**
 * Toggle sidebar in small screen
 */

const /** {HTMLElement} */ $sidebar = document.querySelector( '[data-sidebar]' );
const /** {Array<HTMLElement>} */ $sidebarTogglers = document.querySelectorAll( '[data-sidebar-toggler]' );
const /** {HTMLElement} */ $overlay = document.querySelector( '[data-sidebar-overlay]' );

addEventOnElements( $sidebarTogglers, 'click', function ()
{
  $sidebar.classList.toggle( 'active' );
  $overlay.classList.toggle( 'active' );
} );

/**
 * Initialize tooltip behavior for all elements with data-tooltip attribute
 */

const /** {Array<HTMLElement>} */ $tooltipElems = document.querySelectorAll( '[data-tooltip]' );
$tooltipElems.forEach( $tooltipElem => Tooltip( $tooltipElem ) );

/**
 * show greeting message on home page
 */

const /** {HTMLElement} */ $greetElem = document.querySelector( '[data-greeting]' );
const /** {number} */ currentHour = new Date().getHours();
$greetElem.textContent = getGreetingMsg( currentHour );

/**
 * show current date on home page
 */

const /** {HTMLElement} */ $currentDateElem = document.querySelector( '[data-current-date]' );
$currentDateElem.textContent = new Date().toDateString().replace( ' ', ', ' );

/**
 * Notebook create field
  */
const /** {HTMLElement} */ $sidebarList = document.querySelector( '[data-sidebar-list]' );
const /** {HTMLElement} */ $addNotebookBtn = document.querySelector( '[data-add-notebook]' );

/**
 * Show notebook field
 */
const showNotebookField = function ()
{
  const /** {HTMLElement} */ $navItem = document.createElement( 'div' );
  $navItem.classList.add( 'nav-item' );

  $navItem.innerHTML = `
    <span class="text text-label-large" data-notebook-field></span>
    <div class="state-layer"></div>
  `;
  $sidebarList.appendChild( $navItem );

  const $navItemField = $navItem.querySelector( '[data-notebook-field]' );

  // Active new created notebook & deactivate last active notebook
  activeNotebook.call( $navItem );

  // Make notebook field editable & focus
  makeElemEditable( $navItemField );

  // when user press 'Enter' then create new notebook
  $navItemField.addEventListener( 'keydown', createNotebbok );
}

$addNotebookBtn.addEventListener( 'click', showNotebookField );

/**
 *
 * @param {KeyboardEvent} e
 */
const createNotebbok = function ( e )
{
  if ( e.key === 'Enter' )
  {
    // Store new created notebook
    const /** {Object} */ notebookData = db.post.notebook( this.textContent || 'Untitled' ); //this: $navItemField
    this.parentElement.remove();

    // Render navItem
    client.notebook.create( notebookData );
  }
}

/**
 * Load all notebooks
 */
const renderExistedNotebooks = function ()
{
  const /** {Array} */ notebookList = db.get.notebook();
  client.notebook.read(notebookList);
}

renderExistedNotebooks();
