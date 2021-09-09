export const GET_LAST_MESSAGE = "GET_LAST_MESSAGE";

export const getLastMessage = () => {
  const url = `http://localhost:8000/api/v1/chat/getFilteredMessages/61371b37e46bae4721e34ca5/61371b75e46bae4721e34ca9`;
  return async (dispatch) => {
    const response = await fetch(url);
    const resData = await response.json();
    let data = resData;

    dispatch({ type: GET_LAST_MESSAGE, payLoad: data });
  };
};
