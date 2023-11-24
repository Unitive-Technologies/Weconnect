import {
  GET_CUSTOMERUSERS_SUCCESS,
  GET_CUSTOMERUSERS_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  customerUsers: [],
  error: {},
  loading: true,
};

const CustomerUsers = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_CUSTOMERUSERS_SUCCESS:
      console.log("Users data in reducer:", action.payload);
      return {
        ...state,
        customerUsers: action.payload,
        loading: false,
      };

    case GET_CUSTOMERUSERS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default CustomerUsers;
