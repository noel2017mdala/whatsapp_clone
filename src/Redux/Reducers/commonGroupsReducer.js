import { GET_COMMON_GROUPS } from "Redux/Actions/groupAction";

let initialState = {};

const commonGroups = (state = initialState, action) => {
  switch (action.type) {
    case GET_COMMON_GROUPS:
      return {
        ...state,
        data: action.payLoad,
      };
    default:
      return state;
  }
};

export default commonGroups;
