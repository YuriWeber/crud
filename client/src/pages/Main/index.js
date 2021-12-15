import React from "react"
import "../../styles/pages/main.css"
import { useNavigate } from "react-router-dom"

function Main(){
    const navigate = useNavigate()
    const LogoutButton = () => {
        console.log("[LogoutButton]")
        navigate("/conectar")
    }

    const ManageButton = () => {
        console.log("[ManageButton]")
        navigate("/gerenciar")
    }

    return (
        <div className="container">
            <div className="main-container">
                <div className="account-info">
                    <h1>Joaquin</h1>
                </div>
                <div className="main-btns">
                    <button 
                        className="btn btn-manage"
                        onClick={() => (ManageButton())}>
                        <i className="fas fa-cog"></i>
                        <span>Gerenciar</span>
                    </button>
                    <button 
                        className="btn btn-logout"
                        onClick={() => (LogoutButton())}>
                        <i className="fas fa-sign-out-alt"></i>
                        <span>Desconectar</span>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Main;