export default function CannotLogin() {
  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "20vh",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1
        style={{
          color: "#ff4d4d",
          fontSize: "2rem",
        }}
      >
        Cannot Login
      </h1>
      <p
        style={{
          color: "#555",
          fontSize: "1.2rem",
        }}
      >
        User not found. Please try again.
      </p>
    </div>
  );
}
