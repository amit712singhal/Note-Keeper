/**
 * @copyright Amit Singhal 2024
 */

'use strict';

/**
 *
 * @param {Array<HTMLElement>} $elements
 * @param {string} event
 * @param {Function} callback
 */

const addEventOnElements = function ( $elements, event, callback )
{
  $elements.forEach( $element =>
  {
    $element.addEventListener( event, callback );
  } );

}

/**
 *
 * @param {number} currentHour
 * @returns {string}
 */

const getGreetingMsg = function ( currentHour )
{
  const /** {string} */ greeting =
    currentHour < 5 ? 'Night' :
      currentHour < 12 ? 'Morning' :
        currentHour < 18 ? 'Afternoon' :
          currentHour < 21 ? 'Evening' : 'Night';
  return `Good ${ greeting }`;
}

let /** {HTMLElement | undefined} */ $lastActiveNavItem;

/**
 * Active nav item & deactivate last active nav item
 */
const activeNotebook = function ()
{
  if ( $lastActiveNavItem )
  {
    $lastActiveNavItem.classList.remove( 'active' );
  }
  this.classList.add( 'active' ); // this: $navItem
  $lastActiveNavItem = this; // this: $navItem
}

/**
 * @param {HTMLElement} $element
 */
const makeElemEditable = function ( $element )
{
  $element.setAttribute( 'contenteditable', 'true' );
  $element.focus();
}

/**
 *
 * @returns {string}
 */
const generateID = function ()
{
  return new Date().getTime().toString();
}

/**
 *
 * @param {Object} db
 * @param {String} notebookId
 * @returns {Object | undefined}
 */
const findNotebook = function ( db, notebookId )
{
  return db.notebooks.find( notebook => notebook.id === notebookId );
}

/**
 * Finds the index of the notebook in the db
 * @param {Object} db
 * @param {string} notebookId
 * @returns {number}
 */

const findNotebookIndex = function ( db, notebookId )
{
  return db.notebooks.findIndex( item => item.id === notebookId );
}

/**
 *
 * @param {*} milliseconds
 * @returns {string}
 */
const getRelativeTime = function ( milliseconds )
{
  const currentTime = new Date().getTime();
  const minute = Math.floor( ( currentTime - milliseconds ) / 1000 / 60 );
  const hour = Math.floor( minute / 60 );
  const day = Math.floor( hour / 24 );

  return minute < 1 ? 'Just now' :
    minute < 60 ? `${ minute } min ago` :
      hour < 24 ? `${ hour } hour ago` :
        `${ day } day ago`;
}


export { addEventOnElements, getGreetingMsg, activeNotebook, makeElemEditable, generateID, findNotebook, findNotebookIndex, getRelativeTime };
