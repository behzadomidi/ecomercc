import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Alert, ButtonGroup, Snackbar ,Typography,List,ListItem,ListItemText,Grid,Container,Box,Button} from "@mui/material";
import { orderSubmit } from "../helpers/api-helper/product";
import { Spinner } from "react-bootstrap";
import { emptyCartAction } from "../store/actions/cart";

const CheckOut = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const shippingAddress = useSelector((state) => state.address);
  const cartItems = useSelector((state) => state.cart);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [isSubmissionSucceed,setIsSubmissionSucceed] = useState(false);
  const [open, setOpen] = useState(true);
  let calculatedTotalPrice = 0;
  let timeOut;

  function calculateTotalPrice() {
    cartItems.map((item) => {
      calculatedTotalPrice = calculatedTotalPrice + item.price * item.quantity;
    });
    return calculatedTotalPrice;
  }

  const onSubmitHandler = (e) => {
    setIsLoading(true);
    setError('');
    const products = cartItems.map(item => ({
      product: item._id,
      qty: item.quantity,
    }));
    orderSubmit(
      { products, shippingAddress, calculatedTotalPrice },
      (response) => {
        setIsSubmissionSucceed(true)
      },
      (error) => setError(error.data),
      () => setIsLoading(false)
    );
  };

  const navigateAfterSubmitted = () => {
    dispatch(emptyCartAction());
    navigate("/");
  }

  useEffect(() => {
    if(isSubmissionSucceed) {
      timeOut = setTimeout(() => navigateAfterSubmitted(), 2000);
    }
  },[isSubmissionSucceed])

  useEffect(() => {
    return () => {
      clearTimeout(timeOut);
    };
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  if (cartItems.length <= 0) {
    return (
      <div className="px-4 my-5 mx-3 bg-light rounded-3 py-5">
        <div className="container py-1 justify-content-between">
          <div className="row">
            <h3>
              Your Cart is Empty.
              <br />
              Please add the order to the cart.
            </h3>
          </div>
          <Button
            variant="outlined"
            sx={{ mt: 3, mb: 1 }}
            onClick={() => navigate("/")}
          >
            Edit
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Container className="login" component="main" maxWidth="md">
          {error && (
        <Snackbar open={open} autoHideDuration={6000}>
          <Alert variant="filled" severity="error" onClose={handleClose}>
            {error}
          </Alert>
        </Snackbar>
      )}
      {isSubmissionSucceed && (
        <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
          <Alert variant="filled" severity="success">
            submitted Successful!
          </Alert>
        </Snackbar>
      )}
      <Box
        sx={{
          marginTop: 8,
          marginBottom: 6,
          paddingBottom: 4,
          paddingTop: 2,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Order summary
        </Typography>
        <List disablePadding>
          {cartItems.map((item) => (
            <ListItem sx={{ py: 1, px: 1 }} key= {item._id}>
              <ListItemText
                primary={item.name}
                secondary={`Count: ${item.quantity}`}
              />
              <Typography variant="body2">Price: ${item.price * item.quantity}</Typography>
            </ListItem>
          ))}
          <ListItem sx={{ py: 1, px: 1 }}>
            <ListItemText primary="Total Price" />
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
              ${calculateTotalPrice()}
            </Typography>
          </ListItem>
          <hr/>
        </List>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Shipping Address
            </Typography>
            <Typography gutterBottom>
              City: {shippingAddress.city}
            </Typography>
            <Typography gutterBottom>
              Addresses: {shippingAddress.address}
            </Typography>
            <Typography gutterBottom>
              Phone Number: {shippingAddress.phoneNumber}
            </Typography>
            <Typography gutterBottom>
              Postal code: {shippingAddress.postalCode}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Payment details
            </Typography>
            <Typography gutterBottom>Payment method: cash</Typography>
            <Typography gutterBottom>shippingPrice: $5</Typography>
          </Grid>
        </Grid>
        <Box
          sx={{ display: "flex" }}
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <ButtonGroup variant="text" aria-label="text button group"  sx={{ m: 1 }}>
          <Button
            onClick={() => navigate("/cart")}
          >
            Edit Cart
          </Button>
          <Button
            onClick={() => navigate("/address")}
          >
            Edit Address
          </Button>
          </ButtonGroup >
          <Button
            onClick={onSubmitHandler}
            type="submit"
            variant="contained"
            sx={{ m: 2 }}
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

export default CheckOut;
