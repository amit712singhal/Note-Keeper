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
    $elements.forEach($element => {
        $element.addEventListener(event, callback);
    });

}

/**
 *
 * @param {number} currentHour
 * @returns {string}
 */

const getGreetingMsg = function (currentHour) {
  const /** {string} */ greeting =
    currentHour < 5 ? 'Night' :
      currentHour < 12 ? 'Morning' :
        currentHour < 15 ? 'Noon' :
          currentHour < 17 ? 'Afternoon' :
            currentHour < 20 ? 'Evening' : 'Night';
  return `Good ${greeting}`;
}

export { addEventOnElements , getGreetingMsg };
