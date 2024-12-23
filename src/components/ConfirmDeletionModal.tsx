import React from "react";
import style from "../cssModules/ConfirmDeletionModal.module.css";
import { deleteTransaction } from "../services/transaction";
//interfaces are used more for api calls
//types are used for props
//we can also declare these in the same file for readability
//and better accessibility
type DeletionModalProps = {
  onDeleteTransaction: (id: number) => void;
  transactionId: number;
  isDoneDeleting: () => void;
};
export function ConfirmDeletionModal({
  onDeleteTransaction,
  transactionId,
  isDoneDeleting,
}: DeletionModalProps) {
  function deletingTransaction(id) {
    onDeleteTransaction(id);
    deleteTransaction(id);
    isDoneDeleting();
  }

  return (
    <>
      <div className={style.modalContainer}>
        <h1 className={style.cmodalTitle}>
          Are you sure you want to delete the transaction?
        </h1>
        <div className={style.modalButton}>
          <button
            onClick={() => deletingTransaction(transactionId)}
            className={`${style.buttons} ${style.modalButtonYes}`}
          >
            Yes
          </button>
          <button
            onClick={isDoneDeleting}
            className={`${style.buttons} ${style.modalButtonCancel}`}
          >
            Cancel
          </button>
        </div>
      </div>
    </>
  );
}
