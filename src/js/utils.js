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

export { addEventOnElements };
