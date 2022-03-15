import React, {useState} from "react";
import { FiLogIn } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import "./styles.css";

import api from "../../services/api";

import heroesImg from "../../assets/heroes.png";
import logoImg from "../../assets/logo.svg";

export default function Logon() {
  const [id, setId] = useState("");
  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    try {
      const response = await api.post("profile", {id});

      localStorage.setItem("ongId", id);
      localStorage.setItem("ongName", response.data.name);
      
      navigate("profile");
    } catch (err) {
      alert("Falha no login, tente novamente.");
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img src={logoImg} alt="Be The Hero" />
        <form onSubmit={handleLogin}>
          <h1>Logon</h1>

          <input placeholder="Your ID" 
            value={id}
            onChange={e => setId(e.target.value)}
          />
          <button className="button" type="submit">Login</button>
          <Link className= "back-link" to="/register">
            <FiLogIn size={16} color="#E02041" />
            I don't have an account</Link>
        </form>
      </section>
    
      <img src={heroesImg} alt="Heroes" />
    </div>
  );
}