import React from "react";
import Products from "./Products";

const Home = () => {
  return (
    <>
      <div className="col-12 text-center mt-4 container">
          <h1 className="fw-semibold">Product</h1>
        <hr />
      </div>
      <Products />
    </>
  );
};

export default Home;
