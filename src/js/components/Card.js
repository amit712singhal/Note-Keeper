/**
 * @copyright Amit Singhal 2024
 */

'use strict';

import { Tooltip } from "./Tooltip.js";
import { getRelativeTime } from "../utils.js";
import { NoteModal } from "./Modal.js";
import { db } from "../db.js";
import { client } from "../client.js";

/**
 * @param {Object} noteData
 * @returns {HTMLElement}
 */
export const Card = function ( noteData )
{
  const { id, title, text, postedOn, notebookId } = noteData;
  const /** {HTMLElement} */ $card = document.createElement( 'div' );
  $card.classList.add( 'card' );
  $card.setAttribute( 'data-note', id );

  $card.innerHTML = `
          <h3 class="card-title text-title-medium">${ title }</h3>

          <p class="card-text text-body-large">
            ${ text }
          </p>

          <div class="wrapper">

            <span class="card-time text-label-large">${ getRelativeTime( postedOn ) }</span>

            <button class="icon-btn large" aria-label="Delete note" data-tooltip="Delete note">
              <span class="material-symbols-rounded" aria-hidden="true">delete</span>
              <div class="state-layer"></div>
            </button>

          </div>

          <div class="state-layer"></div>
  `;

  Tooltip( $card.querySelector( '[data-tooltip]' ) );

  /**
   * Note detail view & edit functionality
   */
  $card.addEventListener( 'click', function ()
  {
    const /** {Object} */ modal = NoteModal( title, text, getRelativeTime( postedOn ) );
    modal.open();
    modal.onSubmit( function ( noteData )
    {
      const updatedData = db.update.note( id, noteData );

      // Update note in UI
      client.note.update( id, updatedData );
      modal.close();
    })
  } );

  return $card;
}
