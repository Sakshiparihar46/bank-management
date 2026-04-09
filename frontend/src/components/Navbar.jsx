import { useNavigate } from "react-router-dom";
import "../styles/navbar.css";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="navbar">
      <h2>💳 BankApp</h2>

      <div>
        <button onClick={() => navigate("/dashboard")}>Home</button>
        <button onClick={() => navigate("/transactions")}>Transactions</button>
        <button onClick={() => {
          localStorage.removeItem("token");
          navigate("/");
        }}>Logout</button>
      </div>
    </div>
  );
}