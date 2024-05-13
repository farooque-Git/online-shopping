import React, { useState } from "react";
import { Button, TextField, Grid } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FromContainer from "../../component/shared/FormContainer";
import CheckoutStep from "../../component/shared/CheckoutStep";
import { saveShippingAddress } from "../../actions/cartAction";

const ShippingScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address || "");
  const [city, setCity] = useState(shippingAddress.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress.postalCode || ""
  );
  const [country, setCountry] = useState(shippingAddress.country || "");

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/payment");
  };

  return (
    <>
      <CheckoutStep step1 step2 />
      <FromContainer>
        <form onSubmit={submitHandler}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="address"
                label="Address"
                name="address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="city"
                label="City"
                name="city"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="postalCode"
                label="Postal Code"
                name="postalCode"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="country"
                label="Country"
                name="country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </Grid>
          </Grid>
          <Button type="submit" variant="contained" color="primary">
            Continue
          </Button>
        </form>
      </FromContainer>
    </>
  );
};

export default ShippingScreen;
