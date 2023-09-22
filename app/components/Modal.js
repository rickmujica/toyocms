"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useRouter, useParams } from "next/navigation";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { CloseOutlined } from "@mui/icons-material";

const style = (theme) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "70%",
  minHeight: "30vh",
  height: "95vh",
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
  [theme.breakpoints.down("md")]: {
    width: "80%",
  },
});

export default function Modal(props) {
  const [open, setOpen] = React.useState(true);
  const router = useRouter();

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    router.back();
    setOpen(false);
  };

  return (
    <>
    <Dialog open={open} onClose={handleClose} scroll='paper' maxWidth='xl' fullWidth>
        <DialogTitle>
        {props.titulo}
        <Button sx={{float: 'right', color: 'red'}} onClick={handleClose}><CloseOutlined /></Button>
        </DialogTitle>
          <DialogContent>
            <>
            {props.children}
            </>
          </DialogContent>
        <DialogActions>
          <Button color="error" onClick={handleClose}>Cerrar</Button>
          {/* <Button color="error" onClick={handleClose}>Aceptar</Button> */}
        </DialogActions>
        </Dialog>

    </>
  );
}
