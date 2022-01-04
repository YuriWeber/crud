import React, { useState, useEffect, useCallback } from "react"
import FormDialogUsers from "./dialog/dialogUsers"
import FormDialogUser from "./dialog/dialogUser"

function CreateRow( props ) {
    const user = props.user
    const createdDate = user.dt_created.split("T")[0].split("-")

    const [openUsers, setOpenUsers] = useState(false);
    const [openUser, setOpenUser] = useState(false);
    const [updatedValues, setUpdatedValues] = useState()
    
    const handleClickOpen = () => {
        if (props.UserUpdate) setOpenUser(true)
        else setOpenUsers(true)
    };

    const callUpdate = useCallback(() => {
        if (props.UserUpdate) {
            if (updatedValues) {
                props.UserUpdate(updatedValues.name, updatedValues.password, updatedValues.passwordConfirm, updatedValues.access)
            }
        } else {
            if (updatedValues) {
                props.UsersUpdate(user.iduser, updatedValues)
            }
        }
    }, [props, updatedValues, user])

    useEffect(() => {
        callUpdate()
        setUpdatedValues(undefined)
    }, [updatedValues, callUpdate, setUpdatedValues])


    return (
        <>
            {
                !props.UserUpdate ? 
                    <FormDialogUsers open={openUsers} setOpen={setOpenUsers} values={{name:user.name, access:user.access}} setUpdatedValues={setUpdatedValues}/>
                    :
                    <FormDialogUser open={openUser} setOpen={setOpenUser} values={{name:user.name, access:user.access}} setUpdatedValues={setUpdatedValues}/>
            }
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
                    {
                        !props.UserUpdate ?
                            
                            <button className="btn btn-delete" onClick={() => (props.UserDelete(user.iduser))}>
                                <i className="fas fa-trash"></i>
                            </button>
                            :
                            <div></div>
                    }
                </td>
            </tr>
        </>
    )
}

export default CreateRow;