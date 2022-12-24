import {
  UPDATE_CART_DETAIL,
  REMOVE_CART_DETAIL,
  INCREASE_CART_DETAIL,
  DECREASE_CART_DETAIL,
  EMPTY_CART,
} from "../constants/cart";

const initialState = [];

const cart = (state = initialState, { type, payload }) => {
  switch (type) {
    case UPDATE_CART_DETAIL:
      return [...state, payload];
    case REMOVE_CART_DETAIL:
      return state.filter((product) => {
        return product._id !== payload;
      });
    case INCREASE_CART_DETAIL:
      return state.map((product) => {
        if (product._id === payload )return { ...product, quantity: product.quantity + 1 };
        return product;
      });
      case DECREASE_CART_DETAIL:
      return state.map((product) => {
        if (product._id === payload )return { ...product, quantity: product.quantity -1 };
        return product;
      });
      case EMPTY_CART:
        return initialState;
    default:
      return state;
  }
};

export default cart;
