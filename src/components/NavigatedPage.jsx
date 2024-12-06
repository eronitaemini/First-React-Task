import style from "../cssModules/Text.module.css";
export default function NavigatedPage({ title }) {
  return (
    <>
      <div style={{ padding: "5%" }}>
        <h1 className={style.transactionsWillAppearText}>{title}</h1>
      </div>
    </>
  );
}
