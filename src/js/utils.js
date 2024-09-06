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
        currentHour < 15 ? 'Noon' :
          currentHour < 17 ? 'Afternoon' :
            currentHour < 20 ? 'Evening' : 'Night';
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
const makeElemEditable = function ($element)
{
  $element.setAttribute('contenteditable', 'true');
  $element.focus();
  document.execCommand('selectAll', false, null);
  $element.addEventListener('keydown', function (e)
  {
    if (e.key === 'Enter')
    {
      e.preventDefault();
      this.blur();
    }
  });
  $element.addEventListener('blur', function ()
  {
    this.removeAttribute('contenteditable');
  });
}

export { addEventOnElements, getGreetingMsg, activeNotebook, makeElemEditable };
