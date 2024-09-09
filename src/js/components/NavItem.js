/**
 * @copyright Amit Singhal 2024
 */

'use strict';

import { Tooltip } from "./Tooltip.js";
import { activeNotebook, makeElemEditable } from "../utils.js";
import { db } from "../db.js";
import { client } from "../client.js";
import { DeleteConfirmModal } from "./Modal.js";

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

  /**
   * Edit functionality
   */

  const /** {HTMLElement} */ $navItemEditBtn = $navItem.querySelector( '[data-edit-btn]' );
  const /** {HTMLElement} */ $navItemField = $navItem.querySelector( '[data-notebook-field' );

  $navItemEditBtn.addEventListener( 'click', makeElemEditable.bind( null, $navItemField ) );

  $navItemField.addEventListener( 'keydown', function ( event )
  {
    if ( event.key === 'Enter' )
    {
      this.removeAttribute( 'contenteditable' );

      // Update edited data in database
      const /** {string} */ updatedNotebookData = db.update.notebook( id, this.textContent );

      // Render updated data
      client.notebook.update( id, updatedNotebookData );

    }
  } )

  /**
   * Delete functionality
   */
  const /** {HTMLElement} */ $navItemDeleteBtn = $navItem.querySelector( '[data-delete-btn]' );
  $navItemDeleteBtn.addEventListener( 'click', function ()
  {
    const /** {Object} */ modal = DeleteConfirmModal( name );
    modal.open();
    modal.onSubmit( function ( isConfirm )
    {
      if ( isConfirm )
      {
        db.delete.notebook( id );
        client.notebook.delete( id );
      }
      modal.close();
    } );
  } );

  return $navItem;
}
