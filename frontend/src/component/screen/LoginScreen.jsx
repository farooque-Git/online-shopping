import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Grid, TextField, Button, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Message from "../shared/Message";
import Loader from "../shared/Loader";
import { login } from "../../actions/userAction";
import FormContainer from "../shared/FormContainer";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    // Dispatch the login action
    dispatch(login(email, password));
  };

  return (
    // Center the form vertically and horizontally on the page
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ minHeight: "80vh" }}
    >
      <Grid item xs={12} sm={8} md={6} lg={8}>
        {" "}
        <FormContainer>
          <Typography variant="h4">SIGN IN</Typography>

          {loading && <Loader />}
          <form onSubmit={submitHandler}>
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
            {error && <Message variant="danger">{error}</Message>}
            {/* Submit button */}
            <Button type="submit" variant="contained" color="primary">
              SIGN IN
            </Button>
          </form>
          {/* Link to register page */}
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Typography variant="body2">
                New User?{" "}
                <Link
                  to={redirect ? `/register?redirect=${redirect}` : "/register"}
                  style={{ textDecoration: "none" }}
                >
                  Register
                </Link>
              </Typography>
            </Grid>
          </Grid>
        </FormContainer>
      </Grid>
    </Grid>
  );
};

export default LoginScreen;
