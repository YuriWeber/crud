import React, { useEffect, useState } from "react";
import "../../styles/pages/main.css";
import { useNavigate } from "react-router-dom";
import authorization from "../../authorization";
import Loading from "../loading"

function Main() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState()

  useEffect(() => {
    authorization().then(authorize => {
      if (!authorize.auth) {
        return navigate("/conectar")
      }
  
      setUser(authorize.user)
      setLoading(false)
    })
    
  }, [navigate]);

  const LogoutButton = () => {
    localStorage.removeItem("user");
    navigate("/conectar");
  };

  const ManageButton = () => {
    navigate("/gerenciar")
  };

  if (loading) {
      return <Loading/>
  }

  return (
    <div className="container">
      <div className="main-container">
        <div className="account-info">
          <h1>{user.name}</h1>
        </div>
        <div className="main-btns">
          <button className="btn btn-manage" onClick={() => ManageButton()}>
            <i className="fas fa-cog"></i>
            <span>Gerenciar</span>
          </button>
          <button className="btn btn-logout" onClick={() => LogoutButton()}>
            <i className="fas fa-sign-out-alt"></i>
            <span>Desconectar</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Main;
