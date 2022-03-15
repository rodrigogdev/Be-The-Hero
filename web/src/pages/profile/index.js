import React, {useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiPower, FiTrash2 } from "react-icons/fi";

import "./styles.css";
import api from "../../services/api";
import logoImg from "../../assets/logo.svg";

export default function Profile() {
  const [incidents, setIncidents] = useState([]);

  const navigate = useNavigate();
  const ongId = localStorage.getItem("ongId");
  const ongName = localStorage.getItem("ongName");

  useEffect(() => {
    api.get("incidents", {
      headers: {
        authorization: ongId,
      }
    }).then(response => {
      setIncidents(response.data);
    })
  }, [ongId]);

  async function handleDeleteIncident(id) {
    console.log(ongId);
      console.log(id);
    try {
      await api.delete(`incidents/${id}`, {
        headers: {
          authorization: ongId,
        }
      }); 

      

      setIncidents(incidents.filter(incident => incident.id !== id));
    } catch (err) {
      alert ('No authorization, this case is from another NGO.');
    }
  };

  function handleLogout() {
    localStorage.clear();

    navigate('/');
  };

  return (
    <div className="profile-container">
      <header>
        <img src={logoImg} alt="Be The Hero" />
        <span>Welcome, {ongName}</span>

        <Link  className="button" to="/incidents/new">Register new case</Link>
        <button onClick={handleLogout} type="button">
          <FiPower size={18} color="#E02041" />
        </button>
      </header>

      <h1>Registered cases</h1>

      <ul>
        {incidents.map(incident => (
        <li key={incident.id}>
          <strong>CASE:</strong>
          <p>{incident.title}</p>

          <strong>DESCRIPTION:</strong>
          <p>{incident.description}</p>

          <strong>VALUE:</strong>
          <p>{Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD'}).format(incident.value)}</p>

          <button onClick= {() => handleDeleteIncident(incident.id)} type="button">
            <FiTrash2 size={20} color="#a8a8b3"/>
          </button>
        </li>
        ))}
      </ul>
    </div>
  )
}