import {
  GET_REASON_SUCCESS, GET_REASON_FAIL, ADD_REASON_SUCCESS,
  ADD_REASON_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  reason: [],
  error: {},
  loading: true,
};

const Reason = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_REASON_SUCCESS:
      console.log("Reason list data in reducer:", action.payload);
      return {
        ...state,
        reason: action.payload,
        loading: false,
      };

    case GET_REASON_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case ADD_REASON_SUCCESS:
      return {
        ...state,
        reason: [
          ...state.reason,
          action.payload,
        ],
      };

    case ADD_REASON_FAIL:
      return {
        ...state,
        error: action.payload,
      };


    default:
      return state;
  }
};

export default Reason;
