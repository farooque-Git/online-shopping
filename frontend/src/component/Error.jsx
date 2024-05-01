import { Box, Typography, Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const Error = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    // Navigate back to the previous page
    navigate(-1);
  };

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
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          marginTop: "50px",
        }}
      >
        {/* Button to go back */}
        <Button variant="contained" color="primary" onClick={handleGoBack}>
          GO BACK!
        </Button>
      </Box>
    </Box>
  );
};

export default Error;
