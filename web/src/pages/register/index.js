import React, {useState} from "react";
import { FiArrowLeft } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";

import api from "../../services/api";
import "./styles.css";
import logoImg from "../../assets/logo.svg";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [city, setCity] = useState("");
  const [uf, setUf] = useState("");

  const navigate = useNavigate();

  async function handleRegister(e) {
    e.preventDefault();

    const data ={
      name,
      email,
      whatsapp,
      city,
      uf
    };

    try {
      const response = await api.post("ongs", data);

      alert(`Your access ID: ${response.data.id}`);

      navigate('/');
    } catch (err) {
      alert("Error in registration, try again.");
    }
  }

  return (
    <div className="register-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />

          <h1>Register</h1>
          <p>Make your registration, help people find the cases of your NGO.</p>
          
          <Link className= "back-link" to="/">
            <FiArrowLeft size={16} color="#E02041" />
            I don't have an register
          </Link>
        </section>

        <form onSubmit={handleRegister}>
          <input placeholder="NGO's name"
            value={name}
            onChange={e => setName(e.target.value)}
          />
          <input type="email" placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input placeholder="WhatsApp" 
            value={whatsapp}
            onChange={e => setWhatsapp(e.target.value)}
          />

          <div className="input-group">
            <input placeholder="City" 
              value={city}
              onChange={e => setCity(e.target.value)}
            />
            <input placeholder="State"
              style={{width: 100}}
              value={uf}
              onChange={e => setUf(e.target.value)}
            />
          </div>

          <button className="button" type="submit" >Register</button>
        </form>
      </div>
    </div>
  )
}