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
  GET_LCO_BILLEDBY,
  GET_LCO_BILLEDBY_SUCCESS,
  GET_LCO_BILLEDBY_FAIL,
  GET_LCO_STATUS,
  GET_LCO_STATUS_SUCCESS,
  GET_LCO_STATUS_FAIL,
  GET_LCO_PHASE,
  GET_LCO_PHASE_SUCCESS,
  GET_LCO_PHASE_FAIL,
  GET_LCO_STATES,
  GET_LCO_STATES_SUCCESS,
  GET_LCO_STATES_FAIL,
  GET_LCO_CUSTOMERPORTAL,
  GET_LCO_CUSTOMERPORTAL_SUCCESS,
  GET_LCO_CUSTOMERPORTAL_FAIL,
  GET_LCO_PARENTDISTRIBUTOR,
  GET_LCO_PARENTDISTRIBUTOR_SUCCESS,
  GET_LCO_PARENTDISTRIBUTOR_FAIL,
  GET_SINGLE_LCO_SUCCESS,
  GET_SINGLE_LCO_FAIL,
  ADD_NEW_LCO,
  ADD_LCO_SUCCESS,
  ADD_LCO_FAIL,
  UPDATE_LCO_SUCCESS,
  UPDATE_LCO_FAIL,
  UPDATE_LCO_CURRENT_PAGE,
} from "./actionTypes";

const INIT_STATE = {
  lco: [],
  lcoBilledby: [],
  lcoStatus: [],
  lcoPhase: [],
  lcoStates: [],
  lcoCustomerPortal: [],
  lcoParentDistributor: [],
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

    case GET_LCO_BILLEDBY_SUCCESS:
      return {
        ...state,
        lcoBilledby: action.payload,
        loading: false,
      };

    case GET_LCO_BILLEDBY_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_LCO_STATUS_SUCCESS:
      return {
        ...state,
        lcoStatus: action.payload,
        loading: false,
      };

    case GET_LCO_STATUS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_LCO_PHASE_SUCCESS:
      return {
        ...state,
        lcoPhase: action.payload,
        loading: false,
      };

    case GET_LCO_PHASE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_LCO_STATES_SUCCESS:
      return {
        ...state,
        lcoStates: action.payload,
        loading: false,
      };

    case GET_LCO_STATES_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_LCO_CUSTOMERPORTAL_SUCCESS:
      return {
        ...state,
        lcoCustomerPortal: action.payload,
        loading: false,
      };

    case GET_LCO_CUSTOMERPORTAL_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_LCO_PARENTDISTRIBUTOR_SUCCESS:
      return {
        ...state,
        lcoParentDistributor: action.payload,
        loading: false,
      };

    case GET_LCO_PARENTDISTRIBUTOR_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case ADD_NEW_LCO:
      return {
        ...state,
        loading: true,
      };

    case ADD_LCO_SUCCESS:
      return {
        ...state,
        lco: [...state.lco, action.payload],
        loading: false,
      };

    case ADD_LCO_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case UPDATE_LCO_SUCCESS:
      return {
        ...state,
        loading: false,
        lco: state.lco.map((lcodata) =>
          lcodata.id === action.payload.id
            ? { lcodata, ...action.payload }
            : lcodata
        ),
      };

    case UPDATE_LCO_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case GET_SINGLE_LCO_SUCCESS:
      const updatedLco = state.lco.map((lcodata) => {
        if (lcodata.id === action.payload.id) {
          // If the id matches, update the data
          return action.payload;
        }
        // Otherwise, return the original data
        return lcodata;
      });
      console.log("updatedLco in reducer:" + JSON.stringify(updatedLco));
      return {
        ...state,
        lco: updatedLco,
        loading: false,
      };

    case GET_SINGLE_LCO_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default Lco;
