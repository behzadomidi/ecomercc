import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { Alert ,Avatar,CssBaseline,TextField,Grid,Box,Typography,Container,Button,Snackbar} from "@mui/material";
import LoginIcon from "@mui/icons-material/Login";
import { loginUser } from "../helpers/api-helper/authentication";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [open, setOpen] = useState(true);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    loginUser(
      { email, password },
      dispatch,
      (response) => {
        localStorage.setItem("token", response.data.token);
        navigate("/");
      },
      (error) => setError(error.data),
      () => setIsLoading(false)
    );
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleClick = () => {
    setOpen(true);
  };

  return (
    <Container className="login" component="main" maxWidth="xs">
      {error && (
        <Snackbar open={open} autoHideDuration={6000}>
          <Alert variant="filled" severity="error" onClose={handleClose}>
            {error}
          </Alert>
        </Snackbar>
      )}
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          bg: "gray",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "#1976d2" }}>
          <LoginIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box
          component="form"
          noValidate
          sx={{ mt: 1 }}
          onSubmit={onSubmitHandler}
        >
          <TextField
            type="email"
            helperText={
              emailError && "Email is not valid. please inter a correct email."
            }
            error={emailError}
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            autoFocus
            onChange={(e) => {
              setEmailError(false);
              setEmail(e.target.value);
            }}
          />

          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={password}
            autoComplete="current-password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={!password || !email || isLoading}
            onClick={handleClick}
          >
            {isLoading ? (
              <Spinner animation="grow" variant="secondary" />
            ) : (
              "Sign In"
            )}
          </Button>
          <Grid container>
            <Grid item xs></Grid>
            <Grid item>
              <Link to="/register" variant="body1">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
