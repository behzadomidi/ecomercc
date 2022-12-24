import axios from "axios";
import { updateUserDetailAction } from "../../store/actions/user";

export const hasUserAuthenticated = localStorage.getItem("token") ? true : false;

export const loginUser = (
  payload,
  dispatch,
  succeedCallBack,
  errorCallBack,
  finallyCallBack
) => {
  axios
    .post("http://kzico.runflare.run/user/login", payload)
    .then((succeed) => {
      console.log(succeed);
      succeedCallBack({
        ok: succeed.data.success,
        status: succeed.data.status,
        data: succeed.data.user,
      });
      dispatch(updateUserDetailAction(succeed.data.user));
    })
    .catch((error) => {
      errorCallBack({
        ok: error.response.data.success,
        status: error.response.status,
        data: error.response.data.message,
      });
    })
    .finally(() => {
      finallyCallBack();
    });
};


export const registerUser = (
  body,
  succeedCallBack,
  errorCallBack,
  finallyCallBack
) => {
  axios
    .post("http://kzico.runflare.run/user/signup", {
      username: body.userName,
      email: body.email,
      password: body.password,
      mobile: body.mobile,
    })
    .then((succeed) => {
      succeedCallBack({
        ok: succeed.data.success,
        status: succeed.data.status,
        data: succeed.data.user,
      });
    })
    .catch((error) => {
      errorCallBack({
        ok: error.response.data.success,
        status: error.response.status,
        data: error.response.data.message,
      });
    })
    .finally(() => {
      finallyCallBack();
    });
};
