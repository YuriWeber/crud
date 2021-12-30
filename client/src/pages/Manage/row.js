import React, { useState, useEffect, useCallback } from "react"
import FormDialog from "./dialog/dialog"

function CreateRow( props ) {
    const user = props.user
    const createdDate = user.dt_created.split("T")[0].split("-")

    const [open, setOpen] = useState(false);
    const [updatedValues, setUpdatedValues] = useState()

    const handleClickOpen = () => {
        setOpen(true);
    };

    const callUpdate = useCallback(() => {
        props.UserUpdate(user.iduser, updatedValues)
    }, [props, updatedValues, user])

    useEffect(() => {
        callUpdate()
        setUpdatedValues(undefined)
    }, [updatedValues, callUpdate, setUpdatedValues])


    return (
        <>
            <FormDialog open={open} setOpen={setOpen} values={{name:user.name, access:user.access}} setUpdatedValues={setUpdatedValues}/>
            <tr>
                <td className="id-column">{user.iduser}</td>
                <td className="name-column">{user.name}</td>
                <td className="date-column">{`${createdDate[2]}/${createdDate[1]}/${createdDate[0]}`}</td>
                <td className="access-column">{user.access}</td>
                <td className="edit-row">
                    <button className="btn btn-edit" onClick={handleClickOpen}>
                        <i className="far fa-edit"></i>
                    </button>
                </td>
                <td className="edit-row">
                    <button className="btn btn-delete" onClick={() => (props.UserDelete(user.iduser))}>
                        <i className="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        </>
    )
}

export default CreateRow;