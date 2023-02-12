import React, { useState } from "react";
import { ChangeAvatarUser } from "../helpers/api-helper/user";
import { Spinner } from "react-bootstrap";
import {
  Alert,
  CssBaseline,
  Snackbar,
  Typography,
  Container,
  Box,
  Avatar,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import PhotoCamera from "@mui/icons-material/PhotoCamera";

const ChangeAvatar = () => {
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [open, setOpen] = useState(true);

  const handelChange = (e) => {
    setError("");
    setIsSubmitted(false);
    setImage(e.target.files[0]);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("profile-image", image);
    setIsLoading(true);
    setError("");
    ChangeAvatarUser(
      formData,
      () => setIsSubmitted(true),
      (error) => setError(error.data),
      () => setIsLoading(false)
    );
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Container className="login" component="main" maxWidth="md">
      {error && (
        <Snackbar open={open}>
          <Alert variant="filled" severity="error" onClose={handleClose}>
            {error}
          </Alert>
        </Snackbar>
      )}
      {isSubmitted && (
        <Snackbar open={open}>
          <Alert variant="filled" severity="success" onClose={handleClose}>
            submitted Successful!
          </Alert>
        </Snackbar>
      )}
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          marginBottom: 8,
          paddingBottom: 4,
          paddingTop: 4,
          paddingLeft: 6,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 3, bgcolor: "#1976d2" }}>
          <AccountCircleIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Change Avatar
        </Typography>
        <Box
          sx={{
            marginTop: 8,
            marginBottom: 8,
            paddingBottom: 8,
            paddingTop: 8,

            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <form onSubmit={onSubmitHandler}>
            <input onChange={handelChange} type="file" />
            <button type="submit" className="btn btn-primary">
              <PhotoCamera />
              {isLoading ? (
                <Spinner animation="grow" variant="secondary" />
              ) : (
                "Upload Image"
              )}
            </button>
          </form>
        </Box>
      </Box>
    </Container>
  );
};

export default ChangeAvatar;
