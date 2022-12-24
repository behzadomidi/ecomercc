import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { Alert, Snackbar ,Avatar,Button,CssBaseline,TextField,Grid,Box,Typography,Container} from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import { registerUser } from "../helpers/api-helper/authentication";

const Register = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [open, setOpen] = useState(true);
  let timeOut;

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    registerUser(
      { email, password, userName, mobile, confirmPassword },
      (response) => {
        setIsSubmitted(true);
        timeOut = setTimeout(() => navigate("/login"), 2000);
      },
      (error) => setError(error.data),
      () => setIsLoading(false)
    );
  };

  useEffect(() => {
    return () => {
      clearTimeout(timeOut);
    };
  }, []);

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
      {isSubmitted && (
        <Snackbar open={open} autoHideDuration={6000}>
          <Alert variant="filled" severity="success" onClose={handleClose}>
            User Registration Successful! Please Login.
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
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "#1976d2" }}>
          <LockOpenIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Box
          component="form"
          noValidate
          sx={{ mt: 1 }}
          onSubmit={onSubmitHandler}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="userName"
            label="User Name"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={(e) => setUserName(e.target.value)}
            value={userName}
          />
          <TextField
            margin="normal"
            helperText={
              emailError && "Email is not valid. please inter a correct email."
            }
            required
            error={emailError}
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => {
              setEmailError(false);
              setEmail(e.target.value);
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="number"
            label="Phone Number "
            id="number"
            value={mobile}
            onChange={(e) => setMobile(e.target.value)}
          />
          <TextField
            helperText={passwordError && "Password is not valid."}
            error={passwordError}
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
              setPasswordError(false);
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 1 }}
            disabled={!password || !email || !userName ||!mobile || !confirmPassword || isLoading}
            onClick={handleClick}
          >
            {isLoading ? (
              <Spinner animation="grow" variant="secondary" />
            ) : (
              "Sign Up"
            )}
          </Button>
          <Grid container>
            <Grid item xs></Grid>
            <Grid item sx={{ mb: 2 }}>
              <Link to="/login" variant="body1">
                {" Go to login page"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
