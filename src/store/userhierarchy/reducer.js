import {
  RESPONSE_HEADER_CURRENT_PAGE,
  RESPONSE_HEADER_PAGE_COUNT,
  RESPONSE_HEADER_TOTAL_COUNT,
  RESPONSE_HEADER_PER_PAGE,
} from "../../constants/strings";
import {
  GET_USERHIERARCHY,
  GET_USERHIERARCHY_SUCCESS,
  GET_USERHIERARCHY_FAIL,
  ADD_USERHIERARCHY,
  ADD_USERHIERARCHY_SUCCESS,
  ADD_USERHIERARCHY_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  userHierarchy: [],
  error: {},
  loading: false,
};

const UserHierarchy = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_USERHIERARCHY:
      return {
        ...state,
        loading: true,
      };
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
        loading: false,
      };
    case ADD_USERHIERARCHY:
      return {
        ...state,
        loading: true,
      };
    case ADD_USERHIERARCHY_SUCCESS:
      return {
        ...state,
        userHierarchy: [...state.userHierarchy, action.payload],
        loading: false,
      };

    case ADD_USERHIERARCHY_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default UserHierarchy;
