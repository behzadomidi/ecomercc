import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
// import { Button } from "react-bootstrap";
import { Alert, Snackbar,IconButton,Tooltip,Button} from "@mui/material";
import { green } from "@mui/material/colors";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import DeleteIcon from "@mui/icons-material/Delete";
import Fade from "react-reveal/Fade";
import {
  decreaseCartDetailAction,
  increaseCartDetailAction,
  removeCartDetailAction,
} from "../store/actions/cart";

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItem = useSelector((state) => state.cart);
  const [error, setError] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [open, setOpen] = useState(false);

  const renderEmptyCart = () => (
    <Fade left>
      <div className="px-4 my-5 mx-3 bg-light rounded-3 py-5">
        <div className="container py-1 justify-content-between">
          <div className="row">
            <h3> Your Cart is Empty</h3>
          </div>
          <Button
         
          color="action"
          variant="contained"
          sx={{ mt: 2}}
          onClick={() => navigate("/")}
        >
          GO TO HOMEPAGE
        </Button>
        </div>
      </div>
    </Fade>
  );

  const onIncreaseButtonClick = (productDetails) => {
    setError('');
    setOpen(true);
    if (productDetails.quantity + 1 > productDetails.countInStock)
      return setError(productDetails.brand);
    dispatch(increaseCartDetailAction(productDetails._id));
  };

  const onDecreaseButtonClick = (productDetails) => {
    if (productDetails.quantity - 1 <= 0) return;
    dispatch(decreaseCartDetailAction(productDetails._id));
  };

  function calculateTotalPrice() {
    let calculatedTotalPrice = 0;
    cartItem.map((item) => {
      calculatedTotalPrice = calculatedTotalPrice + item.price * item.quantity;
    });
    setTotalPrice(calculatedTotalPrice);
  }

  useEffect(() => {
    calculateTotalPrice();
  }, [cartItem]);

  const handleClose = () => {
    setError('');
    setOpen(false);
  };

  return (
    <>
      {error && (
        <Snackbar open={open}>
          <Alert variant="filled" severity="error" onClose={handleClose}>
            Could'nt add {error} to basket
          </Alert>
        </Snackbar>
      )}
      {cartItem.length === 0 ? (
        renderEmptyCart()
      ) : (
        <div className="px-3 my-3 bg-light rounded-3">
          <div className="container py-3 ">
            {cartItem.map((productDetails) => {
              return (
                <div
                  className="row d-flex  justify-content-center "
                  key={productDetails._id}
                >
                  <div className="col-md-4  py-2">
                    <img
                      src={productDetails.image}
                      height="200px"
                      width="160px"
                    />
                  </div>
                  <div className="col-md-3 ml-0 py-5 ">
                    <h3>{productDetails.brand}</h3>
                    <p className="lead  mt-4">
                      base: ${productDetails.price}
                      <br />
                      price: ${productDetails.price * productDetails.quantity}
                    </p>
                  </div>
                  <div className="col-md-3 py-5  align-items-center ">
                    <AddCircleOutlineIcon
                      sx={{ fontSize: 25, color: green[400] }}
                      className="btn-btn mb-3"
                      onClick={() => onIncreaseButtonClick(productDetails)}
                    />
                    <p>QTY: {productDetails.quantity}</p>
                    <RemoveCircleOutlineIcon
                      sx={{ fontSize: 25 }}
                      color="primary"
                      className="btn-btn"
                      onClick={() => onDecreaseButtonClick(productDetails)}
                    />
                  </div>
                  <div className="col-md-2 pt-5 mt-4 ">
                    <Tooltip
                      title="Delete"
                      onClick={() =>
                        dispatch(removeCartDetailAction(productDetails._id))
                      }
                    >
                      <IconButton>
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </div>
                  <hr />
                </div>
              );
            })}
          </div>
          <div className="px-1 my-1 mx-1 bg-light ">
            <div className="container py-3 mx-4 d-flex justify-content-between ">
              <div className="row">
                <h3>Total Price: ${totalPrice}</h3>
              </div>
              <Button
                className=" px-5 py-2"

                variant="contained"
                onClick={() => navigate("/address")}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Cart;
