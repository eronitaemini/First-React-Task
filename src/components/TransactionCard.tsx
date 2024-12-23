import Button from "./Button";
import useIsLoggedIn from "../hooks/useLoginStatus";
import { useState } from "react";
import { EditionForm } from "./EditionForm";
import style from "../cssModules/TransactionCard.module.css";
import { ConfirmDeletionModal } from "./ConfirmDeletionModal";
import { EditionFormProps, TransactionCardProp } from "../typeInterfaces/types";
import React from "react";
export default function TransactionCard({
  title,
  category,
  value,
  createdAt,
  id,
  onDelete,
  onUpdate,
}: TransactionCardProp) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const formattedCreationDate: string = new Date(createdAt)
    .toISOString()
    .split("T")[0];
  const isUserLoggedIn: boolean = useIsLoggedIn();
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  function handleTransactionDeletion(): void {
    setIsDeleting(true);
  }

  const handleTransactionEdit = (): void => {
    setIsEditing(true);
  };

  const cancelEditing = (): void => {
    setIsEditing(false);
  };

  const handleApplyEditing = (updatedData: EditionFormProps) => {
    onUpdate(id, updatedData);
    setIsEditing(false);
  };
  function doneDeleting(): void {
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
