import TransactionCard from "./TransactionCard";
import { TRANSACTIONS } from "../data";

export default function ScrollableHome({ style }) {
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
      {(TRANSACTIONS ?? [])?.map((transaction) => (
        <TransactionCard {...transaction} key={transaction.id} />
      ))}
    </div>
  );
}
