import Button from "./Button";
import useIsLoggedIn from "../hooks/useLoginStatus";
import { deleteTransaction, editTransaction } from "../services/transaction";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { EditionForm } from "./EditionForm";
import style from "../cssModules/TransactionCard.module.css";
export default function TransactionCard({
  title,
  category,
  value,
  createdAt,
  id,
  onDelete,
  onUpdate,
}) {
  const [isEditing, setIsEditing] = useState(false);
  const formattedDate = new Date(createdAt).toISOString().split("T")[0];
  const isUserLoggedIn = useIsLoggedIn();

  function handleTransactionDeletion(transactionId) {
    onDelete(transactionId);
    deleteTransaction(transactionId);
  }

  const handleTransactionEdit = () => {
    setIsEditing(true);
  };

  const cancelEditing = () => {
    setIsEditing(false);
  };

  const handleApplyEditing = (updatedData) => {
    onUpdate(id, updatedData);
    setIsEditing(false);
  };
  return (
    <>
      {isEditing && (
        <div className={style.overlay}>
          <EditionForm
            handleCancelEditing={cancelEditing}
            transactionId={id}
            onApplyEditing={handleApplyEditing}
          />
        </div>
      )}
      <>
        <div className={style.trscCardContainer}>
          <h2 className={style.trscCardTitle}>{title}</h2>
          <h5 className={style.trscCardCategory}>{category.name}</h5>
          <p className={style.trscCardCategory}>${value}</p>
          <p className={style.trscCardCategory}>{formattedDate}</p>

          {isUserLoggedIn && (
            <div className="btnContainer">
              <Button handleOnClick={() => handleTransactionEdit(id)}>
                Edit
              </Button>
              <Button handleOnClick={() => handleTransactionDeletion(id)}>
                Delete
              </Button>
            </div>
          )}
        </div>
      </>
    </>
  );
}
