import {
  REMOVE_ADDRESS_DETAIL,
  UPDATE_ADDRESS_DETAIL,
} from "../constants/address";

export const updateAddressDetailAction = (payload) => ({
  type: UPDATE_ADDRESS_DETAIL,
  payload,
});

export const removeAddressDetailAction = () => ({
  type: REMOVE_ADDRESS_DETAIL,
});
