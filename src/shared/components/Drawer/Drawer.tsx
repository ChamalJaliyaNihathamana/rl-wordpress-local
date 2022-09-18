import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { ArrowLeft } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";


import { DrawerAdminData, DrawerData } from "./DrawerData";
// redux
import { useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { AuthState } from "../../../redux/auth/auth.reducer";

const drawerWidth = 220;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: `-${drawerWidth}px`,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end",
}));

interface DrawerLeftProps {
  children?: React.ReactNode;
  type?: any;
}

const DrawerLeft: React.FunctionComponent<DrawerLeftProps> = ({
  children,
  type,
}) => {
// state 
  const authState:AuthState = useSelector(
    (state: RootState) => state.auth,
  )
// navigate
  const navigate = useNavigate();
  const theme = useTheme();

  // useState
  const [open, setOpen] = React.useState(true);
  const [selectedIndex, setSelectedIndex] = React.useState(null);
  
  // methods
  const handleListItemClick = (event, index, item) => {
    setSelectedIndex(index);
    console.log(
      window.location.href.substring(window.location.href.lastIndexOf("/") + 1)
    );
    console.log(index, item);
    navigate(`${item.path}`);
  };
  const handleDrawerOpen = () => {
    console.log(authState);
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  return (
    <Box sx={{ display: "flex" }}>
      {authState.isLoggedIn && (
        <>
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{ mr: 2, ...(open && { display: "none" }) }}
            >
              <MenuIcon />
            </IconButton>
          </Toolbar>

          <Drawer
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              "& .MuiDrawer-paper": {
                width: drawerWidth,
                boxSizing: "border-box",
              },
            }}
            variant="persistent"
            anchor="left"
            open={open}
          >
            <DrawerHeader>
              <IconButton onClick={handleDrawerClose}>
                {theme.direction === "ltr" ? (
                  <span>
                    <ArrowLeft className="mx-2" />
                    hide
                  </span>
                ) : (
                  <ChevronRightIcon />
                )}
              </IconButton>
            </DrawerHeader>

            <List className="rl-sidebar">
              {type === "admin" ? (
                <>
                  {DrawerAdminData.map((item, index) => {
                    return (
                      <ListItem
                        key={index}
                        selected={selectedIndex === index}
                        style={{
                          backgroundColor:
                            selectedIndex === index && "rgb(255,152,0,0.7)",
                        }}
                        button
                        onClick={(event) =>
                          handleListItemClick(event, index, item)
                        }
                        className="active"
                      >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.title} />
                      </ListItem>
                    );
                  })}
                </>
              ) : (
                <>
                  {DrawerData.map((item, index) => {
                    return (
                      <ListItem
                        key={index}
                        selected={selectedIndex === index}
                        style={{
                          backgroundColor:
                            selectedIndex === index && "rgb(255,152,0,0.7)",
                        }}
                        button
                        onClick={(event) =>
                          handleListItemClick(event, index, item)
                        }
                        className="active"
                      >
                        <ListItemIcon>{item.icon}</ListItemIcon>
                        <ListItemText primary={item.title} />
                      </ListItem>
                    );
                  })}
                </>
              )}
            </List>
            {/* <Divider /> */}
          </Drawer>
        </>
      )}
      <Main
        open={open}
        className={authState.isLoggedIn ? "logged" : "logged-out"}
      >
        {/* <DrawerHeader /> */}
        {children}
      </Main>
    </Box>
  );
};

export default DrawerLeft;
