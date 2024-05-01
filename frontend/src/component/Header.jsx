import { AppBar, Button, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";
import Logo from "./image/online.jpg";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

const Header = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "white" }}>
      <Toolbar
        component={Link}
        to="/"
        style={{
          display: "flex",
          alignItems: "center",
          color: "black",
        }}
      >
        <img
          src={Logo}
          alt="logo"
          style={{ marginRight: "10px", height: "55px" }}
        />
        <div style={{ flexGrow: 1 }}></div>
        {/* <Button
          component={Link}
          to="/"
          color="inherit"
          sx={{
            fontWeight: "bold",
            "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.02)" },
            fontSize: "18px",
          }}
        >
          Home
        </Button> */}
        <Button
          component={Link}
          to="/about"
          color="inherit"
          sx={{
            fontWeight: "bold",
            "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.02)" },
            fontSize: "18px",
          }}
        >
          About
        </Button>
        <Button
          component={Link}
          to="/contact"
          color="inherit"
          sx={{
            fontWeight: "bold",
            "&:hover": { backgroundColor: "rgba(0, 0, 0, 0.02)" },
            fontSize: "18px",
          }}
        >
          Contact
        </Button>
        <Button
          variant="contained"
          sx={{
            fontWeight: "bold",
          }}
        >
          SIGN IN
        </Button>
        <Button
          variant="contained"
          component={Link}
          to="/contact"
          color="success"
          sx={{ marginLeft: "8px" }}
        >
          <ShoppingCartIcon />
          &nbsp; Cart
        </Button>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
