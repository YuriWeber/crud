import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"
import "../../styles/pages/manage.css"
import Axios from "axios"
import CreateRow from "./row.js"

function Manage() {
    const [users, setUsers] = useState([])

    const navigate = useNavigate()
    const HomeButton = () => {
        navigate("/")
    }

    const GetData = () => {
        return Axios.post("http://localhost:3001/manage")
            .then((response) => {
                return response.data
            })
    }

    useEffect(() => {
        async function Setter() {
            setUsers(await GetData())
        }
        Setter()
    }, [])

    return (
        <div className="container manage">
            <div className="container-manage">
                <button className="btn btn-home" onClick={() => (HomeButton())}>
                    <i className="fas fa-house-user"></i>
                </button>
                <div className="table-container">
                    <table>
                        <thead>
                            <tr>
                                <th className="id-head">ID</th>
                                <th className="name-head">NOME</th>
                                <th className="date-head">DATA DE CRIAÇÃO</th>
                                <th className="role-head">CARGO</th>
                                <th className="edit-head" colSpan={2}>EDITAR</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (<CreateRow user={user} key={user.iduser}/>))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Manage;