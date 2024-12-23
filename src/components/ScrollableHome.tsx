import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import style from "../cssModules/Text.module.css";
import { useEffect } from "react";
import { getAllCategories } from "../services/transaction";
import {
  Categories,
  EditionFormProps,
  TransactionCardProp,
} from "../typeInterfaces/types";
import TransactionCard from "./TransactionCard";
import React from "react";
export default function ScrollableHome() {
  const data = useLoaderData() as TransactionCardProp[];
  const [transactions, setTransactions] = useState<TransactionCardProp[]>(data);
  function handleDeletedTransaction(transactionId: number) {
    setTransactions((prev) =>
      prev.filter((transaction) => transaction.id !== transactionId)
    );
  }

  const updateTransaction = (id: number, updatedData: EditionFormProps) => {
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
