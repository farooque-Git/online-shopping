import React, { useState } from "react";
import { AppBar, Button, Toolbar, Menu, MenuItem } from "@mui/material"; // Import Menu and MenuItem
import { Link } from "react-router-dom";
import Logo from "./image/online.jpg";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../actions/userAction";

// Define NavDropdown component separately
const NavDropdown = ({ userInfo, logoutHandler }) => {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Button
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenuOpen}
        color="inherit"
        sx={{ marginLeft: "8px", fontWeight: "bold" }}
      >
        {userInfo}
      </Button>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem component={Link} to="/profile" onClick={handleMenuClose}>
          Profile
        </MenuItem>
        <MenuItem
          onClick={() => {
            logoutHandler();
            handleMenuClose();
          }}
        >
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

const Header = () => {
  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;
  const dispatch = useDispatch();

  const logoutHandler = () => {
    // console.log("logout");
    dispatch(logout());
  };

  return (
    <AppBar position="static" sx={{ backgroundColor: "white" }}>
      <Toolbar
        component="div"
        style={{
          display: "flex",
          alignItems: "center",
          color: "black",
        }}
      >
        <Link to="/">
          <img
            src={Logo}
            alt="logo"
            style={{ marginRight: "10px", height: "55px" }}
          />
        </Link>
        <div style={{ flexGrow: 1 }}></div>

        {/* Rendering NavDropdown component */}
        {userInfo ? (
          <NavDropdown userInfo={userInfo.name} logoutHandler={logoutHandler} />
        ) : (
          <Button
            variant="contained"
            component={Link}
            to="/login"
            color="inherit" // Change color to inherit
            sx={{ fontWeight: "bold" }}
          >
            SIGN IN
          </Button>
        )}

        {/* Cart Button */}
        <Button
          variant="contained"
          component={Link}
          to="/cart"
          color="success"
          sx={{ marginLeft: "8px", fontWeight: "bold" }}
        >
          <ShoppingCartIcon />
          &nbsp; Cart
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
