import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Grid,
  Typography,
  TextField,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Message from "../shared/Message";
import Loader from "../shared/Loader";
import { getUserDetails } from "../../actions/userAction";
import FormContainer from "../shared/FormContainer";

const ProfileScreen = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState();
  const [message, setMessage] = useState();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userDetails = useSelector((state) => state.userDetails);
  const { loading, error, user } = userDetails;
  //   const userDetails = useSelector((state) => state.userDetails);
  //   const {
  //     loading: userDetailsLoading,
  //     error: userDetailsError,
  //     user,
  //   } = userDetails || {};

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userUpdateProfile = useSelector((state) => state.userUpdateProfile);
  const { success } = userUpdateProfile;

  const orderListMy = useSelector((state) => state.orderListMy);
  const { loading: loadingOrders, orders, error: errorOrders } = orderListMy;

  useEffect(() => {
    // Redirect to the specified route if user info is available
    if (!userInfo) {
      navigate("/login");
    } else {
      if (!user.name) {
        dispatch(getUserDetails("profile"));
      } else {
        setName(user.name);
        setEmail(user.email);
      }
    }
  }, [navigate, userInfo, user, dispatch]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password does not Match !!!");
    } else {
      // Dispatch the login action
      //   dispatch(updateUserProfile(name, email, password));
    }
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Typography variant="h4">Update Information</Typography>
          {/* Display messages if there are errors, success or loading */}
          <form onSubmit={submitHandler}>
            <TextField
              label="Name"
              fullWidth
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              label="Email Address"
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              fullWidth
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <TextField
              label="Confirm Password"
              fullWidth
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <Button type="submit" variant="contained" color="primary">
              Update
            </Button>
          </form>
        </Grid>
        <Grid item xs={12} md={9}>
          <Typography variant="h4">My Orders</Typography>
          {/* Display loader, error or orders table */}
          {loadingOrders ? (
            <Loader />
          ) : errorOrders ? (
            <Message variant="danger">{errorOrders}</Message>
          ) : (
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>DATE</TableCell>
                    <TableCell>TOTAL</TableCell>
                    <TableCell>PAID</TableCell>
                    <TableCell>DELIVERED</TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orders.map((order) => (
                    <TableRow key={order._id}>
                      <TableCell>{order._id}</TableCell>
                      <TableCell>{order.createdAt.substring(0, 10)}</TableCell>
                      <TableCell>{order.totalPrice}</TableCell>
                      <TableCell>
                        {order.isPaid ? (
                          order.paidAt.substring(0, 10)
                        ) : (
                          <i
                            className="fas fa-times"
                            style={{ color: "red" }}
                          ></i>
                        )}
                      </TableCell>
                      <TableCell>
                        {order.isDelivered ? (
                          order.deliveredAt.substring(0, 10)
                        ) : (
                          <i
                            className="fas fa-times"
                            style={{ color: "red" }}
                          ></i>
                        )}
                      </TableCell>
                      <TableCell>
                        <Link to={`/order/${order._id}`}>
                          <Button variant="outlined">Details</Button>
                        </Link>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Grid>
      </Grid>
    </>
  );
};

export default ProfileScreen;
