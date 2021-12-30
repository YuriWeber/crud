import React, { useState, useEffect, useCallback } from "react";
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

    const UsersReload = useCallback(() => {
        async function Setter() {
            setUsers(await GetData())
        }
        Setter()
    }, [])

    const GetData = () => {
        return Axios.get("http://localhost:3001/manage")
            .then((response) => {
                return response.data
            })
    }

    useEffect(() => {
        UsersReload()
    }, [ UsersReload ])

    const UserDelete = (id) => {
        Axios.delete(`http://localhost:3001/delete/${id}`)
            .then(UsersReload)
    }

    const UserUpdate = (id, updatedValues) => {
        if (id !== undefined && updatedValues !== undefined) {
            Axios.put("http://localhost:3001/update", {
                id,
                updatedValues
            }).then(() => {
                UsersReload()
            })
        }
        
    }

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
                                <th className="access-head">ACESSO</th>
                                <th className="edit-head" colSpan={2}>EDITAR</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (<CreateRow user={user} key={user.iduser} UserDelete={UserDelete} UserUpdate={UserUpdate}/>))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Manage;