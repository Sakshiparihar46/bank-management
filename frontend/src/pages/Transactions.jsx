import { useEffect, useState } from "react";
import API from "../services/api";
import Navbar from "../components/Navbar";
import Card from "../components/Card";

export default function Transactions() {
  const [data, setData] = useState([]);

  useEffect(() => {
    API.get("/bank/transactions").then(res => setData(res.data));
  }, []);

  return (
    <div>
      <Navbar />

      <div style={{ padding: "20px" }}>
        <h2>Transaction History</h2>

        {data.map((t, i) => (
          <Card key={i}>
            <p><b>{t.type.toUpperCase()}</b></p>
            <p>₹ {t.amount}</p>
            <p>{new Date(t.date).toLocaleString()}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}