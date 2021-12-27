import React, { useState } from "react";
import "../../styles/pages/login.css"
import Axios from "axios"

function Login() {

    const [valuesLogin, setValuesLogin] = useState()

    const [valuesRegister, setValuesRegister] = useState()

    // adição e remoção de uma classe ao elemento recebido
    const EnableElement = (element) => {
        if (element.contains("disable")) {
            element.remove("disable")
            element.add("enable")
        }
    }

    // ocultar todos avisos
    const DisableWarnings = () => {
        document.querySelectorAll(".warning").forEach(element => {
            if (element.classList.contains("enable")) {
                element.classList.remove("enable")
                element.classList.add("disable")
            }
        })
    }

    // envia dados para o backend e ativa avisos caso necessario
    const LoginButton = () => {
        DisableWarnings()
        Axios.post("http://localhost:3001/login", {
            valuesLogin: valuesLogin,
        }).then((response) => {
            ShowError(response.data)
        })
    }

    // envia dados para o backend e ativa avisos caso necessario
    const RegisterButton = () => {
        DisableWarnings()
        Axios.post("http://localhost:3001/register", {
            valuesRegister: valuesRegister,
        }).then((response) => {
            ShowError(response.data)
        })
    }

    // ativa o elemento de aviso de acordo com o erro retornado pelo back
    const ShowError = (error) => {
        DisableWarnings();
        let element
        switch (error) {
            case "emptyFields":
                element = document.querySelector(".empty-field-warning").classList
                EnableElement(element)
                break;
            case "differentPassword":
                element =  document.querySelector(".pass-invalid-warning").classList
                EnableElement(element)
                break;
            case "shortName":
                element =  document.querySelector(".name-short-warning").classList
                EnableElement(element)
                break;
            case "shortPassword":
                element =  document.querySelector(".pass-weak-warning").classList
                EnableElement(element)
                break;
            case "invalidChar":
                element =  document.querySelector(".pass-invalid-warning").classList
                EnableElement(element)
                break;
            case "usedName":
                element =  document.querySelector(".name-used-warning").classList
                EnableElement(element)
                break;
            case "invalidAccount":
                element =  document.querySelector(".invalid-account-warning").classList
                EnableElement(element)
                break;
            default: 
                console.log("[Invalid Error]")
                break;
        }
    }

    const ChangeValuesLogin =  (value) => {
        setValuesLogin(preValues => ({
            ...preValues,
            [value.target.name]: value.target.value
        }))
    }

    const ChangeValuesRegister = (value) => {
        setValuesRegister(preValues => ({
            ...preValues,
            [value.target.name]: value.target.value
        }))
    }

    // troca de aba
    const HandleTabChange = (event, selectedTabClass) => {
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
            default:
                throw new Error("Invalid case");
        }
        selectedTab.classList.add(elementClass)
        currentTab.classList.remove(elementClass)
        DisableWarnings()
    }

    return (
        <div className="container">
            <div className="container-tab">
                <button 
                    className="btn btn-login-tab selected-tab"
                    onClick={event => (HandleTabChange(event, "btn-login-tab"))}>
                        Entrar</button>
                <button 
                    className="btn btn-register-tab"
                    onClick={event => (HandleTabChange(event, "btn-register-tab"))}>
                        Cadastrar</button>
            </div>
            <div className="container-form">
                <p className="empty-field-warning warning disable"><i className="fas fa-exclamation-triangle"></i> Preencha todos os campos!</p>
                <p className="invalid-account-warning warning disable"><i className="fas fa-exclamation-triangle"></i> Nome e/ou senha inválidos!</p>
                <div className="form-login">
                    <div className="input-container">
                        <label htmlFor="name">Nome: </label>
                        <input type="text" id="login-name" name="name" 
                            className="input input-name" 
                            maxLength={60}
                            onChange={ChangeValuesLogin}></input>
                        <label htmlFor="password">Senha: </label>
                        <input type="password" id="login-password" name="password" 
                            className="input input-password" 
                            maxLength={20}
                            onChange={ChangeValuesLogin}></input>
                    </div>
                    <button className="btn btn-submit"
                        onClick={LoginButton}>
                        Entrar
                    </button>
                </div>
                <div className="form-register">
                    <p className="name-used-warning warning disable"><i className="fas fa-exclamation-triangle"></i> Nome já usado!</p>
                    <p className="name-short-warning warning disable"><i className="fas fa-exclamation-triangle"></i> Nome pequeno!</p>
                    <div className="input-container">
                        <label htmlFor="name">Nome: </label>
                        <input type="text" name="name" id="reg-name" 
                            className="input input-name" 
                            maxLength={60}
                            onChange={ChangeValuesRegister}></input>
                        <p className="pass-invalid-warning warning disable"><i className="fas fa-exclamation-triangle"></i> Senha inválida ou diferente!</p>
                        <p className="pass-weak-warning warning disable"><i className="fas fa-exclamation-triangle"></i> Senha fraca!</p>
                        <label htmlFor="password">Senha: </label>
                        <input type="password" id="reg-password" name="password" 
                            className="input input-password" 
                            maxLength={20}
                            onChange={ChangeValuesRegister}></input>
                        <label htmlFor="passwordConfirm">Confirmar senha: </label>
                        <input type="password" id="reg-password-confirm" name="passwordConfirm" 
                            className="input input-password-confirm" 
                            maxLength={20}
                            onChange={ChangeValuesRegister}></input>
                    </div>
                    <button className="btn btn-submit"
                        onClick={RegisterButton}>
                        Cadastrar
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Login;