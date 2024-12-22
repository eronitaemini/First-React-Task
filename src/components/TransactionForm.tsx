import { Form } from "react-router-dom";
import Button from "./Button";
import { useState } from "react";
import style from "../cssModules/Form.module.css";
import { useEffect } from "react";
import { getAllCategories } from "../services/transaction";
import { ICategories } from "../typeInterfaces/types";
import React from "react";
export default function TransactionForm() {
  const [category, setCategories] = useState<ICategories[]>([]);

  useEffect(() => {
    async function getCategories() {
      const categories: ICategories[] = await getAllCategories();
      setCategories(categories);
    }

    getCategories();
  }, []);

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
          {(category ?? [])?.map((category) => (
            <option
              key={category.id}
              value={category.id}
              className={style.option}
              name="category"
            >
              {category.name}
            </option>
          ))}
        </select>

        <Button>Add Transaction</Button>
      </Form>
    </>
  );
}
