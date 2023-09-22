"use client";

import {
  Add,
  FileUpload,
  FileUploadOutlined,
  UploadFile,
} from "@mui/icons-material";
import { Alert, Button, IconButton, TextField, Tooltip } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { revalidatePath } from "next/cache";

import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
// Opt out of caching for all data requests in the route segment
export const dynamic = "force-dynamic";

export default function UploadCarPhoto({ carId, carImages }) {
  const router = useRouter();

  const [file, setFile] = useState(null);
  const [showAlert, setShowAlert] = useState(false);
  const [activarBtnSubir, setActivarBtnSubir] = useState(true);

  const uploadPhoto = async (e) => {
    const formData = new FormData();

    formData.append("image", file);
    formData.append("carId", carId);
    formData.append("carImages", JSON.stringify(carImages ?? []));

    const response = await fetch("/api/cars/upload", {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.status == 200) {
      setActivarBtnSubir(true)
      setShowAlert(true);
      setTimeout(() => {
        router.refresh();
        setFile(null);
        setShowAlert(false);
        // revalidatePath(`/(logged)/cars/edit/[id]`, "page");
        // router.refresh();

        router.replace("/cars", undefined, { shallow: true });
        setTimeout(() => {

          router.replace(`/cars/edit/${carId}`, undefined, { shallow: true });
        }, "500");
      }, "1000");
    }
  };

  const Input = styled("input")({
    display: "none",
  });

  return (
    <div style={{ marginTop: "1rem", marginBottom: "3rem" }}>
      <form>
        <Stack direction="row" alignItems="center" spacing={2}>
          <TextField
            variant="outlined"
            type="text"
            helperText="Haz clic en el icono para seleccionar foto"
            disabled
            defaultValue={file ? file.name : ""}
          />
          <label htmlFor="icon-button-file" style={{ alignSelf: "flex-start" }}>
            <Input
              accept="image/*"
              id="icon-button-file"
              type="file"
              onChange={(e) => {
                setFile(e.target.files[0]);
                setActivarBtnSubir(false)
              }}
            />
            <Tooltip title="Seleccionar Foto">
              <IconButton
                color="error"
                aria-label="subir foto"
                component="span"
              >
                <UploadFile sx={{ fontSize: 40 }} />
              </IconButton>
            </Tooltip>
          </label>
        </Stack>
        <label htmlFor="contained-button-file">
          <Tooltip title="Subir Foto">
            <Button
              color="error"
              variant="contained"
              component="span"
              onClick={uploadPhoto}
              disabled={activarBtnSubir}
            >
              Subir
            </Button>
          </Tooltip>
        </label>
      </form>
      <Alert
        variant="outlined"
        severity="success"
        style={{ display: showAlert ? "flex" : "none", marginTop: "1rem", width: '22%'}}
      >
        Foto subida con éxito!
      </Alert>
    </div>
  );
}
