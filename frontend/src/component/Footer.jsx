import { Grid, Typography } from "@mui/material";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Grid
      container
      direction="column"
      alignItems="center"
      style={{
        marginTop: "10px",
        boxShadow: "0px 0px 10px rgba(0, 0, 0, 10.5)",
      }}
    >
      <Typography>
        <Link to="/about" style={{ textDecoration: "none", color: "black" }}>
          About
        </Link>{" "}
        |{" "}
        <Link to="/contact" style={{ textDecoration: "none", color: "black" }}>
          Contact
        </Link>
      </Typography>
      <Typography>
        <h3>
          {" "}
          This website is created by{" "}
          <Link
            to="https://portfolio-main-virid-six.vercel.app/"
            target="_blank"
            style={{ textDecoration: "none", color: "orange" }}
          >
            Farooque Ali
          </Link>{" "}
          ©
        </h3>
      </Typography>
    </Grid>
  );
};

export default Footer;
