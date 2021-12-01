import { USER_STATE } from "../Actions/createUser";

const initialState = {};

const userState = (state = initialState, action) => {
  switch (action.type) {
    case USER_STATE:
      return {
        ...state,
        data: action.payLoad,
      };
    default:
      return state;
  }
};

export default userState;
