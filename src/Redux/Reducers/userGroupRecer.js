import { USER_GROUPS } from "Redux/Actions/groupAction";

let initialState = [];

const userGroups = (state = initialState, action) => {
  switch (action.type) {
    case USER_GROUPS:
      return {
        ...state,
        data: action.payLoad,
      };
    default:
      return state;
  }
};

export default userGroups;
