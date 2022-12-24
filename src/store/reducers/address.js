import {
  REMOVE_ADDRESS_DETAIL,
  UPDATE_ADDRESS_DETAIL,
} from "../constants/address";

const initialState = null;

const address = (state = initialState, { type, payload }) => {
  switch (type) {
    case UPDATE_ADDRESS_DETAIL:
      return { ...payload };
    case REMOVE_ADDRESS_DETAIL:
      return initialState;
    default:
      return state;
  }
};

export default address;
