"use client";
import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import { CarRentalRounded } from "@mui/icons-material";
import Link from "next/link";
import MenuHeader from "./MenuHeader";

const drawerWidth = 240;

const Main = styled("main")(
  ({ theme }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    marginLeft: 0,
    }),
);

const AppBar = styled(MuiAppBar)(({ theme }) => ({
  backgroundColor: "red",
}));

export default function HeaderLogin({ children }) {
  const theme = useTheme();

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed">
        <Toolbar>

          <Typography variant="h6" noWrap component="div" sx={{ mx: "auto" }}>
            CMS Usados Toyotoshi
          </Typography>
        </Toolbar>
      </AppBar>
      <Main>
        {children}
      </Main>
    </Box>
  );
}
