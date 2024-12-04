export default function ErrorPage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        textAlign: "center",
        backgroundColor: "#f8f9fa",
        color: "#ff6b6b",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1
        style={{
          fontSize: "3rem",
          fontWeight: "bold",
        }}
      >
        Error! Not Found
      </h1>

      <p
        style={{
          fontSize: "1.5rem",
          margin: "0.5rem 0",
        }}
      >
        Page not found
      </p>
      <a
        href="/home"
        style={{
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          fontSize: "1rem",
          color: "#fff",
          backgroundColor: "#007bff",
          textDecoration: "none",
          borderRadius: "5px",
        }}
      >
        Go back home
      </a>
    </div>
  );
}
