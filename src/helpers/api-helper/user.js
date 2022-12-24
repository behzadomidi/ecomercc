import axios from "axios";

const token = localStorage.getItem("token")

export const getUserProfile = (
  succeedCallBack,
  errorCallBack,
  finallyCallBack
) => {
  axios
    .get("http://kzico.runflare.run/user/profile", {
      headers: {
        authorization: `Bearer ${token}`,
      },
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

export const changeUserProfile = (
  body,
  succeedCallBack,
  errorCallBack,
  finallyCallBack
) => {
  axios
    .put(
      "http://kzico.runflare.run/user/change-profile",
      {
        firstname: body.firstName,
        lastname: body.lastName,
        gender: body.gender,
        age: body.age,
        city: body.city,
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    )
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

export const ChangePasswordUser = (
  body,
  succeedCallBack,
  errorCallBack,
  finallyCallBack
) => {
  axios
    .put(
      "http://kzico.runflare.run/user/change-password",
      {
        old_password: body.oldPassword,
        new_password: body.newPassword,
      },
      {
        headers: {
          authorization: `Bearer ${token}`,
        },
      }
    )
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

export const ChangeAvatarUser = (
  formData,
  succeedCallBack,
  errorCallBack,
  finallyCallBack
) => {
  axios
    .post("http://kzico.runflare.run/user/profile-image",
     formData,
    {
      headers: {
        authorization: `Bearer ${token}`,
      },
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
