/**
 * @copyright Amit Singhal 2024
 */

'use strict';

const /** {HTMLElement} */ $overlay = document.createElement( 'div' );
$overlay.classList.add( 'overlay', 'modal-overlay' );

/**
 *
 * @param {*} title
 * @param {*} text
 * @param {*} time
 */
const NoteModal = function ( title = 'Unitiled', text = 'Add your note ...', time = '' )
{
  const /** {HTMLElement} */ $modal = document.createElement( 'div' );
  $modal.classList.add( 'modal' );
  $modal.innerHTML = `
        <button class="icon-btn large" aria-label="Close modal" data-close-btn>
          <span class="material-symbols-rounded" aria-hidden="true">close</span>
          <div class="state-layer"></div>
        </button>

        <input type="text" placeholder="Untitled" value="${ title }" class="modal-title text-title-medium"
          data-note-field>

        <textarea placeholder="Take a note..." class="modal-text text-body-large custom-scrollbar"
          data-note-field>${ text }</textarea>

        <div class="modal-footer">

          <span class="time text-label-large">${ time }</span>

          <button class="btn text" data-submit-btn>
            <span class="text-label-large">Save</span>
            <div class="state-layer"></div>
          </button>

        </div>
  `;

  const /** {HTMLElement} */ $submitBtn = $modal.querySelector( '[data-submit-btn]' );
  $submitBtn.disabled = true;

  const /** {HTMLElement} */[ $titleField, $textField ] = $modal.querySelectorAll( '[data-note-field]' );

  const enableSubmitBtn = function ()
  {
    $submitBtn.disabled = !$titleField.value && $textField.value;
  }

  $textField.addEventListener( 'keyup', enableSubmitBtn );
  $titleField.addEventListener( 'keyup', enableSubmitBtn );

  // open note modal
  const open = function ()
  {
    document.body.appendChild( $modal );
    document.body.appendChild( $overlay );
    $titleField.focus();
  };

  // close note modal
  const close = function ()
  {
    document.body.removeChild( $modal );
    document.body.removeChild( $overlay );
  };

  const /** {HTMLElement} */ $closeBtn = $modal.querySelector( '[data-close-btn]' );
  $closeBtn.addEventListener( 'click', close );

  /**
   *
   * @param {*} callback
   */
  const onSubmit = function ( callback )
  {
    $submitBtn.addEventListener( 'click', function ()
    {
      const /** {Object} */ noteData = {
        title: $titleField.value,
        text: $textField.value
      }
      callback( noteData );
    } );
  }

  return { open, close, onSubmit };
}

/**
 * Creates a modal with a title and a message to confirm the delete operation
 *
 * @param {string} title
 * @returns {Object}
 */
const DeleteConfirmModal = function ( title )
{
  const /** {HTMLElement} */ $modal = document.createElement( 'div' );
  $modal.classList.add( 'modal' );
  $modal.innerHTML = `
    <h3 class="modal-title text-title-medium">Are you sure you want to delete <strong>"${ title }"</strong>?</h3>

    <div class="modal-footer">
      <button class="btn text" data-action-btn="false">
        <span class="text-label-large">Cancel</span>
        <div class="state-layer"></div>
      </button>

      <button class="btn fill" data-action-btn="true">
        <span class="text-label-large">Delete</span>
        <div class="state-layer"></div>
      </button>
    </div>
  `;

  /**
   * Opens the delete confirm modal
   */
  const open = function ()
  {
    document.body.appendChild( $modal );
    document.body.appendChild( $overlay );
  };

  /**
   * Closes the delete confirm modal
   */
  const close = function ()
  {
    document.body.removeChild( $modal );
    document.body.removeChild( $overlay );
  };

  const /** {NodeListOf<HTMLElement>} */ $actionBtns = $modal.querySelectorAll( '[data-action-btn]' );

  /**
   * Handles the submission of the delete confirmation
   * @param {Function} callback
   */
  const onSubmit = function ( callback )
  {
    $actionBtns.forEach( $btn => $btn.addEventListener( 'click', function ()
    {
      const /** {boolean} */ isConfirm = this.dataset.actionBtn === 'true' ? true : false;
      callback( isConfirm );
    } ) );
  };

  return { open, close, onSubmit };
};

export { DeleteConfirmModal, NoteModal };
