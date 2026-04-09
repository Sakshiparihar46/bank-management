import { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function Login() {
  const [data, setData] = useState({ email: "", password: "" });
  const navigate = useNavigate();

const handleLogin = async () => {
  try {
    const res = await API.post("/auth/login", data);

    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
      navigate("/dashboard");
    } else {
      alert(res.data.msg);
    }

  } catch (err) {
    alert(err.response?.data?.msg || "Login Failed");
  }
};

  return (
    <div className="container">
      <h2>Login</h2>

      <input placeholder="Email" onChange={e => setData({...data,email:e.target.value})}/>
      <input type="password" placeholder="Password" onChange={e => setData({...data,password:e.target.value})}/>

      <button onClick={handleLogin}>Login</button>
      <button onClick={() => navigate("/register")}>Register</button>
    </div>
  );
}