import axios from "axios";
export const GET_GROUP_INFO = "GET_GROUP_INFO";
export const GET_GROUP_MESSAGES = "GET_GROUP_MESSAGES";
export const getGroupData = (id) => {
  if (id) {
    let url = `http://localhost:8000/api/v1/group/getGroup/${id}`;

    // return async (dispatch) => {
    //   const response = await fetch(url);
    //   const resData = await response.json();
    //   let data = resData;

    //   dispatch({ type: GET_GROUP_INFO, payLoad: data });
    // };

    return async (dispatch) => {
      axios
        .get(url)
        .then((res) => {
          if (res.data) {
            dispatch({ type: GET_GROUP_INFO, payLoad: res.data });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
  }
};

export const getGroupMessages = (id) => {
  if (id) {
    let url = `http://localhost:8000/api/v1/group/chat/getMessages/${id}`;

    return async (dispatch) => {
      axios
        .get(url)
        .then((res) => {
          if (res.data) {
            console.log(res.data);
            dispatch({ type: GET_GROUP_MESSAGES, payLoad: res.data });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    };
  }
};
