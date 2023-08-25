"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { useRouter, useParams } from "next/navigation";

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

export default function BasicModal({ children }) {
  const [open, setOpen] = React.useState(true);
  const router = useRouter();

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    router.back();
    setOpen(false);
  };

  React.useEffect(() => {
    window.onbeforeunload = function() {
        router.back();
    };

    return () => {
        window.onbeforeunload = null;
    };
}, []);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      id="basic-modal"
    >
      <Box sx={style}>
        <Button sx={{float: 'right'}} onClick={handleClose}>x</Button>
        {children}
      </Box>
    </Modal>
  );
}
