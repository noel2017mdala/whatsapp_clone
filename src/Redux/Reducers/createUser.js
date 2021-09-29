import { CREATE_USER } from "../Actions/createUser";

const initialState = {};

const createUser = (state = initialState, action) => {
  switch (action.type) {
    case CREATE_USER:
      return {
        ...state,
        data: action.payLoad,
      };
    default:
      return state;
  }
};

export default createUser;
