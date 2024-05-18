import React, { useState } from "react";
import {
  FormControlLabel,
  Radio,
  RadioGroup,
  Button,
  Container,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { savePaymentMethod } from "../../actions/cartAction";
import CheckoutStep from "../../component/shared/CheckoutStep";
import { useNavigate } from "react-router-dom";

const PaymentScreen = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  if (!shippingAddress.address) {
    navigate("/shipping");
  }
  const dispatch = useDispatch();
  const [paymentMethod, setPaymentMethod] = useState("paypal");
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/placeorder");
  };

  return (
    <Container
      maxWidth="sm"
      sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <CheckoutStep step1 step2 step3 />
      <h1>Payment Method</h1>
      <form onSubmit={submitHandler}>
        <RadioGroup
          aria-label="payment-method"
          name="paymentMethod"
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <FormControlLabel
            value="paypal"
            control={<Radio />}
            label="Paypal or Credit Card"
          />
        </RadioGroup>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ marginTop: "10px" }}
        >
          Continue
        </Button>
      </form>
    </Container>
  );
};

export default PaymentScreen;
