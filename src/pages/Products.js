import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Form, Spinner } from "react-bootstrap";
import { Alert, Chip, Snackbar, Rating, Stack } from "@mui/material";
import Bounce from "react-reveal/Bounce";
import { getProductList } from "../helpers/api-helper/product";

const Products = () => {
  const navigate = useNavigate();
  const [productList, setProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [open, setOpen] = useState(true);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  const getProductListData = () => {
    setIsLoading(true);
    setError("");
    getProductList(
      (response) => setProductList(response),
      (error) => setError(error.data),
      () => setIsLoading(false)
    );
  };

  const onSubmitHandler = (e) => {
    e.preventDefault()}

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    getProductListData();
  }, []);

  const renderError = () => (
    <div>
      <Snackbar open={open} autoHideDuration={6000}>
        <Alert variant="filled" severity="error" onClose={handleClose}>
          {error}
        </Alert>
      </Snackbar>
      <p>Oops! something went wrong! please try again.</p>
      <button onClick={getProductListData}>Try Again</button>
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
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: "6px",
        }}
      >
        <Form className="d-flex" style={{ width: "30vw" }} onSubmit={onSubmitHandler}>
          <Form.Control
            type="search"
            autoFocus
            placeholder="Search..."
            className="me-2"
            aria-label="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
        </Form>
      </div>
      <Bounce bottom cascade>
        <div className="container">
          {isLoading ? (
            renderLoading()
          ) : error ? (
            renderError()
          ) : (
            <div className="row justify-content-around mx-3">
              <div className="mx-4">
                Sort by:
                <select
                  onChange={(e) => setSort(e.target.value)}
                  style={{ width: "15vw" , height:"30px",marginLeft:"9px" }}
                >
                  <option value="Default">Default</option>
                  <option value="Highest">Highest Price</option>
                  <option value="Lowest">Lowest Price</option>
                </select>
              </div>
              {productList.data
                .slice(14)
                .filter((item) =>
                  item.brand.toLowerCase().includes(search.toLowerCase())
                )
                .sort((x, y) => {
                  switch (sort) {
                    case "Highest":
                      return y.price - x.price;

                    case "Lowest":
                      return x.price - y.price;

                    default:
                      return;
                  }
                })
                .map((item) => (
                  <div
                    className="card my-4 pt-2"
                    style={{ width: "18rem", cursor: "pointer" }}
                    key={item._id}
                    onClick={() => navigate(`product/${item._id}`)}
                  >
                    <Card.Img
                      variant="top"
                      src={item.image}
                      style={{ width: 262, height: 265 }}
                    />
                    <div className="card-body text-center ">
                      <h4>{item.brand}</h4>

                      <div>
                        {item.countInStock > 1 ? (
                          <Chip label="It is in stock" variant="outlined" />
                        ) : (
                          <Chip label="It is not in stock" color="error" />
                        )}
                      </div>
                      <h5 className=" d-flex justify-content-lg-star mt-3">
                        price: $ {item.price}
                      </h5>
                      <div className=" d-flex justify-content-lg-start mt-1">
                        <h6>rate: </h6>
                        <Stack spacing={1}>
                          <Rating
                            name="size-small"
                            size="small"
                            defaultValue={item.rating}
                            precision={0.5}
                          />
                        </Stack>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          )}
        </div>
      </Bounce>
    </>
  );
};

export default Products;
