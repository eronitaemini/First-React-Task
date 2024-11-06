import Header from "./Header";
import Sidebar from "./Sidebar";
import ScrollableHome from "./ScrollableHome";

export default function Home() {
  return (
    <div style={{ height: "100vh" }}>
      <Header title="Transaction" />

      <div className="flex flex-row">
        <Sidebar
          style={{
            width: "20%",
          }}
        />

        <ScrollableHome
          style={{ flexGrow: 1, overflowY: "auto", padding: "2rem" }}
        />
      </div>
    </div>
  );
}
