import Button from "./Button";
export default function TransactionCard({ title, category, amount, date }) {
  return (
    <div className="w-3/4 h-fit px-8 py-5 bg-slate-100 rounded-3xl shadow-xl mb-10">
      <h2 className="trscCardTitle">{title}</h2>
      <h5 className="trscCardCategory">{category}</h5>
      <p className="trscCardAmountANDdate">{amount}</p>
      <p className="trscCardAmountANDdate">{date}</p>
      <div className="btnContainer">
        <Button>Edit</Button>
        <Button>Delete</Button>
      </div>
    </div>
  );
}
