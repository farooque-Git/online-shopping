import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Grid, TextField, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Message from "../shared/Message";
import Loader from "../shared/Loader";
import { login } from "../../actions/userAction";
import FormContainer from "../shared/FormContainer";
import Message from "./../shared/Message";

const RegisterScreen = () => {
  const [name, setName] = useState();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState();
  const [message, setMessage] = useState();

  const location = useLocation();
  const navigate = useNavigate();

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    // Redirect to the specified route if user info is available
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Password do not Match!!!");
    } else {
      // Dispatch the login action
      dispatch(login(email, password));
    }
  };

  return (
    // Center the form vertically and horizontally on the page
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "80vh" }} // Ensure the form fills the entire viewport height
    >
      <Grid item xs={12} sm={8} md={6} lg={8}>
        {" "}
        {/* Adjust the width of the form for different screen sizes */}
        <FormContainer>
          <Typography variant="h4">SIGN IN</Typography>

          {loading && <Loader />}
          <form onSubmit={submitHandler}>
            {/* Name input field */}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="name"
              label="name"
              name="name"
              autoComplete="name"
              autoFocus
              value={text}
              onChange={(e) => setName(e.target.value)}
            />
            {/* Email input field */}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {/* Password input field */}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {/*Confirm Password input field */}
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="confirm-password"
              label="Confirm Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            {error && <Message variant="danger">{error}</Message>}
            {/* Submit button */}
            <Button type="submit" variant="contained" color="primary">
              REGISTER
            </Button>
          </form>
          {/* Link to register page */}
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Typography variant="body2">
                Have an Account?{" "}
                <Link
                  to={redirect ? `login?redirect=${redirect}` : "/login"}
                  style={{ textDecoration: "none" }}
                >
                  Login
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </FormContainer>
      </Grid>
    </Grid>
  );
};

export default RegisterScreen;
