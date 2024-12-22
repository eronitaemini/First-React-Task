import React from "react";
import style from "../cssModules/ConfirmDeletionModal.module.css";
import { deleteTransaction } from "../services/transaction";
import { IDeletionModalProps } from "../typeInterfaces/types";

export function ConfirmDeletionModal({
  onDeleteTransaction,
  transactionId,
  isDoneDeleting,
}: IDeletionModalProps) {
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
