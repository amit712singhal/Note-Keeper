/**
 * @copyright Amit Singhal 2024
 */

'use strict';

import { generateID, findNotebook, findNotebookIndex } from './utils.js';

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
    * @param {string} name
    * @returns {Object}
    */
    notebook: function ( name )
    {
      readDB();

      const /** {Object} */ notebookData = {
        id: generateID(),
        name,
        notes: []
      }

      notekeeperDB.notebooks.push( notebookData );

      writeDB();

      return notebookData;
    },

    /**
     *
     * @param {*} notebookId
     * @param {*} object
     * @returns
     */
    note ( notebookId, object )
    {
      readDB();
      const /** {Object} */ notebook = findNotebook( notekeeperDB, notebookId );
      const /** {Object} */ noteData = {
        id: generateID(),
        notebookId,
        ... object,
        postedOn: new Date().getTime()
      }
      
      notebook.notes.unshift( noteData );
      writeDB();

      return noteData;
    }
  },

  get: {

    /**
     * Get all notebooks
     * @function
     * @returns {Array<Object>}
     */
    notebook ()
    {
      readDB();
      return notekeeperDB.notebooks;
    }
  },

  update: {
    /**
     *@function
     * @param {string} notebookId
     * @param {string} name
     * @returns {Object}
     */
    notebook ( notebookId, name )
    {
      readDB();
      const/**{Object} */ notebook = findNotebook( notekeeperDB, notebookId );
      notebook.name = name
      writeDB();

      return notebook;
    }
  },

  delete: {
    /**
     * Delete a notebook
     * @function
     * @param {string} notebookId
     */
    notebook ( notebookId )
    {
      readDB();
      const /** {Number} */ notebookIndex = findNotebookIndex( notekeeperDB, notebookId );
      notekeeperDB.notebooks.splice( notebookIndex, 1 );
      writeDB();
    }
  },

}
