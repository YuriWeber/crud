import React, { useEffect, useState } from "react";
import "../../styles/pages/main.css";
import { useNavigate } from "react-router-dom";
import authorization from "../../authorization";
import Loading from "../loading"
import FormDialog from "./dialog/dialog"
import api from "../../api"

function Main() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState()
  const [open, setOpen] = useState(false);

  useEffect(() => {
    authorization().then(authorize => {
      if (!authorize.auth) {
        return navigate("/conectar")
      }
  
      setUser(authorize.user)
      const token = JSON.parse(localStorage.getItem("user"));
      api.defaults.headers.Authorization = token
      setLoading(false)
    })
    
  }, [navigate]);

  const LogoutButton = () => {
    localStorage.removeItem("user");
    navigate("/conectar");
  };

  const ManageButton = async () => {
    const token = JSON.parse(localStorage.getItem("user"));

    const access = await api.post("http://localhost:3001/access", { token: token })
    if (access.data) {
      navigate("/gerenciar")
    } else {
      setOpen(true)
    }
  };

  const StoreToken = token => {
    api.defaults.headers.Authorization = token
    return localStorage.setItem("user", JSON.stringify(token))
  }

  const UpdateUser = (name, password, passwordConfirm) => {
    api.put("http://localhost:3001/update-user", {
      name, 
      password,
      passwordConfirm,
      iduser: user.iduser
    }).then(response => {
      switch (response.data.message) {
        case "updateFailed" :
          console.log("Update Failed")
          break
        case "success":
          console.log("PASSOU")
          StoreToken(response.data.token)
          setOpen(false)
          window.location.reload()
          break;
        default:
          console.log("[Invalid Message]")
          break;
      }
    })
  }

  if (loading) {
      return <Loading/>
  }

  return (
    <>
    <FormDialog open={open} setOpen={setOpen} name={user.name} UpdateUser={UpdateUser}/>
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
    </>
  );
}

export default Main;
