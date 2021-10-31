import axios from "axios";
export const fileUpload = (body) => {
  let url = `https://httpbin.org/anything`;
  axios
    .post(url, {
      body,
    })
    .then((res) => {
      console.log(res.data);
    })
    .catch((err) => {
      console.log(err.error);
    });
};
