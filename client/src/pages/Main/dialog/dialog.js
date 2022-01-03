import * as React from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function FormDialog(props) {
  const [name, setName] = React.useState(props.name);
  const [password, setPassword] = React.useState("");
  const [passwordConfirm, setPasswordConfirm] = React.useState("");

  const handleClose = () => {
    props.setOpen(false);
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
    props.UpdateUser(name, password, passwordConfirm)
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
          label="Nova Senha"
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
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancelar</Button>
        <Button onClick={updateValues}>Salvar</Button>
      </DialogActions>
    </Dialog>
  );
}
