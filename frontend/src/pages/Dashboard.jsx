import { useState } from "react";
import { useEffect} from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import "../styles/dashboard.css";

export default function Dashboard() {
  const [amount, setAmount] = useState("");
  const [balance, setBalance] = useState(0);

  const withdraw = async () => {
     if (!amount || Number(amount) <= 0) {
    return alert("Please enter a valid amount");
  }
    const res = await API.post("/bank/withdraw", { amount: Number(amount) });
    setBalance(res.data.balance);
  };

  const handlePayment = async () => {
  if (!amount || Number(amount) <= 0) {
    return alert("Please enter a valid amount");
  }

  try {
    const res = await API.post("/bank/pay", {
      amount: Number(amount),
    });

    window.location.href = res.data.url;

  } catch (err) {
    alert(err.response?.data?.msg || "Payment failed");
  }
};

useEffect(() => {
  const fetchBalance = async () => {
    try {
      const res = await API.get("/bank/balance");
      setBalance(res.data.balance);
    } catch (err) {
      console.log(err);
    }
  };

  fetchBalance();
}, []);

  return (
    <div className="dashboard">
      <Navbar />

      <div className="grid">

        {/* Balance Card */}
        <Card>
          <h3>Total Balance</h3>
          <h1>₹ {balance}</h1>
        </Card>

        {/* Actions */}
        <Card>
          <h3>Quick Actions</h3>

          <input
            placeholder="Enter Amount"
            onChange={(e) => setAmount(e.target.value)}
          />

          <div className="btns">
            <button onClick={withdraw}>Withdraw</button>
            <button onClick={handlePayment}> Deposit via Card 💳</button>
          </div>
        </Card>

      </div>
    </div>
  );
}