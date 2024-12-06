import TransactionCard from "./TransactionCard";
import { useLoaderData } from "react-router-dom";
import { useState } from "react";
import style from "../cssModules/Text.module.css";
export default function ScrollableHome() {
  const data = useLoaderData();
  const [transactions, setTransactions] = useState(data);
  function handleDeletedTransaction(transactionId) {
    setTransactions((prev) =>
      prev.filter((transaction) => transaction.id !== transactionId)
    );
  }
  const updateTransaction = (id, updatedData) => {
    const categoryId = parseInt(updatedData.category, 10);
    const object = transactions.find(
      (fetchedData) => fetchedData.category.id === categoryId
    );

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
