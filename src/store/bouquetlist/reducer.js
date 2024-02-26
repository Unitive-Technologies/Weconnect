import {
  RESPONSE_HEADER_CURRENT_PAGE,
  RESPONSE_HEADER_PAGE_COUNT,
  RESPONSE_HEADER_TOTAL_COUNT,
  RESPONSE_HEADER_PER_PAGE,
} from "../../constants/strings";
import {
  GET_BOUQUET,
  GET_BOUQUET_SUCCESS,
  GET_BOUQUET_FAIL,
  ADD_BOUQUET_SUCCESS,
  ADD_BOUQUET_FAIL,
  GET_BOUQUETTYPE_SUCCESS,
  GET_BOUQUETTYPE_FAIL,
  GET_BOUQUET_STATUS_SUCCESS,
  GET_BOUQUET_STATUS_FAIL,
  GET_BOUQUET_BOXTYPE_SUCCESS,
  GET_BOUQUET_BOXTYPE_FAIL,
  GET_BOUQUEX_SUCCESS,
  GET_BOUQUEX_FAIL,
  GET_BOUQUET_TAXLIST_SUCCESS,
  GET_BOUQUET_TAXLIST_FAIL,
  GET_RECHARGEPERIOD_SUCCESS,
  GET_RECHARGEPERIOD_FAIL,
  GET_ALACARTECHANNELS_SUCCESS,
  GET_ALACARTECHANNELS_FAIL,
  GET_BOUQUET_PACKAGES_SUCCESS,
  GET_BOUQUET_PACKAGES_FAIL,
  GET_OPERATOR_FORBOUQUET_SUCCESS,
  GET_OPERATOR_FORBOUQUET_FAIL,
  UPDATE_BOUQUET_CURRENT_PAGE,
} from "./actionTypes";

const INIT_STATE = {
  bouquet: [],
  bouquettype: [],
  bouquetstatus: [],
  bouquetboxtype: [],
  bouquex: [],
  bouquettaxlist: [],
  rechargeperiod: [],
  alacartechannels: [],
  bouquetpackages: [],
  operatorforbouquet: [],
  pagination: {},
  error: {},
  loading: false,
  currentPage: 1,
  perPage: 10,
  totalCount: 0,
  totalPages: 0,
};

const Bouquet = (state = INIT_STATE, action) => {
  switch (action.type) {
    case UPDATE_BOUQUET_CURRENT_PAGE:
      return Number(action.payload) <= state.totalPages
        ? {
            ...state,
            currentPage: action.payload,
          }
        : state;
    case GET_BOUQUET:
      return {
        ...state,
        loading: true,
      };

    case GET_BOUQUET_SUCCESS:
      return {
        ...state,
        bouquet: action.payload.data.data,
        currentPage: action.payload.headers[RESPONSE_HEADER_CURRENT_PAGE],
        perPage: action.payload.headers[RESPONSE_HEADER_PER_PAGE],
        totalCount: action.payload.headers[RESPONSE_HEADER_TOTAL_COUNT],
        totalPages: action.payload.headers[RESPONSE_HEADER_PAGE_COUNT],
        loading: false,
      };

    case GET_BOUQUET_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case ADD_BOUQUET_SUCCESS:
      return {
        ...state,
        bouquet: [...state.bouquet, action.payload],
      };

    case ADD_BOUQUET_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_BOUQUETTYPE_SUCCESS:
      return {
        ...state,
        bouquettype: action.payload,
        loading: false,
      };

    case GET_BOUQUETTYPE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_BOUQUET_STATUS_SUCCESS:
      return {
        ...state,
        bouquetstatus: action.payload,
        loading: false,
      };

    case GET_BOUQUET_STATUS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_BOUQUET_BOXTYPE_SUCCESS:
      return {
        ...state,
        bouquetboxtype: action.payload,
        loading: false,
      };

    case GET_BOUQUET_BOXTYPE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_BOUQUEX_SUCCESS:
      return {
        ...state,
        bouquex: action.payload,
        loading: false,
      };

    case GET_BOUQUEX_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_BOUQUET_TAXLIST_SUCCESS:
      return {
        ...state,
        bouquettaxlist: action.payload,
        loading: false,
      };

    case GET_BOUQUET_TAXLIST_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_RECHARGEPERIOD_SUCCESS:
      return {
        ...state,
        rechargeperiod: action.payload,
        loading: false,
      };

    case GET_RECHARGEPERIOD_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_ALACARTECHANNELS_SUCCESS:
      return {
        ...state,
        alacartechannels: action.payload,
        loading: false,
      };

    case GET_ALACARTECHANNELS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_BOUQUET_PACKAGES_SUCCESS:
      return {
        ...state,
        bouquetpackages: action.payload,
        loading: false,
      };

    case GET_BOUQUET_PACKAGES_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_OPERATOR_FORBOUQUET_SUCCESS:
      return {
        ...state,
        operatorforbouquet: action.payload,
        loading: false,
      };

    case GET_OPERATOR_FORBOUQUET_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default Bouquet;
