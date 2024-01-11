import {
  GET_NCF_SUCCESS,
  GET_NCF_FAIL,
  ADD_NCF_SUCCESS,
  ADD_NCF_FAIL,
  GET_OPERATOR_FORBULKASSIGN_SUCCESS,
  GET_OPERATOR_FORBULKASSIGN_FAIL,
  ADD_BULKASSIGN_NCF_SUCCESS,
  ADD_BULKASSIGN_NCF_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  ncf: [],
  bulkassign: [],
  operatorforassign: [],
  error: {},
  loading: true,
};

const Ncf = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_NCF_SUCCESS:
      return {
        ...state,
        ncf: action.payload,
        loading: false,
      };

    case GET_NCF_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case ADD_NCF_SUCCESS:
      return {
        ...state,
        ncf: [...state.ncf, action.payload],
      };

    case ADD_NCF_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_OPERATOR_FORBULKASSIGN_SUCCESS:
      return {
        ...state,
        operatorforassign: action.payload,
        loading: false,
      };

    case GET_OPERATOR_FORBULKASSIGN_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case ADD_BULKASSIGN_NCF_SUCCESS:
      return {
        ...state,
        bulkassign: [...state.bulkassign, action.payload],
      };

    case ADD_BULKASSIGN_NCF_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default Ncf;
