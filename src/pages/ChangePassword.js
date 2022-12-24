import React, { useState } from "react";
import { Spinner } from "react-bootstrap";
import { Alert, Snackbar,Avatar,Button,CssBaseline ,TextField,Box,Typography,Container} from "@mui/material";
import LockResetIcon from "@mui/icons-material/LockReset";
import { ChangePasswordUser } from "../helpers/api-helper/user";

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [open, setOpen] = useState(true);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    ChangePasswordUser(
      { oldPassword, newPassword },
      (response) => setIsSubmitted(true),
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
      {isSubmitted && (
        <Snackbar open={open} autoHideDuration={6000}>
          <Alert variant="filled" severity="success" onClose={handleClose}>
            submitted Successful!
          </Alert>
        </Snackbar>
      )}
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          marginBottom: 6,
          paddingBottom: 6,
          paddingTop: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          bg: "gray",
        }}
      >
        <Avatar sx={{ m: 2, bgcolor: "#1976d2" }}>
          <LockResetIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Change Password
        </Typography>
        <Box
          component="form"
          noValidate
          sx={{ mt: 1 }}
          onSubmit={onSubmitHandler}
        >
          <TextField
            margin="normal"
            fullWidth
            id="password"
            type="password"
            label="Old password"
            name="password"
            autoFocus
            onChange={(e) => {
              setOldPassword(e.target.value);
            }}
          />

          <TextField
            margin="normal"
            fullWidth
            name="password"
            type="password"
            label="New Password"
            id="new password"
            onChange={(e) => {
              setNewPassword(e.target.value);
            }}
          />

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

export default ChangePassword;
