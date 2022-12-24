import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {Avatar,Button,TextField,Grid,Box,Typography,Container} from "@mui/material";
import PlaceIcon from "@mui/icons-material/Place";
import { updateAddressDetailAction } from "../store/actions/address";

const Address = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const shippingAddress = useSelector((state) => state.address);
  const [city, setCity] = useState(shippingAddress ? shippingAddress.city : null);
  const [address, setAddress] = useState(shippingAddress ? shippingAddress.address : null);
  const [postalCode, setPostalCode] = useState(shippingAddress ? shippingAddress.postalCode : null);
  const [phoneNumber, setPhoneNumber] = useState(shippingAddress ? shippingAddress.phoneNumber : null);

  const onSubmissionHandler = () => {
    dispatch(
      updateAddressDetailAction({ city, address, postalCode, phoneNumber })
    );
    navigate("/checkout");
  };

  return (
    <Container className="login" maxWidth="md">
      <Box
        sx={{
          marginTop: 8,
          marginBottom: 6,
          paddingBottom: 6,
          paddingTop: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Avatar sx={{ m: 2, bgcolor: "#1976d2", alignItems: "center" }}>
          <PlaceIcon />
        </Avatar>
        <Typography component="h1" variant="h5" sx={{ alignItems: "center" }}>
          Shipping address
        </Typography>
        <Box
          component="form"
          noValidate
          sx={{ mt: 1 }}
        >
          <Grid item xs={12} sm={6}>
            <TextField
              required
              margin="normal"
              id="city"
              name="city"
              label="City"
              autoFocus
              fullWidth
              defaultValue={city}
              autoComplete="shipping address-level2"
              variant="standard"
              onChange={(e) => {
                setCity(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              required
              margin="normal"
              id="address"
              name="address"
              label="Address"
              fullWidth
              autoComplete="shipping address-line1"
              variant="standard"
              defaultValue={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              margin="normal"
              id="Postal code"
              name="Postal code"
              label="Postal code"
              fullWidth
              autoComplete="shipping postal-code"
              variant="standard"
              defaultValue={postalCode}
              onChange={(e) => {
                setPostalCode(e.target.value);
              }}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              required
              margin="normal"
              id="number"
              name="number"
              label="Phone Number"
              fullWidth
              autoComplete="Phone Number"
              variant="standard"
              defaultValue={phoneNumber}
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
            />
          </Grid>

          <Button
            disabled= {!city || !address || !postalCode ||!phoneNumber}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 1 }}
            onClick={() => onSubmissionHandler()}
          >
            NEXT
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Address;
