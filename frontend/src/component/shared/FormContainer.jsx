import React from "react";
import { Container, Grid } from "@mui/material";

const FromContainer = ({ children }) => {
  return (
    <Container>
      <Grid container justifyContent="center">
        <Grid item xs={12} md={6}>
          {children}
        </Grid>
      </Grid>
    </Container>
  );
};

export default FromContainer;
