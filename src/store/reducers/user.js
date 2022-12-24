import { REMOVE_USER_DETAIL, UPDATE_USER_DETAIL } from "../constants/user";

const initialState = null;

const user = (state = initialState, { type, payload }) => {
  switch (type) {
    case UPDATE_USER_DETAIL:
      return payload;
    case REMOVE_USER_DETAIL:
      return initialState;
    default:
      return state;
  }
};

export default user;
