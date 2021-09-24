import { GET_LAST_MESSAGE, GET_ALL_MESSAGE } from "../Actions/MessagesAction";

const initialState = {};

const lastMessage = (state = initialState, action) => {
  switch (action.type) {
    case GET_LAST_MESSAGE:
      return {
        ...state,
        data: action.payLoad,
      };
    case GET_ALL_MESSAGE:
      return {
        ...state,
        data: action.payLoad,
      };
    default:
      return state;
  }
};

export default lastMessage;
