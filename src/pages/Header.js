import React from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Container,Nav,Navbar} from "react-bootstrap";
import {Badge,IconButton,Tooltip} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LoginIcon from "@mui/icons-material/Login";
import HomeIcon from "@mui/icons-material/Home";
import Menu from "../Components/Menu";

const Header = () => {
  const navigate = useNavigate();
  const basketItems = useSelector((state) => state.cart);

  let basketCount = 0;
  basketItems.map((item) => {
    basketCount += item.quantity;
  });

const hasUserAuthenticated = localStorage.getItem("token") ? true : false; 

  const renderAuthentication = () => {
    if (hasUserAuthenticated)
      return (
        <div className="menu mx-4 pt-1">
          <Menu />
        </div>
      );
    return (
      <Nav.Link as={Link} to="/login" className="mt-1">
        Login
        <LoginIcon />
      </Nav.Link>
    );
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          <Tooltip title="Home">
            <Navbar.Brand as={Link} to="/" className="mx-3">
              <HomeIcon fontSize="large" color="action" />
            </Navbar.Brand>
          </Tooltip>
           
          <div>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav ">
              <Nav>
                {renderAuthentication()}
                <div className=" badge  mx-4">
                  <Tooltip title="Cart">
                    <IconButton>
                      <Badge badgeContent={basketCount} color="error">
                        <ShoppingCartIcon
                          color="action"
                          onClick={() => navigate("/cart")}
                          aria-label="cart"
                        />
                      </Badge>
                    </IconButton>
                  </Tooltip>
                </div>
              </Nav>
            </Navbar.Collapse>
          </div>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
