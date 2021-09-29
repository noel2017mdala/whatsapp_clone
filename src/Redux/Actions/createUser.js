export const CREATE_USER = "CREATE_USER";

export const createUser = (userData) => {
  let url = "http://localhost:8000/api/v1/users/createUser";
  const headers = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
  });
  const request = new Request(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(userData),
  });

  return async (dispatch) => {
    try {
      fetch(url, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      }).then((res) => {
        if (res.ok) {
          console.log("User Created");
        } else {
          console.log("Failed to create user");
        }
      });
    } catch (err) {
      console.log(err);
    }
  };
};

export const logIn = (userData) => {
  let url = "http://localhost:8000/api/v1/users/login";
  const headers = new Headers({
    Accept: "application/json",
    "Content-Type": "application/json",
  });
  const request = new Request(url, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(userData),
  });

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
          if (res.ok) {
            console.log("user logged in successfully");
          } else {
            console.log("Login failed");
          }
        })
        .catch((e) => {
          console.log(e);
        });
    } catch (err) {
      console.log(err);
    }
  };
};
