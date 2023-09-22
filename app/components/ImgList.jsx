"use client";
import * as React from "react";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import ImageListItemBar from "@mui/material/ImageListItemBar";
import IconButton from "@mui/material/IconButton";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import {
  DeleteOutline,
  DeleteOutlineRounded,
  Visibility,
} from "@mui/icons-material";
import Image from "next/image";
import Link from "next/link";
import {
  Alert,
  Box,
  Card,
  List,
  ListItem,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";

const path = "/";
// const path = process.env.NEXT_PUBLIC_PATH_IMG;

export default function ImgList({ images, carId }) {
  const router = useRouter();

  const [selectedImg, setSelectedImg] = React.useState(
    images ? path + images[0]?.name : null
  );

  const [showAlert, setShowAlert] = React.useState(false);

  const handleImgChange = (img) => {
    setSelectedImg(img);
  };

  const deletePhoto = async (imageName) => {
    const formData = new FormData();

    formData.append("imageName", imageName);
    formData.append("carId", carId);
    formData.append("images", JSON.stringify(images ?? []));

    const response = await fetch("/api/cars/upload", {
      method: "DELETE",
      body: formData,
    });

    const data = await response.json();

    if (data.status == 200) {
      setShowAlert(true);
      setTimeout(() => {
        router.refresh();
        setShowAlert(false);

        router.replace("/cars", undefined, { shallow: true });
        setTimeout(() => {
          router.replace(`/cars/edit/${carId}`, undefined, { shallow: true });
        }, "500");
      }, "1000");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <Stack direction='column' alignItems="center" sx={{width: "40%"}}>
        <Alert
          variant="outlined"
          severity="success"
          style={{ display: showAlert ? "block" : "none", marginTop: "1rem", width: '95%' }}
        >
          Foto eliminada con éxito!
        </Alert>
        <List
          sx={{
            width: "100%",
            bgcolor: "background.paper",
            position: "relative",
            overflow: "auto",
            maxHeight: 500,
          }}
        >
          {images &&
            images.map((item) => (
              <ListItem
                onClick={() => {
                  handleImgChange(path + item.name);
                }}
                key={item.name}
              >
                <Card
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    padding: 2,
                    maxHeight: 100,
                    width: "100%",
                  }}
                  elevation={3}
                >
                  <Image
                    src={path + item.name}
                    alt="Imagen de auto"
                    loading="lazy"
                    width={125}
                    height={80}
                    style={{ objectFit: "cover", borderRadius: "5px" }}
                  />
                  <Typography
                    variant="body2"
                    align="center"
                    sx={{ mx: 1, wordBreak: "break-all" }}
                  >
                    {item.name.slice(item.name.lastIndexOf("/") + 1)}
                  </Typography>
                  <IconButton
                    onClick={() => {
                      deletePhoto(item.name);
                    }}
                    sx={{ ml: "auto" }}
                  >
                    <DeleteOutline sx={{color: 'red'}}/>
                  </IconButton>
                </Card>
              </ListItem>
            ))}
        </List>
      </Stack>
      {images !== null && images.length > 0 && selectedImg !== null ? (
        <Image
          src={selectedImg}
          style={{ objectFit: "cover", borderRadius: "5px" }}
          width={750}
          height={480}
          alt="Imagen de auto"
        />
      ) : (
        <></>
      )}
    </Box>
  );
}
