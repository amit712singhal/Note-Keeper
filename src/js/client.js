/**
 * @copyright Amit Singhal 2024
 */

'use strict';

import { NavItem } from './components/NavItem.js';
import { activeNotebook } from './utils.js';

const /** {HTMLElement} */ $sidebarList = document.querySelector( '[data-sidebar-list]' );
const /** {HTMLElement} */ $notePanelTitle = document.querySelector( '[data-note-panel-title]' );

/**
   * The client object manages interaction with the UI.
   * @namespace
   * @property {Object} notebook
   * @property {Object} note
   */
export const client = {

  notebook: {
    /**
     * @param {Object} notebookData
     */
    create ( notebookData )
    {
      const /** {HTMLElement} */ $navItem = NavItem( notebookData.id, notebookData.name );
      $sidebarList.appendChild( $navItem );
      activeNotebook.call( $navItem );
      $notePanelTitle.textContent = notebookData.name;
    },


    /**
     * @param {Array<Object>} notebookList
     */
    read ( notebookList )
    {
      notebookList.forEach( ( notebookData, index ) =>
      {
        const /** {HTMLElement} */ $navItem = NavItem( notebookData.id, notebookData.name );
        if ( index === 0 )
        {
          activeNotebook.call( $navItem );
          $notePanelTitle.textContent = notebookData.name;
        }
        $sidebarList.appendChild( $navItem );
      } );
    },

    update ( notebookId, notebookData )
    {
      const /** {HTMLElement} */ $oldNotebook = document.querySelector( `[data-notebook="${ notebookId }"]` );
      const /** {HTMLElement} */ $newNotebook = NavItem( notebookData.id, notebookData.name );
      $notePanelTitle.textContent = notebookData.name;
      $sidebarList.replaceChild( $newNotebook, $oldNotebook );
      activeNotebook.call( $newNotebook );
    },
  }

}
