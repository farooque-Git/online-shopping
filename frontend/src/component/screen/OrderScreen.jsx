import React, { useState, useEffect } from "react";
import axios from "axios";
import { ORDER_PAY_RESET } from "../../constants/orderConstant";
import {
  Grid,
  List,
  ListItem,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Avatar,
  Divider,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { getOrderDetails, payOrder } from "../../actions/orderAction";
import { useDispatch, useSelector } from "react-redux";
import Message from "../shared/Message";
import Loader from "../shared/Loader";
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

const OrderScreen = () => {
  const { id: orderId } = useParams();
  const [sdkReady, setSdkReady] = useState(false);
  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { loading: loadingPay, success: successPay } = orderPay;

  if (!loading) {
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  const successPaymentHandler = (paymentResult) => {
    console.log(paymentResult);
    dispatch(payOrder(orderId, paymentResult));
  };

  useEffect(() => {
    const addPaypalScript = async () => {
      const { data: clientId } = await axios.get("/api/config/paypal");
      const script = document.createElement("script");
      script.type = "text/javascript";
      // Replace '1.0.2' with the desired PayPal SDK version
      script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}&currency=USD&commit=true&v=1.0.2`;
      script.async = true;
      script.onload = () => {
        setSdkReady(true);
      };
      document.body.appendChild(script);
    };

    if (!order || successPay || (order && order._id !== orderId)) {
      dispatch({ type: ORDER_PAY_RESET });
      dispatch(getOrderDetails(orderId));
    } else if (!order.isPaid) {
      if (!window.paypal) {
        addPaypalScript();
      } else {
        setSdkReady(true);
      }
    }
  }, [dispatch, orderId, order, successPay]);

  // useEffect(() => {
  //   if (sdkReady && !order.isPaid) {
  //     window.paypal
  //       .Buttons({
  //         createOrder: (data, actions) => {
  //           return actions.order.create({
  //             purchase_units: [
  //               {
  //                 amount: {
  //                   value: order.totalPrice,
  //                 },
  //               },
  //             ],
  //           });
  //         },
  //         onApprove: (data, actions) => {
  //           return actions.order.capture().then((paymentResult) => {
  //             successPaymentHandler(paymentResult);
  //           });
  //         },
  //       })
  //       .render("#paypal-button-container");
  //   }
  // }, [sdkReady, order, successPaymentHandler]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <Typography variant="h4">Order {order._id}</Typography>
      <Grid container spacing={3}>
        <Grid item md={8}>
          <List>
            <ListItem>
              <Typography variant="h5">Shipping</Typography>
            </ListItem>
            <ListItem>
              <Typography>
                <strong>Name:</strong> {order.user.name}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                <strong>Email:</strong> {order.user.email}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography>
                <strong>Address:</strong>
                {order.shippingAddress.address}&nbsp;
                {/* {order.shippingAddress.address}{" "}, */}
                {order.shippingAddress.city}&nbsp;
                {order.shippingAddress.postalCode}&nbsp;
                {order.shippingAddress.country}&nbsp;
              </Typography>
            </ListItem>
            <ListItem>
              {order.isDelivered ? (
                <Message variant="success">
                  Delivered on {order.deliveredAt}
                </Message>
              ) : (
                <Message variant="danger">Not Delivered</Message>
              )}
            </ListItem>
            <Divider />
            <ListItem>
              <Typography variant="h5">Payment Method</Typography>
            </ListItem>
            <ListItem>
              <Typography>
                <strong>Method:</strong> {order.paymentMethod}
              </Typography>
            </ListItem>
            <ListItem>
              {order.isPaid ? (
                <Message variant="success">Paid on {order.paidAt}</Message>
              ) : (
                <Message variant="danger">Not Paid</Message>
              )}
            </ListItem>
            <Divider />
            <ListItem>
              <Typography variant="h5">Order Items</Typography>
            </ListItem>
            <ListItem>
              {order.orderItems.length === 0 ? (
                <Message>Your Cart is Empty</Message>
              ) : (
                <List>
                  {order.orderItems.map((item, index) => (
                    <ListItem key={index}>
                      <Grid container spacing={2} alignItems="center">
                        <Grid item md={1}>
                          <Avatar
                            src={item.image}
                            alt={item.name}
                            variant="rounded"
                          />
                        </Grid>
                        <Grid item md={6}>
                          <Link to={`/product/${item.product}`}>
                            {item.name}
                          </Link>
                        </Grid>
                        <Grid item md={5}>
                          {item.qty} x ₹{item.price} = ₹{item.qty * item.price}
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
              <Typography variant="h5">Order Summary</Typography>
              <List>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      Items
                    </Grid>
                    <Grid item xs={6}>
                      ₹{order.itemsPrice}
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      Shipping
                    </Grid>
                    <Grid item xs={6}>
                      ₹{order.shippingPrice}
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      Tax
                    </Grid>
                    <Grid item xs={6}>
                      ₹{order.taxPrice}
                    </Grid>
                  </Grid>
                </ListItem>
                <ListItem>
                  <Grid container>
                    <Grid item xs={6}>
                      Total
                    </Grid>
                    <Grid item xs={6}>
                      ₹{order.totalPrice}
                    </Grid>
                  </Grid>
                </ListItem>
                {error && (
                  <ListItem>
                    <Message variant="danger">{error}</Message>
                  </ListItem>
                )}
                {!order.isPaid && (
                  <ListItem>
                    {loadingPay && <CircularProgress />}
                    {!sdkReady ? (
                      <CircularProgress />
                    ) : (
                      <PayPalScriptProvider>
                        <PayPalButtons
                          style={{ layout: "horizontal" }}
                          amount={order.totalPrice}
                          onSuccess={successPaymentHandler}
                        />
                      </PayPalScriptProvider>
                    )}
                  </ListItem>
                )}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default OrderScreen;
