import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

export default function FormDialogUser(props) {
  const [access, setAccess] = React.useState(props.values.access);
  const [name, setName] = React.useState(props.values.name);
  const [password, setPassword] = React.useState("");
  const [passwordConfirm, setPasswordConfirm] = React.useState("");

  const handleClose = () => {
    props.setOpen(false);
  };

  const handleChangeAccess = (event) => {
    setAccess(event.target.value);
  };

  const handleChangeName = (event) => {
    setName(event.target.value);
  };
  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleChangePasswordConfirm = (event) => {
    setPasswordConfirm(event.target.value);
  };

  const updateValues = () => {
    props.setUpdatedValues({ name: name, password: password, passwordConfirm: passwordConfirm, access: access });
    handleClose();
  };

  return (
    <Dialog open={props.open} onClose={handleClose}>
      <DialogTitle>EDITAR</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Nome"
          type="text"
          value={name}
          inputProps={{ maxLength: 60 }}
          fullWidth
          variant="standard"
          onChange={handleChangeName}
        />
        <TextField
          autoFocus
          margin="dense"
          id="password"
          label="Senha"
          type="password"
          value={password}
          inputProps={{ maxLength: 20 }}
          fullWidth
          variant="standard"
          onChange={handleChangePassword}
        />
        <TextField
          autoFocus
          margin="dense"
          id="passwordConfirm"
          label="Confirmar Senha"
          type="password"
          value={passwordConfirm}
          inputProps={{ maxLength: 20 }}
          fullWidth
          variant="standard"
          onChange={handleChangePasswordConfirm}
        />
        <Select
          labelId="demo-simple-select-label"
          id="roleSelect"
          value={access}
          className="select"
          label="Age"
          onChange={handleChangeAccess}
        >
          <MenuItem value={"admin"}>admin</MenuItem>
          <MenuItem value={"user"}>User</MenuItem>
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={updateValues}>Salvar</Button>
      </DialogActions>
    </Dialog>
  );
}
