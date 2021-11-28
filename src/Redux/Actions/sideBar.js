export const NEW_CHAT = "NEW_CHAT";
export const NEW_GROUP = "NEW_GROUP";
export const NEW_USER = "NEW_USER";
export const PROFILE = "PROFILE";
export const ADD_GROUP_USERS = "ADD_GROUP_USERS";
export const NEW_GROUP_LIST = "NEW_GROUP_LIST";

export const getNewChart = () => {
  return (dispatch) => {
    dispatch({
      type: NEW_CHAT,
    });
  };
};

export const createNewUserState = () => {
  return (dispatch) => {
    dispatch({
      type: NEW_USER,
    });
  };
};

export const createGroupState = () => {
  return (dispatch) => {
    dispatch({
      type: NEW_GROUP,
    });
  };
};

export const getUserProfile = () => {
  return (dispatch) => {
    dispatch({
      type: PROFILE,
    });
  };
};

export const newGroupList = () => {
  return (dispatch) => {
    dispatch({
      type: NEW_GROUP_LIST,
    });
  };
};
