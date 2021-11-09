import { GET_GROUP_MESSAGES } from "Redux/Actions/groupAction";

const initialState = {};

const groupMessages = (state = initialState, action) => {
  switch (action.type) {
    case GET_GROUP_MESSAGES:
      return {
        ...state,
        data: action.payLoad,
      };
    default:
      return state;
  }
};

export default groupMessages;
