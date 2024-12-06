import Button from "./Button";
import useIsLoggedIn from "../hooks/useLoginStatus";
import { useState } from "react";
import { EditionForm } from "./EditionForm";
import style from "../cssModules/TransactionCard.module.css";
import { ConfirmDeletionModal } from "./ConfirmDeletionModal";

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
  const formattedCreationDate = new Date(createdAt).toISOString().split("T")[0];
  const isUserLoggedIn = useIsLoggedIn();
  const [isDeleting, setIsDeleting] = useState(false);

  function handleTransactionDeletion() {
    setIsDeleting(true);
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
  function doneDeleting() {
    setIsDeleting(false);
  }
  return (
    <>
      {isEditing && (
        <div className={style.overlay}>
          <EditionForm
            handleCancelEditing={cancelEditing}
            transactionId={id}
            onApplyEditing={handleApplyEditing}
            transactionTitle={title}
            category={category.name}
            transactionValue={value}
          />
        </div>
      )}

      {isDeleting && (
        <ConfirmDeletionModal
          onDeleteTransaction={onDelete}
          transactionId={id}
          isDoneDeleting={doneDeleting}
        />
      )}
      <>
        <div className={style.trscCardContainer}>
          <h2 className={style.trscCardTitle}>{title}</h2>
          <h5 className={style.trscCardCategory}>{category.name}</h5>
          <p className={style.trscCardCategory}>${value}</p>
          <p className={style.trscCardCategory}>{formattedCreationDate}</p>

          {isUserLoggedIn && (
            <div className={style.buttonsContainer}>
              <Button
                handleOnClick={() => handleTransactionEdit(id)}
                style={{
                  backgroundColor: "white",
                  borderWidth: ".5px",
                  borderStyle: "solid",
                  borderColor: "black",
                }}
              >
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
