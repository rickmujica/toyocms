"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Input from "@mui/material/Input";
import FilledInput from "@mui/material/FilledInput";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormHelperText from "@mui/material/FormHelperText";
import FormGroup from "@mui/material/FormGroup";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";

export default function LoginForm() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [incorrectCredentials, setIncorrectCredentials] = useState(null);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ username, password }),
      });

      if (response.status == 200) {
        // Manejar el éxito del inicio de sesión
        console.log("Inicio de sesión exitoso");
        router.push("/");
      } else {
        if (response.status == 401) {
          // Manejar errores de inicio de sesión
          setIncorrectCredentials(true);
        }
      }
    } catch (error) {
      console.error("Error en la petición POST:", error);
    }
  };

  return (
    <Box sx={{my: 'auto'}}>
      <Paper
        elevation={3}
        sx={{
          display: "flex",
          flexDirection: "column",
          padding: 10,
          marginTop: 'auto'
        }}
      >
        <Typography align="center" variant="h4" sx={{ marginBottom: "2rem"}}>
          Iniciar Sesión
        </Typography>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
              <InputLabel htmlFor="user" color="error">Usuario</InputLabel>
              <OutlinedInput
                id="user"
                type="text"
                label="User"
                color="error"
                onChange={handleUsernameChange}
              />
            </FormControl>
            <FormControl sx={{ m: 1, width: "25ch" }} variant="outlined">
              <InputLabel htmlFor="password" color="error">Contraseña</InputLabel>
              <OutlinedInput
                id="password"
                type={showPassword ? "text" : "password"}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff color="error" /> : <Visibility color="error" />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Contraseña"
                color="error"
                onChange={handlePasswordChange}
              />
              <Button
                sx={{ bgcolor: "red", my: 2, ":hover": { bgcolor: "darkred", color: "white" } }}
                variant="contained"
                size="large"
                type="submit"
              >
                Iniciar Sesión
              </Button>
              {incorrectCredentials ? (
                <Typography align="center" variant="caption" color={"error"}>
                  Usuario o contraseña incorrectos
                </Typography>
              ) : (
                ""
              )}
            </FormControl>
          </FormGroup>
        </form>
      </Paper>
    </Box>
  );
}
