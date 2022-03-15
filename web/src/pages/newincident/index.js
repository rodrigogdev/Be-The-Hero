import React, {useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";

import api from "../../services/api";
import "./styles.css";
import logoImg from "../../assets/logo.svg";


export default function Newincident() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const ongId = localStorage.getItem("ongId");


  const navigate = useNavigate();

  async function handleNewincident(e) {
    e.preventDefault();

    const data = {
      title,
      description,
      value,
    };

    try {
      await api.post('incidents', data, {
        headers: {
          authorization: ongId,
        }
      })

      navigate("/profile");
    } catch (err) {
      alert('Error during case registration, try again.')
    }
  };

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img src={logoImg} alt="Be The Hero" />

          <h1>Register new case</h1>
          <p>Describe with detais your case to find a hero to solve that.</p>
          
          <Link className= "back-link" to="/profile">
            <FiArrowLeft size={16} color="#E02041" />
            Back to Home
          </Link>
        </section>

        <form onSubmit={handleNewincident}>
          <input placeholder="Case Title"
            value={title}
            onChange={e => setTitle(e.target.value)}
          />
          <textarea placeholder="Description"
            value={description}
            onChange={e => setDescription(e.target.value)}
          />
          
          <input placeholder="Value in us dolar" 
            value={value}
            onChange={e => setValue(e.target.value)}
          />

          <button className="button" type="submit" >Register</button>
        </form>
      </div>
    </div>
  )
}