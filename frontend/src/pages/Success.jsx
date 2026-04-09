import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API from "../services/api";

export default function Success() {
  const query = new URLSearchParams(useLocation().search);
  const amount = query.get("amount");
  const navigate = useNavigate();

  useEffect(() => {
    const updateBalance = async () => {
      await API.post("/bank/deposit", {
        amount: Number(amount),
      });
    };

    updateBalance();

    // ⏳ 3 sec baad redirect
    setTimeout(() => {
      navigate("/dashboard");  
    }, 3000);

  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>✅ Payment Successful</h2>
      <p>₹{amount} added to your account</p>
      <p>Redirecting to dashboard...</p>
    </div>
  );
}