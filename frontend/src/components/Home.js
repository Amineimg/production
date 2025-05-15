import React from "react";
import { Link } from "react-router-dom";
import "./assets/Home.css"; 

function Home() {
  return (
    <div className="home-container">
      <h1>Bienvenue à la Bibliothèque</h1>
      <p>Veuillez vous inscrire ou vous connecter pour continuer.</p>
      <div className="button-group">
        <Link to="/register" className="btn btn-register">
          S'inscrire
        </Link>
        <Link to="/login" className="btn btn-login">
          Se connecter
        </Link>
      </div>
    </div>
  );
}

export default Home;
