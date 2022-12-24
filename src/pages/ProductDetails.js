import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {  useParams } from "react-router-dom";
import { Button, Spinner } from "react-bootstrap";
import { Alert, Snackbar,Rating,Stack } from "@mui/material";
import { getProductDetails } from "../helpers/api-helper/product";
import { updateCartDetailAction } from "../store/actions/cart";
import Fade from 'react-reveal/Fade';



const ProductDetails = () => {
  const dispatch = useDispatch();
  const params = useParams();
  const basketItems = useSelector((store) => store.cart);
  const [productDetails, setProductDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addButtonTitle, setAddButtonTitle] = useState("Add to cart");
  const [isAddButtonDisabled, setIsAddButtonDisabled] = useState(false);

  const getProductDetailsData = () => {
    setIsLoading(true);
    setError(null);
    getProductDetails(
      params.productId,
      (response) => setProductDetails(response.data),
      (error) => setError(error.data),
      () => setIsLoading(false)
    );
  };

  const checkIsAddButtonDisabled = () => {
    if (productDetails.countInStock === 0) {
      setAddButtonTitle("Out of stock");
      setIsAddButtonDisabled(true);
      return;
    }
    const hasFoundInCart = basketItems.some(
      (item) => item._id === productDetails._id
    );
    if (hasFoundInCart) {
      setAddButtonTitle("Already added to cart");
      setIsAddButtonDisabled(true);
      return; 
    }
    setAddButtonTitle("Add to cart");
    setIsAddButtonDisabled(false);
  };

  useEffect(() => {
    getProductDetailsData();
  }, []);

  useEffect(() => {
    checkIsAddButtonDisabled();
  }, [productDetails, basketItems]);

  const renderError = () => (
    <div>
      <Snackbar open autoHideDuration={6000}>
        <Alert variant="filled" severity="error">
          {error}
        </Alert>
      </Snackbar>
      <p>Oops! something went wrong! please try again.</p>
      <button onClick={getProductDetailsData}>Try Again</button>
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
    <div className="container ">
      {isLoading ? (
        renderLoading()
      ) : error ? (
        renderError()
      ) : (
        <Fade left>
        <div className="container  my-5 py-3">
          <div className="row ">
            <div
              className=" product col-md-3 d-flex  justify-content-center "
              key={productDetails._id}
            >
              <img
                src={productDetails.image}
                alt={productDetails.brand}
                height="354px"
                width="310px"
                className="product"
              />
            </div>
            <div className="col-md-9 d-flex flex-column justify-content-center">
              <h1 className="display-5 fw-bold">{productDetails.brand}</h1>
              <hr />
              <h2 className="my-1">{productDetails.category}</h2>
              <h5 className="my-1">{productDetails.name}</h5>
              <small className="my-2">{productDetails.description}</small>
              <p className="my-2"> price: $ {productDetails.price}</p>
              <div className=" d-flex justify-content-lg-start mt-2">
                <h6 className="my-1 mx-1">rate: </h6>
                <Stack spacing={1}>
                  <Rating
                    name="half-rating-read"
                    defaultValue={productDetails.rating}
                    precision={0.5}
                  />
                </Stack>
              </div>
              <Button
                disabled={isAddButtonDisabled}
                className="my-3 col-md-6 d-flex justify-content-center"
                variant="secondary"
                onClick={() =>
                  dispatch(
                    updateCartDetailAction({ ...productDetails, quantity: 1 })
                  )
                }
              >
                {addButtonTitle}
              </Button>
            </div>
          </div>
        </div>
        </Fade>
      )}
    </div>
  );
};

export default ProductDetails;
