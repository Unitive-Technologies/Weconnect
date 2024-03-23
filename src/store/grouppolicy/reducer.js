import {
  GET_GROUPPOLICY,
  GET_GROUPPOLICY_SUCCESS,
  GET_GROUPPOLICY_FAIL,
  ADD_GROUPPOLICY_SUCCESS,
  ADD_GROUPPOLICY_FAIL,
  GET_POLICY_TYPE_SUCCESS,
  GET_POLICY_TYPE_FAIL,
  GET_POLICY_ROLE_FAIL,
  GET_POLICY_ROLE_SUCCESS,
} from "./actionTypes";

const INIT_STATE = {
  groupPolicy: [],
  policyType: [],
  policyRole: [],
  error: {},
  loading: false,
};

const GroupPolicy = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_GROUPPOLICY:
      return {
        ...state,
        loading: true,
      };

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

    case ADD_GROUPPOLICY_SUCCESS:
      return {
        ...state,
        groupPolicy: [...state.groupPolicy, action.payload],
      };

    case ADD_GROUPPOLICY_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_POLICY_TYPE_SUCCESS:
      return {
        ...state,
        policyType: action.payload,
        loading: false,
      };

    case GET_POLICY_TYPE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_POLICY_ROLE_SUCCESS:
      return {
        ...state,
        policyRole: action.payload,
        loading: false,
      };

    case GET_POLICY_ROLE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default GroupPolicy;
