import {
  NEW_CHAT,
  NEW_USER,
  NEW_GROUP,
  PROFILE,
  NEW_GROUP_LIST,
  ADD_GROUP_USERS,
} from "Redux/Actions/sideBar";

let initialState = {
  uiState: false,
  newUserState: false,
  groupUi: false,
  profileUi: false,
  groupListUi: false,
};

const sideBarReducer = (state = initialState, action) => {
  switch (action.type) {
    case NEW_CHAT:
      return {
        uiState: !state.uiState,
        newUserState: false,
        groupUi: false,
        profileUi: false,
      };

      break;

    case NEW_USER:
      return {
        uiState: false,
        newUserState: !state.newUserState,
        groupUi: false,
        profileUi: false,
      };
      break;

    case NEW_GROUP:
      return {
        uiState: false,
        newUserState: false,
        groupUi: !state.groupUi,
        profileUi: false,
      };
      break;

    case PROFILE:
      return {
        uiState: false,
        newUserState: false,
        groupUi: false,
        profileUi: !state.profileUi,
      };
      break;

    case NEW_GROUP_LIST:
      return {
        uiState: false,
        newUserState: false,
        groupUi: false,
        profileUi: false,
        groupListUi: !state.groupListUi,
      };
      break;
    default:
      return state;
  }
};

export default sideBarReducer;
