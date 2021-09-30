export const GET_LAST_MESSAGE = "GET_LAST_MESSAGE";
export const GET_ALL_MESSAGE = "GET_ALL_MESSAGE";

export const getLastMessage = (myId, id) => {
  let userId = myId._id;
  if (id) {
    const url = `http://localhost:8000/api/v1/chat/getFilteredMessages/${userId}/${id}`;
    return async (dispatch) => {
      const response = await fetch(url);
      const resData = await response.json();
      let data = resData;

      dispatch({ type: GET_LAST_MESSAGE, payLoad: data });
    };
  }
};

export const getAllMessages = (myId, id) => {
  let userId = myId._id;
  if (id) {
    const url = `http://localhost:8000/api/v1/chat/getAllMessages/${userId}/${id}`;
    return async (dispatch) => {
      const response = await fetch(url);
      const resData = await response.json();
      let data = resData;

      dispatch({ type: GET_ALL_MESSAGE, payLoad: data });
    };
  }
};
