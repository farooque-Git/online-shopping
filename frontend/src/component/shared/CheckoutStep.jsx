import React from "react";
import { Breadcrumbs, Link } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

const CheckoutStep = ({ step1, step2, step3, step4 }) => {
  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Link
          component={RouterLink}
          to="/login"
          color={step1 ? "inherit" : "textSecondary"}
          underline={step1 ? "hover" : "none"}
        >
          {step1 ? "SignIn" : "SignIn"}
        </Link>
        <Link
          component={RouterLink}
          to="/shipping"
          color={step2 ? "inherit" : "textSecondary"}
          underline={step2 ? "hover" : "none"}
        >
          {step2 ? "Shipping" : "Shipping"}
        </Link>
        <Link
          component={RouterLink}
          to="/payment"
          color={step3 ? "inherit" : "textSecondary"}
          underline={step3 ? "hover" : "none"}
        >
          {step3 ? "Payment" : "Payment"}
        </Link>
        <Link
          component={RouterLink}
          to="/placeorder"
          color={step4 ? "inherit" : "textSecondary"}
          underline={step4 ? "hover" : "none"}
        >
          {step4 ? "Place Order" : "Place Order"}
        </Link>
      </Breadcrumbs>
    </>
  );
};

export default CheckoutStep;
