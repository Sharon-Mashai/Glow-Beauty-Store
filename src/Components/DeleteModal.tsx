export interface DeleteModalProps {

  show: boolean;

  onCancel: () => void;
  onConfirm: () => void;

}

export const DeleteModal = ({
  show,
  onCancel,
  onConfirm,
}: DeleteModalProps) => {

  if (!show) return null;

  return (

    <div className="modalOverlay">

      <div className="deleteModal">

        <h2>Delete Bookmark?</h2>

        <p>
          Are you sure you want to delete this bookmark?
        </p>

        <div className="modalButtons">

          <button
            className="cancelBtn"
            onClick={onCancel}
          >
            Cancel
          </button>

          <button
            className="deleteBtn"
            onClick={onConfirm}
          >
            Delete
          </button>

        </div>

      </div>

    </div>

  );

};