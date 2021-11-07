import { GET_GROUP_INFO } from "../Actions/groupAction";

let initialState = {};

const groupData = (state = initialState, action) => {
  switch (action.type) {
    case GET_GROUP_INFO:
      return {
        ...state,
        data: action.payLoad,
      };
    default:
      return state;
  }
};

export default groupData;
