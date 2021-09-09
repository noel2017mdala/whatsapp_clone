import { GET_LAST_MESSAGE } from "../Actions/MessagesAction";

const initialState = {};

const state = (state = initialState, action) => {
  switch (action.type) {
    case GET_LAST_MESSAGE:
      return {
        ...state,
        data: action.payLoad,
      };
    default:
      return state;
  }
};

export default state;
