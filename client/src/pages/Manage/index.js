import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom"
import "../../styles/pages/manage.css"
import Axios from "axios"
import CreateRow from "./row.js"
import authorization from "../../authorization";
import Loading from "../loading"
import api from "../../api"
import StoreToken from "../../StoreToken"

function Manage() {
    const [users, setUsers] = useState([])
    const [loading, setLoading] = useState(true)
    const [user, setUser] = useState()

    const navigate = useNavigate()

    useEffect(() => {
        authorization().then(async authorize => {
            if (!authorize.auth) {
              return navigate("/")
            }
            const token = JSON.parse(localStorage.getItem("user"));

            const access = await api.post("http://localhost:3001/access", { token: token })
            if (!access.data) {
                return navigate("/")
            }

            setUser(authorize.user)
            setLoading(false)
        })
    }, [navigate])

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

    const UsersUpdate = (id, updatedValues) => {
        if (id !== undefined && updatedValues !== undefined) {
            Axios.put("http://localhost:3001/update", {
                id,
                updatedValues
            }).then(() => {
                UsersReload()
            })
        }
        
    }

    const UserUpdate = (name, password, passwordConfirm, access) => {
        api.put("http://localhost:3001/update-user", {
          name, 
          password,
          passwordConfirm,
          access: access,
          iduser: user.iduser
        }).then(response => {
          switch (response.data.message) {
            case "updateFailed" :
              console.log("Update Failed")
              break
            case "success":
              StoreToken(response.data.token)
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
                            {users.map(item => (<CreateRow user={item} key={item.iduser} UserDelete={UserDelete} UsersUpdate={UsersUpdate} UserUpdate={user.iduser===item.iduser ? UserUpdate : undefined}/>))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Manage;