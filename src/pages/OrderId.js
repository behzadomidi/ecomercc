import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { Alert, Snackbar,Grid,Typography,List,ListItem,ListItemText,Container,Box,Button } from "@mui/material";
import { getOrderDetails } from "../helpers/api-helper/product";

const OrderId = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [ordersDetails, setOrdersDetails] = useState([]);

  const getOrdersListData = () => {
    setIsLoading(true);
    setError(null);
    getOrderDetails(
      params.orderId,
      (response) => setOrdersDetails(response.data),
      (error) => setError(error.data),
      () => setIsLoading(false)
    );
  };

  useEffect(() => {
    getOrdersListData();
  }, []);

  const renderError = () => (
    <div>
      <Snackbar open autoHideDuration={6000}>
        <Alert variant="filled" severity="error">
          {error}
        </Alert>
      </Snackbar>
    </div>
  );

  const renderLoading = () => (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <Spinner animation="grow" variant="secondary" />
    </div>
  );

  return (
    <Container className="login" component="main" maxWidth="md">
      {isLoading ? (
        renderLoading()
      ) : error ? (
        renderError()
      ) : (
        <Box
          sx={{
            marginTop: 6,
            marginBottom: 6,
            paddingBottom: 6,
            paddingTop: 4,
          }}
        >
          <Typography variant="h6" gutterBottom>
            Order details
          </Typography>
          <List disablePadding>
            {ordersDetails.orderItems.map((item) => (
              <ListItem sx={{ py: 1, px: 1 }} key={item._id}>
                <ListItemText
                  primary={item.product.name}
                  secondary={`Count: ${item.qty}`}
                />
                <Typography variant="body2">
                  Price: ${item.product.price * item.qty}
                </Typography>
              </ListItem>
            ))}

            <ListItem sx={{ py: 1, px: 1 }}>
              <ListItemText primary="Total Price" />
              <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                $ {ordersDetails.totalPrice}
              </Typography>
            </ListItem>
            <hr />
          </List>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Shipping Address
              </Typography>
              <Typography gutterBottom>
                City: {ordersDetails.shippingAddress.city}
              </Typography>
              <Typography gutterBottom>
                Address: {ordersDetails.shippingAddress.address}
              </Typography>
              <Typography gutterBottom>
                Phone Number: {ordersDetails.shippingAddress.phone}
              </Typography>
              <Typography gutterBottom>
                Postal code: {ordersDetails.shippingAddress.postalCode}
              </Typography>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                Payment details
              </Typography>
              <Typography gutterBottom>
                Payment method: {ordersDetails.paymentMethod}
              </Typography>
              <Typography gutterBottom>
                shippingPrice: $ {ordersDetails.shippingPrice}
              </Typography>
            </Grid>
          </Grid>
          <Box
            sx={{ display: "flex" }}
            container
            direction="row"
            justifyContent="space-between"
            alignItems="center"
          >
            <Button
              variant="outlined"
              sx={{ mt: 3, mb: 1 }}
              onClick={() => navigate("/orders")}
            >
              Go Back
            </Button>
          </Box>
        </Box>
      )}
    </Container>
  );
};

export default OrderId;
