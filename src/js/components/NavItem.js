/**
 * @copyright Amit Singhal 2024
 */

'use strict';

import { Tooltip } from "./Tooltip.js";
import { activeNotebook } from "../utils.js";

const /** {HTMLElement} */ $notePanelTitle = document.querySelector( '[data-note-panel-title]' );

/**
 *
 * @param {string} id
 * @param {string} name
 * @returns {HTMLElement}
 */
export const NavItem = function ( id, name )
{
  const /** {HTMLElement} */ $navItem = document.createElement( 'div' );
  $navItem.classList.add( 'nav-item' );
  $navItem.setAttribute( 'data-notebook', id );
  $navItem.innerHTML = `
          <span class="text text-label-large" data-notebook-field>${ name }</span>

          <button class="icon-btn small" aria-label="Edit notebook" data-tooltip="Edit notebook" data-edit-btn>
            <span class="material-symbols-rounded" aria-hidden="true">edit</span>
            <div class="state-layer"></div>
          </button>

          <button class="icon-btn small" aria-label="Delete notebook" data-tooltip="Delete notebook" data-delete-btn>
            <span class="material-symbols-rounded" aria-hidden="true">delete</span>
            <div class="state-layer"></div>
          </button>

          <div class="state-layer"></div>
  `;

  const /** {Array<HTMLELement} */ $tooltipElems = $navItem.querySelectorAll( '[data-tooltip]' );
  $tooltipElems.forEach( $tooltipElem => Tooltip( $tooltipElem ) );

  /**
   * click event on nav item
   */
  $navItem.addEventListener( 'click', function ()
  {
    $notePanelTitle.textContent = name;
    activeNotebook.call( this );
  } );


  return $navItem;
}
