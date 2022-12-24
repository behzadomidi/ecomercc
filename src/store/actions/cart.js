import {
  UPDATE_CART_DETAIL,
  REMOVE_CART_DETAIL,
  INCREASE_CART_DETAIL,
  DECREASE_CART_DETAIL,
  EMPTY_CART,
} from "../constants/cart";

export const updateCartDetailAction = (payload) => ({
  type: UPDATE_CART_DETAIL,
  payload,
});

export const removeCartDetailAction = (payload) => {
  return {
    type: REMOVE_CART_DETAIL,
    payload,
  };
};
export const increaseCartDetailAction = (productId) => {
  return {
    type: INCREASE_CART_DETAIL,
    payload: productId,
  };
};
export const decreaseCartDetailAction = (productId) => {
  return {
    type: DECREASE_CART_DETAIL,
    payload: productId,
  };
};
export const emptyCartAction = () => ({
  type: EMPTY_CART,
});
