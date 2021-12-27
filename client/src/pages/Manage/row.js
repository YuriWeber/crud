import React from "react"

function CreateRow( props ) {
    const user = props.user
    const createdDate = user.dt_created.split("T")[0].split("-")
    console.log(createdDate)
    return (
        <tr>
            <td className="id-column">{user.iduser}</td>
            <td className="name-column">{user.name}</td>
            <td className="date-column">{`${createdDate[2]}/${createdDate[1]}/${createdDate[0]}`}</td>
            <td className="role-column">{user.role}</td>
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
    )
}

export default CreateRow;