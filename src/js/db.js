/**
 * @copyright Amit Singhal 2024
 */

'use strict';

// DB Object
let /** {Object} */ notekeeperDB = {};

/**
 * Initialize a local storage. If not exists, create a new one
 */
const initDB = function ()
{
  const /** {JSON | undefined} */ db = localStorage.getItem( 'notekeeperDB' );
  if ( db )
  {
    notekeeperDB = JSON.parse( db );
  } else
  {
    notekeeperDB.notebooks = []
    localStorage.setItem( 'notekeeperDB', JSON.stringify( notekeeperDB ) );
  }
}

initDB();

/**
 * Read DB from local storage & load it into notekeeperDB
 */
const readDB = function ()
{
  const /** {JSON | undefined} */ db = localStorage.getItem( 'notekeeperDB' );
  if ( db )
  {
    notekeeperDB = JSON.parse( db );
  }
}

/**
 * Write notekeeperDB to local storage
 */

const writeDB = function ()
{
  localStorage.setItem( 'notekeeperDB', JSON.stringify( notekeeperDB ) );
}

/**
 * Collection of utility functions for performing CRUD operations on DB
 *
 * @namespace
 * @property {Object} get
 * @property {Object} post
 * @property {Object} update
 * @property {Object} delete
 */
export const db = {

  post: {

    /**
    * Add new notebook
    *@function
    * @param {string} notebookName
    * @returns {void}
    */
    notebook: function ( notebookName )
    {
      readDB();

      console.log( 'notebookName:', notebookName );
      
      writeDB();
    }
  },
}
