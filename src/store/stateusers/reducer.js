import {
  GET_STATEUSERS_SUCCESS,
  GET_STATEUSERS_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  stateUsers: [],
  error: {},
  loading: true,
};

const StateUsers = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_STATEUSERS_SUCCESS:
      console.log("State Users data in reducer:", action.payload);
      return {
        ...state,
        stateUsers: action.payload,
        loading: false,
      };

    case GET_STATEUSERS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default StateUsers;
