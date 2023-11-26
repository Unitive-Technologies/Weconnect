import {
  GET_USERHIERARCHY_SUCCESS,
  GET_USERHIERARCHY_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  userHierarchy: [],
  error: {},
  loading: true,
};

const UserHierarchy = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_USERHIERARCHY_SUCCESS:
      console.log("User Hierarchy data in reducer:", action.payload);
      return {
        ...state,
        userHierarchy: action.payload,
        loading: false,
      };

    case GET_USERHIERARCHY_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default UserHierarchy;
