import React, { useState } from "react";
import { Spinner } from "react-bootstrap";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import { Alert, Snackbar ,Avatar,Button,CssBaseline,TextField,Box,Typography,Container} from "@mui/material";
import { AccountCircle } from "@mui/icons-material";
import { changeUserProfile } from "../helpers/api-helper/user";

const ChangeProfile = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [city, setCity] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [IsSubmitted, setIsSubmitted] = useState(false);
  const [open, setOpen] = useState(true);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    changeUserProfile(
      { firstName, lastName, gender, age, city },
      () => setIsSubmitted(true),
      (error) => setError(error.data),
      () => setIsLoading(false)
    );
  };
  
  const handleClick = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
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
      {IsSubmitted && (
        <Snackbar open={open} autoHideDuration={6000}>
          <Alert variant="filled" severity="success" onClose={handleClose}>
            submitted Successful!
          </Alert>
        </Snackbar>
      )}
      <CssBaseline />
      <Box
        sx={{
          marginTop: 6,
          marginBottom: 6,
          paddingBottom: 6,
          paddingTop: 3,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 2, bgcolor: "#1976d2" }}>
          <ManageAccountsIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Change Profile
        </Typography>
        <Box
          component="form"
          noValidate
          sx={{ mt: 1 }}
          onSubmit={onSubmitHandler}
        >
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              id="firstName"
              label="FirstName"
              variant="standard"
              margin="normal"
              fullWidth
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              id="lastName"
              label="LastName"
              variant="standard"
              margin="normal"
              fullWidth
              onChange={(e) => {
                setLastName(e.target.value);
              }}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              id="gender"
              label="Gender"
              variant="standard"
              margin="normal"
              fullWidth
              onChange={(e) => {
                setGender(e.target.value);
              }}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              id="age"
              label="Age"
              variant="standard"
              margin="normal"
              fullWidth
              onChange={(e) => {
                setAge(e.target.value);
              }}
            />
          </Box>
          <Box sx={{ display: "flex", alignItems: "flex-end" }}>
            <AccountCircle sx={{ color: "action.active", mr: 1, my: 0.5 }} />
            <TextField
              id="city"
              label="City"
              variant="standard"
              margin="normal"
              fullWidth
              onChange={(e) => {
                setCity(e.target.value);
              }}
            />
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 1 }}
            onClick={handleClick}
          >
            {isLoading ? (
              <Spinner animation="grow" variant="secondary" />
            ) : (
              "Submit"
            )}
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default ChangeProfile;
