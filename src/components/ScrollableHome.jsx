import TransactionCard from "./TransactionCard";
import { TRANSACTIONS } from "../data";

export default function ScrollableHome({ style }) {
  return (
    <div
      style={{
        ...style,
        scrollBehavior: "smooth",
        height: "100vh",
      }}
      className="grid lg:grid-cols-2 md:grid-cols-1 "
    >
      {TRANSACTIONS.map((transaction) => (
        <TransactionCard
          key={transaction.id}
          title={transaction.title}
          category={transaction.category}
          amount={transaction.amount}
          date={transaction.date}
        />
      ))}
    </div>
  );
}
