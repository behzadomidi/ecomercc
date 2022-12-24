import axios from "axios";

const token = localStorage.getItem("token")

export const getProductList = (
  succeedCallBack,
  errorCallBack,
  finallyCallBack
) => {
  axios
    .get("http://kzico.runflare.run/product")
    .then((succeed) => {
      succeedCallBack({
        ok: succeed.data.success,
        status: succeed.data.status,
        data: succeed.data,
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


export const getProductDetails = (
  productId,
  succeedCallBack,
  errorCallBack,
  finallyCallBack
) => {
  axios
    .get(`http://kzico.runflare.run/product/${productId}`)
    .then((succeed) => {
      succeedCallBack({
        ok: succeed.data.success,
        status: succeed.data.status,
        data: succeed.data,
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


export const orderSubmit = (
  body,
  succeedCallBack,
  errorCallBack,
  finallyCallBack
) => {
  axios
    .post(
      "http://kzico.runflare.run/order/submit",
      {
        orderItems: body.products,
        shippingAddress: {
          address: body.shippingAddress.address,
          city: body.shippingAddress.city,
          postalCode: body.shippingAddress.postalCode,
          phone: body.shippingAddress.phoneNumber,
        },
        paymentMethod: "cash",
        shippingPrice: 5,
        totalPrice: body.calculatedTotalPrice,
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
        data: succeed.data,
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


export const getOrderList = (succeedCallBack, errorCallBack, finallyCallBack) => {
  axios
    .get("http://kzico.runflare.run/order", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .then((succeed) => {
      succeedCallBack({
        ok: succeed.data.success,
        status: succeed.data.status,
        data: succeed.data,
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


export const getOrderDetails = (
  orderId,
  succeedCallBack,
  errorCallBack,
  finallyCallBack
) => {
  axios
    .get(`http://kzico.runflare.run/order/${orderId}`, {
      headers: {
        authorization: `Bearer ${token}`,
      },
    })
    .then((succeed) => {
      succeedCallBack({
        ok: succeed.data.success,
        status: succeed.data.status,
        data: succeed.data,
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
