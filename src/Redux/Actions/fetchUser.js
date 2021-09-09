export const FETCH_USER_CONTACT_LIST = "FETCH_USER_CONTACT_LIST";

export const fetchContactList = () => {
  const url = `http://localhost:8000/api/v1/users/getUser/61371b37e46bae4721e34ca5`;
  return async (dispatch) => {
    const response = await fetch(url);
    const resData = await response.json();
    let data = resData;

    dispatch({ type: FETCH_USER_CONTACT_LIST, payLoad: data });
  };
};
