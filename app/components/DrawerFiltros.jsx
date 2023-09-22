"use client";
import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import Toolbar from "@mui/material/Toolbar";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import Filters from "./Filters";
import { FilterAlt } from "@mui/icons-material";
import RestartButton from "./RestartButton";

import useWindowSize from '../hooks/useWindowDimensions';

const drawerWidth = 325;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(1),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    zIndex: 2,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: -40,
      zIndex: 0,
    }),
  })
);

// const AppBar = styled(MuiAppBar, {
//   shouldForwardProp: (prop) => prop !== 'open',
// })(({ theme, open }) => ({
//   transition: theme.transitions.create(['margin', 'width'], {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   ...(open && {
//     width: `calc(100% - ${drawerWidth}px)`,
//     marginLeft: `${drawerWidth}px`,
//     transition: theme.transitions.create(['margin', 'width'], {
//       easing: theme.transitions.easing.easeOut,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//   }),
// }));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

export default function DrawerFiltros(props) {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const windowSize = useWindowSize();

  const widthString = String(windowSize.width - drawerWidth)+'px'

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          sx={{ mx: -5, mb: "auto", mt: -2, ...(open && { display: "none" }) }}
        >
          <FilterAlt sx={{ color: 'red'}}/>
        </IconButton>
      </Toolbar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          mr: 0,
          ml: -5,
          zIndex: 1,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            px: 2,
            ml: -3,
            mt: -3,
            position: "relative",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
              <ChevronLeftIcon  sx={{ color: 'red'}}/>
          </IconButton>
        </DrawerHeader>
        <Divider />
        <Box sx={{ display: "flex", alignItems: 'center' }}>
          <h4
            style={{
              marginBottom: "18px",
              marginTop: "20px",
              marginRight: "auto",
            }}
          >
            Filtros
          </h4>
          <RestartButton />
        </Box>
        <Filters data={props.data} />
      </Drawer>
      <Main open={open} sx={{width: open ? widthString : windowSize.width}}>
        {props.children}
      </Main>
    </Box>
  );
}
