import { FETCH_USER_CONTACT_LIST } from "../Actions/fetchUser";

const initialState = {};

const state = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_USER_CONTACT_LIST:
      return {
        ...state,
        data: action.payLoad,
      };
    default:
      return state;
  }
};

export default state;
