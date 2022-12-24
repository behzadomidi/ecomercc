import { UPDATE_USER_DETAIL, REMOVE_USER_DETAIL } from "../constants/user";

export const updateUserDetailAction = (payload) => ({
  type: UPDATE_USER_DETAIL,
  payload,
});

export const removeUserDetailAction = (payload) => ({
  type: REMOVE_USER_DETAIL,
  
});
