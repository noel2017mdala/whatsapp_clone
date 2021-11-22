import axios from "axios";
import createCookies from "utils/createCookies";
export const CREATE_USER = "CREATE_USER";
export const LOGIN = "LOGIN";
export const FAILED_LOGIN = "FAILED_LOGIN";
let { REACT_APP_SERVER_URL } = process.env;

export const createUser = (userData) => {
  let url = `${REACT_APP_SERVER_URL}api/v1/users/createUser`;
  // const headers = new Headers({
  //   Accept: "application/json",
  //   "Content-Type": "application/json",
  // });
  // const request = new Request(url, {
  //   method: "POST",
  //   headers: headers,
  //   body: JSON.stringify(userData),
  // });

  // return async (dispatch) => {
  //   try {
  //     fetch(url, {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(userData),
  //     }).then((res) => {
  //       if (res.ok) {
  //         console.log("User Created");
  //       } else {
  //         console.log("Failed to create user");
  //       }
  //     });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  let createUserRequest = axios
    .post(url, userData)
    .then((res) => {
      return {
        response: res.data,
        status: true,
        message: "User created Successfully",
      };
    })
    .catch((err) => {
      if (err.response) {
        return {
          status: false,
          message:
            "Failed to create user please ensure that you have entered the correct information",
        };
      } else if (err.request) {
        return {
          status: false,
          message:
            "Failed to create User please check your internet connection",
        };
      } else {
        return {
          status: false,
          message:
            "Failed to create User please check your internet connection",
        };
      }
    });

  return createUserRequest;
};

export const logIn = (userData, cb) => {
  let url = `${REACT_APP_SERVER_URL}api/v1/users/login`;
  // const headers = new Headers({
  //   Accept: "application/json",
  //   "Content-Type": "application/json",
  // });
  // const request = new Request(url, {
  //   method: "POST",
  //   headers: headers,
  //   body: JSON.stringify(userData),
  // });

  return async (dispatch) => {
    try {
      fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(userData),
      })
        .then((res) => {
          // if (res.ok) {
          //   console.log(res);
          //   return;
          //   cb(true);
          //   dispatch({ type: "LOGIN" });
          // } else {
          //   cb(false);
          //   dispatch({ type: "FAILED_LOGIN" });
          // }
          return res.json();
        })
        .then((data) => {
          // console.log(data);
          // return;
          if (data.status) {
            let addCookies = createCookies(data);

            if (addCookies) {
              cb(true);
              dispatch({ type: "LOGIN" });
            } else {
              cb(false);
              dispatch({ type: "FAILED_LOGIN" });
            }
          } else {
            cb(false);
            dispatch({ type: "FAILED_LOGIN" });
          }
        })
        .catch((e) => {
          // console.log(e);
        });
    } catch (err) {
      console.log(err);
    }
  };
};
