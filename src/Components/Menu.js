import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeUserDetailAction } from "../store/actions/user";
import { removeAddressDetailAction } from "../store/actions/address";
import { emptyCartAction } from "../store/actions/cart";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Drawer, Typography,Avatar,Box,List,ListItemButton,ListItemIcon,ListItemText } from "@mui/material";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import LockResetIcon from "@mui/icons-material/LockReset";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SettingsIcon from "@mui/icons-material/Settings";
import ViewListIcon from '@mui/icons-material/ViewList';
import LogoutIcon from '@mui/icons-material/Logout';

const Menu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const onLogOutClick = () => {
    dispatch(emptyCartAction());
    dispatch(removeAddressDetailAction());
    dispatch(removeUserDetailAction());
    if (!user) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  };

  useEffect(() => {
    if (!user) {
      localStorage.removeItem("token");
      navigate("/login");
    }
  }, [user]);

  return (
    <>
      <NavDropdown
        id="nav-dropdown-light-example"
        title={user ? user.email : "email"}
      >
        <NavDropdown.Item as={Link} to="/Profile">
        <AccountCircleIcon  sx={{marginRight:'5px'}}/>
          Profile
        </NavDropdown.Item>
        <NavDropdown.Item as={Link} to="/orders">
        <ViewListIcon  sx={{marginRight:'5px'}}/>
          Orders History
        </NavDropdown.Item>
        <NavDropdown.Item  onClick={() => setIsDrawerOpen(true)}>
        <SettingsIcon sx={{marginRight:'5px'}} />
          Setting
        </NavDropdown.Item>
        <NavDropdown.Divider />
        <NavDropdown.Item onClick={onLogOutClick}>
        <LogoutIcon  sx={{marginRight:'5px'}}/>
          Log out
          </NavDropdown.Item>
      </NavDropdown>
      <Drawer
        anchor="left"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <Box p={4} width="300px" textAlign="center" role="presentation">
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 2, bgcolor: "gray" }}>
              <SettingsIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Setting
            </Typography>
          </Box>
          <hr />
          <List
            sx={{
              width: "100%",
              maxWidth: 360,
              bgcolor: "background.paper",
              margin: "4px",
            }}
            component="nav"
            aria-labelledby="nested-list-subheader"
          >
            <ListItemButton onClick={() => navigate("/setting/changeProfile")}>
              <ListItemIcon>
                <ManageAccountsIcon />
              </ListItemIcon>
              <ListItemText primary="Change Profile" />
            </ListItemButton  >
            <ListItemButton onClick={() => navigate("/setting/changePassword")}>
              <ListItemIcon>
                <LockResetIcon />
              </ListItemIcon>
              <ListItemText primary="Change Password" />
            </ListItemButton>
            <ListItemButton onClick={() => navigate("/setting/changeAvatar")}>
              <ListItemIcon>
                <AccountCircleIcon />
              </ListItemIcon>
              <ListItemText primary="Change Avatar" />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default Menu;
