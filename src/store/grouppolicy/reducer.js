import { GET_GROUPPOLICY_SUCCESS, GET_GROUPPOLICY_FAIL } from "./actionTypes";

const INIT_STATE = {
  groupPolicy: [],
  error: {},
  loading: true,
};

const GroupPolicy = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_GROUPPOLICY_SUCCESS:
      console.log("Group Policy data in reducer:", action.payload);
      return {
        ...state,
        groupPolicy: action.payload,
        loading: false,
      };

    case GET_GROUPPOLICY_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default GroupPolicy;
