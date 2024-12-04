import Button from "./Button";
import style from "../cssModules/Form.module.css";
import btnStyle from "../cssModules/Button.module.css";
import { editTransaction } from "../services/transaction";
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
export function EditionForm({
  handleCancelEditing,
  transactionId,
  onApplyEditing,
}) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const formObject = Object.fromEntries(formData.entries());
    console.log("Form Data:", formObject);
    editTransaction(transactionId, formObject);
    handleCancelEditing();
    onApplyEditing(formObject);
  };

  return (
    <>
      <form
        onSubmit={handleSubmit}
        // className={style.form}
        className={style.moduleForm}
      >
        <label htmlFor="title" className={style.label}>
          Title
        </label>
        <input type="text" name="title" className={style.input} />
        <label htmlFor="value" className={style.label}>
          Amount
        </label>
        <input type="number" name="value" className={style.input} />
        <label htmlFor="" className={style.label}>
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
        <button type="submit" className={btnStyle.btn}>
          Apply
        </button>
        <Button handleOnClick={handleCancelEditing}>Cancel</Button>
      </form>
      <div></div>
    </>
  );
}
