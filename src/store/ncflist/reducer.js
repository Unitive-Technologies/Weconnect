import {
  GET_NCF,
  GET_NCF_SUCCESS,
  GET_NCF_FAIL,
  ADD_NCF,
  ADD_NCF_SUCCESS,
  ADD_NCF_FAIL,
  GET_OPERATOR_FORBULKASSIGN_SUCCESS,
  GET_OPERATOR_FORBULKASSIGN_FAIL,
  ADD_BULKASSIGN_NCF_SUCCESS,
  ADD_BULKASSIGN_NCF_FAIL,
  UPDATE_NCF,
  UPDATE_NCF_FAIL,
  UPDATE_NCF_SUCCESS,
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
    case GET_NCF:
      return {
        ...state,
        loading: true,
      };

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

    case ADD_NCF:
      return {
        ...state,
        loading: true,
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

    case UPDATE_NCF:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_NCF_SUCCESS:
      return {
        ...state,
        loading: false,
        ncf: state.ncf.map((singleNcf) =>
          singleNcf.id === action.payload.id
            ? { ...singleNcf, ...action.payload }
            : singleNcf
        ),
      };

    case UPDATE_NCF_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default Ncf;
