import {
  GET_REASON_SUCCESS,
  GET_REASON_FAIL,
  GET_REASON_STATUS_SUCCESS,
  GET_REASON_STATUS_FAIL,
  GET_REASON_REASONTYPE_SUCCESS,
  GET_REASON_REASONTYPE_FAIL,
  ADD_REASON_SUCCESS,
  ADD_REASON_FAIL,
  UPDATE_REASON_SUCCESS,
  UPDATE_REASON_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  reason: [],
  reasonStatus: [],
  reasonReasonType: [],
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

    case UPDATE_REASON_SUCCESS:
      return {
        ...state,
        reason: state.reason.map((reason) =>
          reason.id.toString() === action.payload.id.toString()
            ? { reason, ...action.payload }
            : reason
        ),
      };

    case UPDATE_REASON_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_REASON_STATUS_SUCCESS:
      console.log("Reason data in reducer:", action.payload);
      return {
        ...state,
        reasonStatus: action.payload,
        loading: false,
      };

    case GET_REASON_STATUS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_REASON_REASONTYPE_SUCCESS:
      console.log("ReasonType data in reducer:", action.payload);
      return {
        ...state,
        reasonReasonType: action.payload,
        loading: false,
      };

    case GET_REASON_REASONTYPE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case ADD_REASON_SUCCESS:
      return {
        ...state,
        reason: [...state.reason, action.payload],
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
