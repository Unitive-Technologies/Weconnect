import {
  RESPONSE_HEADER_CURRENT_PAGE,
  RESPONSE_HEADER_PAGE_COUNT,
  RESPONSE_HEADER_TOTAL_COUNT,
  RESPONSE_HEADER_PER_PAGE,
} from "../../constants/strings";
import {
  GET_DISTRIBUTORS,
  GET_DISTRIBUTORS_SUCCESS,
  GET_DISTRIBUTORS_FAIL,
  ADD_DISTRIBUTORS_SUCCESS,
  ADD_DISTRIBUTORS_FAIL,
  UPDATE_DISTRIBUTORS_SUCCESS,
  UPDATE_DISTRIBUTORS_FAIL,
  UPDATE_DISTRIBUTOR_CURRENT_PAGE,
} from "./actionTypes";

const INIT_STATE = {
  distributors: [],
  pagination: {},
  error: {},
  loading: false,
  currentPage: 1,
  perPage: 10,
  totalCount: 0,
  totalPages: 0,
};

const Distributors = (state = INIT_STATE, action) => {
  switch (action.type) {
    case UPDATE_DISTRIBUTOR_CURRENT_PAGE:
      return Number(action.payload) <= state.totalPages
        ? {
            ...state,
            currentPage: action.payload,
          }
        : state;
    case GET_DISTRIBUTORS:
      return {
        ...state,
        loading: true,
      };
    case GET_DISTRIBUTORS_SUCCESS:
      console.log("Distributor data in reducer:", action.payload);
      return {
        ...state,
        distributors: action.payload.data.data,
        currentPage: action.payload.headers[RESPONSE_HEADER_CURRENT_PAGE],
        perPage: action.payload.headers[RESPONSE_HEADER_PER_PAGE],
        totalCount: action.payload.headers[RESPONSE_HEADER_TOTAL_COUNT],
        totalPages: action.payload.headers[RESPONSE_HEADER_PAGE_COUNT],
        loading: false,
      };

    case GET_DISTRIBUTORS_FAIL:
      return {
        ...state,
        error: action.payload,
        pagination: {},
        loading: false,
      };

    case ADD_DISTRIBUTORS_SUCCESS:
      return {
        ...state,
        distributors: [...state.distributors, action.payload],
      };

    case ADD_DISTRIBUTORS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case UPDATE_DISTRIBUTORS_SUCCESS:
      return {
        ...state,
        distributors: state.distributors.map((distributor) =>
          distributor.id.toString() === action.payload.id.toString()
            ? { distributor, ...action.payload }
            : distributor
        ),
      };

    case UPDATE_DISTRIBUTORS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default Distributors;
