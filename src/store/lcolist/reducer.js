import {
  RESPONSE_HEADER_CURRENT_PAGE,
  RESPONSE_HEADER_PAGE_COUNT,
  RESPONSE_HEADER_TOTAL_COUNT,
  RESPONSE_HEADER_PER_PAGE,
} from "../../constants/strings";
import {
  GET_LCO,
  GET_LCO_SUCCESS,
  GET_LCO_FAIL,
  ADD_LCO_SUCCESS,
  ADD_LCO_FAIL,
  UPDATE_LCO_SUCCESS,
  UPDATE_LCO_FAIL,
  UPDATE_LCO_CURRENT_PAGE,
} from "./actionTypes";

const INIT_STATE = {
  lco: [],
  error: {},
  loading: false,
  currentPage: 1,
  perPage: 10,
  totalCount: 0,
  totalPages: 0,
};

const Lco = (state = INIT_STATE, action) => {
  switch (action.type) {
    case UPDATE_LCO_CURRENT_PAGE:
      return Number(action.payload) <= state.totalPages
        ? {
            ...state,
            currentPage: action.payload,
          }
        : state;
    case GET_LCO:
      return {
        ...state,
        loading: true,
      };
    case GET_LCO_SUCCESS:
      console.log("lco data in reducer:", action.payload);
      return {
        ...state,
        lco: action.payload.data.data,
        currentPage: action.payload.headers[RESPONSE_HEADER_CURRENT_PAGE],
        perPage: action.payload.headers[RESPONSE_HEADER_PER_PAGE],
        totalCount: action.payload.headers[RESPONSE_HEADER_TOTAL_COUNT],
        totalPages: action.payload.headers[RESPONSE_HEADER_PAGE_COUNT],
        loading: false,
      };

    case GET_LCO_FAIL:
      return {
        ...state,
        error: action.payload,
        pagination: {},
        loading: false,
      };

    case ADD_LCO_SUCCESS:
      return {
        ...state,
        lco: [...state.lco, action.payload],
      };

    case ADD_LCO_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case UPDATE_LCO_SUCCESS:
      return {
        ...state,
        lco: state.lco.map((lcodata) =>
          lcodata.id.toString() === action.payload.id.toString()
            ? { lcodata, ...action.payload }
            : lcodata
        ),
      };

    case UPDATE_LCO_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default Lco;
