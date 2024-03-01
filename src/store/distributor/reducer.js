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
  GET_DISTRIBUTORS_PHASE_FAIL,
  GET_DISTRIBUTORS_PHASE_SUCCESS,
  GET_DISTRIBUTORS_STATUS_SUCCESS,
  GET_DISTRIBUTORS_STATUS_FAIL,
  GET_DISTRIBUTORS_SETTINGS_SUCCESS,
  GET_DISTRIBUTORS_SETTINGS_FAIL,
  GET_DISTRIBUTORS_OPERATOR_SUCCESS,
  GET_DISTRIBUTORS_OPERATOR_FAIL,
  ADD_NEW_DISTRIBUTOR,
  ADD_DISTRIBUTORS_SUCCESS,
  ADD_DISTRIBUTORS_FAIL,
  UPDATE_DISTRIBUTOR,
  UPDATE_DISTRIBUTORS_SUCCESS,
  UPDATE_DISTRIBUTORS_FAIL,
  UPDATE_DISTRIBUTOR_CURRENT_PAGE,
} from "./actionTypes";

const INIT_STATE = {
  distributors: [],
  distributorsPhase: [],
  distributorsStatus: [],
  distributorsSettings: [],
  distributorsOperator: [],
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
      // console.log("Distributor data in reducer:", action.payload);
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

    case GET_DISTRIBUTORS_PHASE_SUCCESS:
      // console.log("DistributorPhase data in reducer:", action.payload);
      return {
        ...state,
        distributorsPhase: action.payload,
        loading: false,
      };

    case GET_DISTRIBUTORS_PHASE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_DISTRIBUTORS_STATUS_SUCCESS:
      // console.log("DistributorsStatus data in reducer:", action.payload);
      return {
        ...state,
        distributorsStatus: action.payload,
        loading: false,
      };

    case GET_DISTRIBUTORS_STATUS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_DISTRIBUTORS_SETTINGS_SUCCESS:
      // console.log("DistributorSettings data in reducer:", action.payload);
      return {
        ...state,
        distributorsSettings: action.payload,
        loading: false,
      };

    case GET_DISTRIBUTORS_SETTINGS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_DISTRIBUTORS_OPERATOR_SUCCESS:
      // console.log("DistributorOperatpr data in reducer:", action.payload);
      return {
        ...state,
        distributorsOperator: action.payload,
        loading: false,
      };

    case GET_DISTRIBUTORS_OPERATOR_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case ADD_NEW_DISTRIBUTOR:
      return {
        ...state,
        loading: true,
      };

    case ADD_DISTRIBUTORS_SUCCESS:
      return {
        ...state,
        distributors: [...state.distributors, action.payload],
        loading: false,
      };

    case ADD_DISTRIBUTORS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case UPDATE_DISTRIBUTOR:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_DISTRIBUTORS_SUCCESS:
      return {
        ...state,
        loading: false,
        distributors: state.distributors.map((distributor) =>
          distributor.id === action.payload.id
            ? { distributor, ...action.payload }
            : distributor
        ),
      };

    case UPDATE_DISTRIBUTORS_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default Distributors;
