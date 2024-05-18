import React, { useEffect } from "react";
import {
  Button,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Divider,
} from "@mui/material";
import { Link } from "react-router-dom";
import { createOrder } from "../../actions/orderAction";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../component/shared/Message";
import CheckoutStep from "../../component/shared/CheckoutStep";
import { useNavigate } from "react-router-dom";

const PlaceOrderScreen = () => {
  const navigate = useNavigate(); // Correctly calling useNavigate as a hook
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const orderCreate = useSelector((state) => state.orderCreate);
  const { order, success, error } = orderCreate;

  // Function for decimal
  const addDecimal = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  // Calculate prices
  const itemsPrice = Number(
    cart.cartItems
      .reduce(
        (acc, item) =>
          acc + Number(item.price.replace(/[^0-9.-]+/g, "")) * item.qty,
        0
      )
      .toFixed(2)
  );
  const shippingPrice = itemsPrice > 500 ? 0 : 50;
  const taxPrice = addDecimal(Number((0.15 * itemsPrice).toFixed(2)));
  const totalPrice = (
    Number(itemsPrice) +
    Number(shippingPrice) +
    Number(taxPrice)
  ).toFixed(2);

  cart.itemsPrice = addDecimal(itemsPrice);
  cart.shippingPrice = addDecimal(shippingPrice);
  cart.taxPrice = taxPrice;
  cart.totalPrice = totalPrice;

  const placeOrderHandler = () => {
    dispatch(
      createOrder({
        orderItems: cart.cartItems,
        shippingAddress: cart.shippingAddress,
        paymentMethod: cart.paymentMethod,
        itemsPrice: cart.itemsPrice,
        shippingPrice: cart.shippingPrice,
        taxPrice: cart.taxPrice,
        totalPrice: cart.totalPrice,
      })
    );
  };

  useEffect(() => {
    if (success) {
      navigate(`/order/${order._id}`);
    }
  }, [navigate, success]);

  return (
    <>
      <CheckoutStep step1 step2 step3 step4 />
      <Grid container spacing={3}>
        <Grid item md={8}>
          <List>
            <ListItem>
              <Typography variant="h6" sx={{ marginRight: "10px" }}>
                Shipping
              </Typography>
              <Typography>
                <strong>Address:</strong> {cart.shippingAddress.address},{" "}
                {cart.shippingAddress.city}, {cart.shippingAddress.postalcode},{" "}
                {cart.shippingAddress.country}
              </Typography>
            </ListItem>
            <Divider />
            <ListItem>
              <Typography variant="h6" sx={{ marginRight: "10px" }}>
                Payment
              </Typography>
              <Typography>
                <strong>Method:</strong> {cart.paymentMethod}
              </Typography>
            </ListItem>
            <Divider />
            <ListItem>
              <Typography variant="h6">Order Items</Typography>
              {cart.cartItems.length === 0 ? (
                <Message>Your Cart is Empty</Message>
              ) : (
                <List>
                  {cart.cartItems.map((item, index) => (
                    <ListItem key={index}>
                      <Grid container spacing={2}>
                        <Grid item xs={2}>
                          <CardMedia
                            component="img"
                            image={item.image}
                            alt={item.name}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography>
                            {item.qty} x ₹
                            {Number(item.price.replace(/[^0-9.-]+/g, ""))} = ₹
                            {addDecimal(
                              item.qty *
                                Number(item.price.replace(/[^0-9.-]+/g, ""))
                            )}
                          </Typography>
                        </Grid>
                      </Grid>
                    </ListItem>
                  ))}
                </List>
              )}
            </ListItem>
          </List>
        </Grid>
        <Grid item md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Order Summary</Typography>
              <List>
                <ListItem>
                  <ListItemText primary="Items" />
                  <Typography>₹{cart.itemsPrice}</Typography>
                </ListItem>
                <ListItem>
                  <ListItemText primary="Shipping" />
                  <Typography>₹{cart.shippingPrice}</Typography>
                </ListItem>
                <ListItem>
                  <ListItemText primary="Tax" />
                  <Typography>₹{cart.taxPrice}</Typography>
                </ListItem>
                <ListItem>
                  <ListItemText primary="Total" />
                  <Typography>₹{cart.totalPrice}</Typography>
                </ListItem>
              </List>
              <Divider />
              {error && <Message variant="danger">{error}</Message>}
              <Button
                type="button"
                variant="contained"
                color="primary"
                fullWidth
                disabled={cart.cartItems.length === 0}
                onClick={placeOrderHandler}
                sx={{ mt: 2 }}
              >
                Place Order
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default PlaceOrderScreen;
