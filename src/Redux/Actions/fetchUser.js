export const FETCH_USER_CONTACT_LIST = "FETCH_USER_CONTACT_LIST";

export const fetchContactList = (userId) => {
  let id = userId._id;

  const url = `http://localhost:8000/api/v1/users/getUser/${id}`;
  return async (dispatch) => {
    const response = await fetch(url);
    const resData = await response.json();
    let data = resData;

    dispatch({ type: FETCH_USER_CONTACT_LIST, payLoad: data });
  };
};
