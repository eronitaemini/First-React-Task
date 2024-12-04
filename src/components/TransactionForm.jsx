import { Form } from "react-router-dom";
import Button from "./Button";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import style from "../cssModules/Form.module.css";
export default function TransactionForm() {
  const categories = [
    "Technology",
    "Science",
    "Health",
    "Sports",
    "Vehicle Expenses",
    "Food & Dining",
    "Health & Fitness",
    "Entertainment",
    "Gifts",
    "Housing",
    "Education",
    "Shopping",
    "Transportation",
    "Utilities",
  ];

  return (
    <>
      <Form className={style.form} method="POST" action="/auth/newTransaction/">
        <label htmlFor="title" className={style.label}>
          Title
        </label>
        <input type="text" name="title" className={style.input} />
        <label htmlFor="value" className={style.label}>
          Amount
        </label>
        <input type="number" name="value" className={style.input} />
        <label htmlFor="category" className={style.label}>
          Category
        </label>
        <select name="category" className={style.select}>
          {categories.map((category) => (
            <option
              key={category}
              value={category}
              className={style.option}
              name="category"
            >
              {category}
            </option>
          ))}
        </select>

        <Button>Add Transaction</Button>
      </Form>
    </>
  );
}
