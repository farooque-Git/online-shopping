import { Grid, Typography } from "@mui/material";

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
        <h3> This website is created by Farooque Ali  ©</h3>
      </Typography>
    </Grid>
  );
};

export default Footer;
