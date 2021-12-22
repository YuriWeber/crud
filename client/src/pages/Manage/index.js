import React from "react";
import { useNavigate } from "react-router-dom"
import "../../styles/pages/manage.css"

function Manage() {
    const navigate = useNavigate()
    const HomeButton = () => {
        navigate("/")
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
                                <th className="role-head">CARGO</th>
                                <th className="edit-head" colSpan={2}>EDITAR</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="id-column">1</td>
                                <td className="name-column">Frederico</td>
                                <td className="date-column">23/11/2021</td>
                                <td className="role-column">User</td>
                                <td className="edit-row">
                                    <button className="btn btn-edit">
                                        <i className="far fa-edit"></i>
                                    </button>
                                </td>
                                <td className="edit-row">
                                    <button className="btn btn-delete">
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td className="id-column">2</td>
                                <td className="name-column">Joaquin</td>
                                <td className="date-column">12/03/2020</td>
                                <td className="role-column">Master</td>
                                <td className="edit-row">
                                    <button className="btn btn-edit">
                                        <i className="far fa-edit"></i>
                                    </button>
                                </td>
                                <td className="edit-row">
                                    <button className="btn btn-delete">
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                            <tr>
                                <td className="id-column">5</td>
                                <td className="name-column">Eden Lukkis</td>
                                <td className="date-column">12/05/2020</td>
                                <td className="role-column">User</td>
                                <td className="edit-row">
                                    <button className="btn btn-edit">
                                        <i className="far fa-edit"></i>
                                    </button>
                                </td>
                                <td className="edit-row">
                                    <button className="btn btn-delete">
                                        <i className="fas fa-trash"></i>
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default Manage;