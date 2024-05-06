import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { TextField, Button, Typography, Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/shared/Message";
import Loader from "../components/shared/Loader";
import { login } from "../actions/userAction";
import FormContainer from "../components/shared/FormContainer";

const LoginScreen = ({ location, history }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const redirect = location.search ? location.search.split("=")[1] : "/";

  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);
  const { loading, error, userInfo } = userLogin;

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <FormContainer>
      <Typography variant="h4">SIGN IN</Typography>
      {error && <Message variant="danger">{error}</Message>}
      {loading && <Loader />}
      <form onSubmit={submitHandler}>
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
        <Button type="submit" variant="contained" color="primary">
          SIGN IN
        </Button>
      </form>
      <Grid container justifyContent="flex-end">
        <Grid item>
          <Typography variant="body2">
            New User?{" "}
            <Link
              to={redirect ? `register?redirect=${redirect}` : "/register"}
              style={{ textDecoration: "none" }}
            >
              Register
            </Link>
          </Typography>
        </Grid>
      </Grid>
    </FormContainer>
  );
};

export default LoginScreen;
