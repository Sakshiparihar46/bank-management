export default function Card({ children }) {
  return (
    <div style={{
      background: "white",
      padding: "20px",
      borderRadius: "12px",
      boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
      margin: "10px"
    }}>
      {children}
    </div>
  );
}