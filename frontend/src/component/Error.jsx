import { Box, Typography } from "@mui/material";
import React from "react";

const Error = () => {
  return (
    <Box
      sx={{
        height: "100vh",
        margin: "120px",
      }}
    >
      <Typography
        fontSize="100px"
        fontWeight="bold"
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        404 Error
      </Typography>
      <Typography
        fontSize="50px"
        sx={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        Oops! Page not Found
      </Typography>
    </Box>
  );
};

export default Error;
