import Button from "./Button";
import style from "../cssModules/Form.module.css";
import btnStyle from "../cssModules/Button.module.css";
import { editTransaction } from "../services/transaction";
import { useState, useEffect } from "react";
import { getAllCategories } from "../services/transaction";
export function EditionForm({
  handleCancelEditing,
  transactionId,
  onApplyEditing,
  transactionTitle,
  category,
  transactionValue,
}) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formObject = Object.fromEntries(formData.entries());
    editTransaction(transactionId, formObject);
    handleCancelEditing();
    onApplyEditing(formObject);
  };

  const [cat, setCategories] = useState([]);

  useEffect(() => {
    async function getCategories() {
      const categories = await getAllCategories();
      setCategories(categories);
    }

    getCategories();
  }, []);
  return (
    <>
      <form onSubmit={handleSubmit} className={style.moduleForm}>
        <label htmlFor="title" className={style.label}>
          Title
        </label>
        <input
          type="text"
          name="title"
          className={style.input}
          defaultValue={transactionTitle}
        />
        <label htmlFor="value" className={style.label}>
          Amount
        </label>
        <input
          type="number"
          name="value"
          className={style.input}
          defaultValue={transactionValue}
        />
        <label htmlFor="" className={style.label}>
          Category
        </label>
        <select
          name="category"
          className={style.select}
          defaultValue={category}
        >
          {cat.map((category) => (
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
        <button type="submit" className={btnStyle.btn}>
          Apply
        </button>
        <Button
          handleOnClick={handleCancelEditing}
          style={{
            backgroundColor: "white",
            borderWidth: ".5px",
            borderStyle: "solid",
            borderColor: "black",
          }}
        >
          Cancel
        </Button>
      </form>
      <div></div>
    </>
  );
}
