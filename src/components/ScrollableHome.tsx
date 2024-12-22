import { useLoaderData } from "react-router-dom";
import { useState } from "react";

import style from "../cssModules/Text.module.css";
import {
  IEditionFormProps,
  ITransactionCard,
  ITransactionObject,
} from "../typeInterfaces/types";
import TransactionCard from "./TransactionCard";
import React from "react";
export default function ScrollableHome() {
  const data = useLoaderData() as ITransactionCard[];
  console.log("data", data);
  const [transactions, setTransactions] = useState<ITransactionCard[]>(data);
  function handleDeletedTransaction(transactionId: number) {
    setTransactions((prev) =>
      prev.filter((transaction) => transaction.id !== transactionId)
    );
  }
  const updateTransaction = (id: number, updatedData: IEditionFormProps) => {
    const categoryId: number = parseInt(updatedData.category, 10);
    const object: ITransactionObject | undefined = transactions.find(
      (fetchedData) => fetchedData.category.id === categoryId
    );
    console.log("object", object);
    if (!object) {
      console.error("No category found");
      return;
    }
    const categoryName = object.category.name;
    updatedData.category = {
      id: categoryId,
      name: categoryName,
    };
    setTransactions((prevTransactions) =>
      prevTransactions.map((transaction) =>
        transaction.id === id ? { ...transaction, ...updatedData } : transaction
      )
    );
  };

  return (
    <>
      <div
        style={{
          overflowY: "auto",
          padding: "2rem",
          scrollBehavior: "smooth",
          height: "100vh",
        }}
        className="grid lg:grid-cols-2 md:grid-cols-1 "
      >
        {/* <p style={{ color: "red" }}>{errormg}</p> */}
        {/* {(TRANSACTIONS ?? [])?.map((transaction) => (
        <TransactionCard {...transaction} key={transaction.id} />
        ))} */}

        {transactions.length === 0 && (
          <h1 className={style.transactionsWillAppearText}>
            Transaction list is empty.
          </h1>
        )}
        <h1>Home</h1>
        {(transactions ?? [])?.map((transaction) => (
          <TransactionCard
            {...transaction}
            key={transaction.id}
            onDelete={handleDeletedTransaction}
            onUpdate={updateTransaction}
          />
        ))}
      </div>
    </>
  );
}
