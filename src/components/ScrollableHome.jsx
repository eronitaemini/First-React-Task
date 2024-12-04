import TransactionCard from "./TransactionCard";
import { TRANSACTIONS } from "../data";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import style from "../cssModules/Div.module.css";
export default function ScrollableHome() {
  const data = useLoaderData();
  console.log("fetched data in ScrollableHome:", data);
  const [transactions, setTransactions] = useState(data);

  function handleDeletedTransaction(transactionId) {
    setTransactions((prev) =>
      prev.filter((transaction) => transaction.id !== transactionId)
    );
  }
  const updateTransaction = (id, updatedData) => {
    setTransactions((prevTransactions) =>
      prevTransactions.map((transaction) =>
        transaction.id === id ? { ...transaction, ...updatedData } : transaction
      )
    );
  };

  return (
    <div
      style={{
        overflowY: "auto",
        padding: "2rem",
        scrollBehavior: "smooth",
        height: "100vh",
      }}
      className="grid lg:grid-cols-2 md:grid-cols-1 "
    >
      {/* {(TRANSACTIONS ?? [])?.map((transaction) => (
        <TransactionCard {...transaction} key={transaction.id} />
      ))} */}

      {(transactions ?? [])?.map((transaction) => (
        <TransactionCard
          {...transaction}
          key={transaction.id}
          onDelete={handleDeletedTransaction}
          onUpdate={updateTransaction}
        />
      ))}
    </div>
  );
}
