import React from "react";
import "../../styles/pages/login.css"

function Login() {
    const handleTab = (event, selectedTabClass) => {
        console.log("[handleTab]")
        const selectedTab = event.target
        const elementClass = "selected-tab"
        const login = document.querySelector(".form-login").style
        const register = document.querySelector(".form-register").style
        if (selectedTab.classList.contains(elementClass)) { return }
        let currentTab
        switch (selectedTabClass) {
            case 'btn-login-tab':
                currentTab = selectedTab.parentElement.querySelector(".btn-register-tab")
                login.display = "flex"
                register.display = "none"
                break;
            case 'btn-register-tab':
                currentTab = selectedTab.parentElement.querySelector(".btn-login-tab")
                login.display = "none"
                register.display = "flex"
                break;
        }
        selectedTab.classList.add(elementClass)
        currentTab.classList.remove(elementClass)
    }

    return (
        <div className="container">
            <div className="container-tab">
                <button 
                    className="btn btn-login-tab selected-tab"
                    onClick={event => (handleTab(event, "btn-login-tab"))}>
                        Entrar</button>
                <button 
                    className="btn btn-register-tab"
                    onClick={event => (handleTab(event, "btn-register-tab"))}>
                        Cadastrar</button>
            </div>
            <div className="container-form">
                <form className="form-login">
                    <div className="input-container">
                        <label htmlFor="name">Nome: </label>
                        <input type="text" id="login-name" name="name" className="input input-name" maxLength={60} require="true"></input>
                        <label htmlFor="password">Senha: </label>
                        <input type="password" id="login-password" name="password" className="input input-password" maxLength={20} require="true"></input>
                    </div>
                    <button type="submit" className="btn btn-submit">Entrar</button>
                </form>
                <form className="form-register">
                    <div className="input-container">
                        <label htmlFor="name">Nome: </label>
                        <input type="text" name="name" id="reg-name" className="input input-name" maxLength={60} require="true"></input>
                        <label htmlFor="password">Senha: </label>
                        <input type="password" id="reg-password" name="password" className="input input-password" maxLength={20} require="true"></input>
                        <label htmlFor="pass-confirm">Confirmar senha: </label>
                        <input type="password" id="reg-password-confirm" name="password-confirm" className="input input-password-confirm" maxLength={20} require="true"></input>
                    </div>
                    <button type="submit" className="btn btn-submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}

export default Login;