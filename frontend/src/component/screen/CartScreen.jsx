import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../../actions/cartAction";
import { useParams, useLocation, Link } from "react-router-dom";
import {
  Card,
  Button,
  Typography,
  Grid,
  FormControl,
  Select,
  MenuItem,
  Paper,
  IconButton,
} from "@mui/material";
import { DeleteOutline } from "@mui/icons-material";

const CartScreen = ({ history }) => {
  const { id } = useParams();
  const productId = id;
  const location = useLocation();
  const qty = location.search ? Number(location.search.split("=")[1]) : 1; //in searchBar qty=1 {qty=} will be 0, {1} is 1 index
  const dispatch = useDispatch();
  //   const history = useHistory();

  useEffect(() => {
    if (productId) {
      dispatch(addToCart(productId, qty));
    }
  }, [dispatch, productId, qty]);

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const removeFromCartHandler = (id) => {
    dispatch(removeFromCart(id));
  };

  const checkout = () => {
    history.pushState("./login?redirect=shipping");
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={8}>
          <Typography variant="h4">Your Bucket List</Typography>
          {cartItems.length === 0 ? (
            <Paper elevation={3} style={{ padding: "20px", marginTop: "10px" }}>
              <Typography variant="body1">
                Your Bucket-List is Empty! <Link to="/">Go Back</Link>
              </Typography>
            </Paper>
          ) : (
            cartItems.map((item) => (
              <Paper
                key={item.product}
                elevation={3}
                style={{ padding: "20px", marginTop: "10px" }}
              >
                <Grid container alignItems="center" spacing={2}>
                  <Grid item xs={2}>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{ maxWidth: "100%" }}
                    />
                  </Grid>
                  <Grid item xs={3}>
                    <Link
                      to={`/product/${item.product}`}
                      style={{ textDecoration: "none", color: "inherit" }}
                    >
                      <Typography variant="body1">{item.name}</Typography>
                    </Link>
                  </Grid>
                  <Grid item xs={2}>
                    <Typography variant="body1">${item.price}</Typography>
                  </Grid>
                  <Grid item xs={2}>
                    <FormControl variant="outlined">
                      <Select
                        value={item.qty}
                        onChange={(e) =>
                          dispatch(
                            addToCart(item.product, Number(e.target.value))
                          )
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((x) => (
                          <MenuItem key={x + 1} value={x + 1}>
                            {x + 1}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={2}>
                    <IconButton
                      onClick={() => removeFromCartHandler(item.product)}
                    >
                      <DeleteOutline />
                    </IconButton>
                  </Grid>
                </Grid>
              </Paper>
            ))
          )}
        </Grid>
        <Grid item xs={12} md={4}>
          <Card style={{ padding: "20px", margin: "100px" }}>
            <Typography variant="h5">
              Sub-Total ({cartItems.reduce((acc, item) => acc + item.qty, 0)}{" "}
              items)
            </Typography>
            <Typography variant="h6">
              ₹
              {/*  This is for only Number {cartItems
                .reduce((acc, item) => acc + item.qty * item.price, 0)
                .toFixed(2)} */}
              {cartItems
                .reduce(
                  (acc, item) =>
                    acc +
                    parseFloat(item.price.replace(/[^\d.-]+/g, "")) * item.qty,
                  0
                )
                .toFixed(2)}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              disabled={cartItems.length === 0}
              onClick={checkout}
              style={{ marginTop: "20px" }}
            >
              Proceed to Checkout
            </Button>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default CartScreen;
