import React from "react";
import { Breadcrumbs, Link, Box } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const CheckoutStep = ({ step1, step2, step3, step4 }) => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        padding: "16px 0",
        // backgroundColor: '#f5f5f5', // Optional: background color for better visibility
      }}
    >
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          component={RouterLink}
          to="/login"
          color={step1 ? "primary" : "textSecondary"}
          underline={step1 ? "hover" : "none"}
          sx={{ fontWeight: step1 ? "bold" : "normal" }}
        >
          SignIn
        </Link>
        <Link
          component={RouterLink}
          to="/shipping"
          color={step2 ? "primary" : "textSecondary"}
          underline={step2 ? "hover" : "none"}
          sx={{ fontWeight: step2 ? "bold" : "normal" }}
        >
          Shipping
        </Link>
        <Link
          component={RouterLink}
          to="/payment"
          color={step3 ? "primary" : "textSecondary"}
          underline={step3 ? "hover" : "none"}
          sx={{ fontWeight: step3 ? "bold" : "normal" }}
        >
          Payment
        </Link>
        <Link
          component={RouterLink}
          to="/placeorder"
          color={step4 ? "primary" : "textSecondary"}
          underline={step4 ? "hover" : "none"}
          sx={{ fontWeight: step4 ? "bold" : "normal" }}
        >
          Place Order
        </Link>
      </Breadcrumbs>
    </Box>
  );
};

export default CheckoutStep;
