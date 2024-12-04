import style from "../cssModules/Text.module.css";
export default function Header({ title }) {
  return (
    <header className={style.header}>
      <h1 className={style.title}>Transaction</h1>
    </header>
  );
}
