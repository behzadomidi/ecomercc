import React from "react";
import { useNavigate } from "react-router-dom";
import { Avatar, Button, Typography ,Container,Box} from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";

const NotFound = () => {
  const navigate = useNavigate();
  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 25,
          marginBottom: 1,
          paddingBottom: 3,
          paddingTop: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 3, bgcolor: "gray" }}>
          <ErrorIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Oops!
        </Typography>
        <Typography component="h1" variant="h5">
          404 - Page NotFound
        </Typography>
        <Button
          color="action"
          variant="contained"
          sx={{ mt: 4, mb: 1 }}
          onClick={() => navigate("/")}
        >
          GO TO HOMEPAGE
        </Button>
      </Box>
    </Container>
  );
};

export default NotFound;
