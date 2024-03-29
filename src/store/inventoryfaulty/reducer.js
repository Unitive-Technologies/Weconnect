import {
  RESPONSE_HEADER_CURRENT_PAGE,
  RESPONSE_HEADER_PAGE_COUNT,
  RESPONSE_HEADER_TOTAL_COUNT,
  RESPONSE_HEADER_PER_PAGE,
} from "../../constants/strings";
import {
  GET_INVENTORYFAULTY_SMARTCARD_SUCCESS,
  GET_INVENTORYFAULTY_SMARTCARD_FAIL,
  GET_INVENTORYFAULTY_STB_SUCCESS,
  GET_INVENTORYFAULTY_STB_FAIL,
  GET_INVENTORYFAULTY_PAIRING,
  GET_INVENTORYFAULTY_PAIRING_SUCCESS,
  GET_INVENTORYFAULTY_PAIRING_FAIL,
  UPDATE_FAULTYPAIRING_CURRENT_PAGE,
  UPDATE_FAULTYSMARTCARD_SENDSC,
  UPDATE_FAULTYSMARTCARD_SENDSC_SUCCESS,
  UPDATE_FAULTYSMARTCARD_SENDSC_FAIL,
  UPDATE_FAULTYSMARTCARD_BLACKLIST,
  UPDATE_FAULTYSMARTCARD_BLACKLIST_SUCCESS,
  UPDATE_FAULTYSMARTCARD_BLACKLIST_FAIL,
  UPDATE_FAULTYSTB_SENDSTB,
  UPDATE_FAULTYSTB_SENDSTB_SUCCESS,
  UPDATE_FAULTYSTB_SENDSTB_FAIL,
  UPDATE_FAULTYSTB_BLACKLIST,
  UPDATE_FAULTYSTB_BLACKLIST_SUCCESS,
  UPDATE_FAULTYSTB_BLACKLIST_FAIL,
  UPDATE_FAULTYPAIRING_SENDPAIR,
  UPDATE_FAULTYPAIRING_SENDPAIR_SUCCESS,
  UPDATE_FAULTYPAIRING_SENDPAIR_FAIL,
  UPDATE_FAULTYPAIRING_BLACKLIST,
  UPDATE_FAULTYPAIRING_BLACKLIST_SUCCESS,
  UPDATE_FAULTYPAIRING_BLACKLIST_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  faultysmartcard: [],
  faultystb: [],
  faultypairing: [],
  pagination: {},
  error: {},
  loading: false,
  currentPage: 1,
  perPage: 10,
  totalCount: 0,
  totalPages: 0,
};

const InventoryFaulty = (state = INIT_STATE, action) => {
  switch (action.type) {
    case UPDATE_FAULTYPAIRING_CURRENT_PAGE:
      return Number(action.payload) <= state.totalPages
        ? {
            ...state,
            currentPage: action.payload,
          }
        : state;

    case GET_INVENTORYFAULTY_PAIRING:
      return {
        ...state,
        loading: true,
      };

    case GET_INVENTORYFAULTY_SMARTCARD_SUCCESS:
      return {
        ...state,
        faultysmartcard: action.payload,
        loading: false,
      };

    case GET_INVENTORYFAULTY_SMARTCARD_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_INVENTORYFAULTY_STB_SUCCESS:
      return {
        ...state,
        faultystb: action.payload,
        loading: false,
      };

    case GET_INVENTORYFAULTY_STB_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_INVENTORYFAULTY_PAIRING_SUCCESS:
      return {
        ...state,
        faultypairing: action.payload.data.data,
        currentPage: action.payload.headers[RESPONSE_HEADER_CURRENT_PAGE],
        perPage: parseInt(action.payload.headers[RESPONSE_HEADER_PER_PAGE]),
        totalCount: action.payload.headers[RESPONSE_HEADER_TOTAL_COUNT],
        totalPages: action.payload.headers[RESPONSE_HEADER_PAGE_COUNT],
        loading: false,
      };

    case GET_INVENTORYFAULTY_PAIRING_FAIL:
      return {
        ...state,
        error: action.payload,
        pagination: {},
        loading: false,
      };

    case UPDATE_FAULTYSMARTCARD_SENDSC:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_FAULTYSMARTCARD_SENDSC_SUCCESS:
      return {
        ...state,
        loading: false,
        faultysmartcard: state.faultysmartcard.map((smartcard) =>
          smartcard.id === action.payload.id
            ? { ...smartcard, ...action.payload }
            : smartcard
        ),
      };

    case UPDATE_FAULTYSMARTCARD_SENDSC_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case UPDATE_FAULTYSMARTCARD_BLACKLIST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_FAULTYSMARTCARD_BLACKLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        faultysmartcard: state.faultysmartcard.map((smartcard) =>
          smartcard.id === action.payload.id
            ? { ...smartcard, ...action.payload }
            : smartcard
        ),
      };

    case UPDATE_FAULTYSMARTCARD_BLACKLIST_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case UPDATE_FAULTYSTB_SENDSTB:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_FAULTYSTB_SENDSTB_SUCCESS:
      return {
        ...state,
        loading: false,
        faultystb: state.faultystb.map((stb) =>
          stb.id === action.payload.id ? { ...stb, ...action.payload } : stb
        ),
      };

    case UPDATE_FAULTYSTB_SENDSTB_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case UPDATE_FAULTYSTB_BLACKLIST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_FAULTYSTB_BLACKLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        faultystb: state.faultystb.map((stb) =>
          stb.id === action.payload.id ? { ...stb, ...action.payload } : stb
        ),
      };

    case UPDATE_FAULTYSTB_BLACKLIST_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case UPDATE_FAULTYPAIRING_SENDPAIR:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_FAULTYPAIRING_SENDPAIR_SUCCESS:
      return {
        ...state,
        loading: false,
        faultypairing: state.faultypairing.map((pairing) =>
          pairing.id === action.payload.id
            ? { ...pairing, ...action.payload }
            : pairing
        ),
      };

    case UPDATE_FAULTYPAIRING_SENDPAIR_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case UPDATE_FAULTYPAIRING_BLACKLIST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_FAULTYPAIRING_BLACKLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        faultypairing: state.faultypairing.map((pairing) =>
          pairing.id === action.payload.id
            ? { ...pairing, ...action.payload }
            : pairing
        ),
      };

    case UPDATE_FAULTYPAIRING_BLACKLIST_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default InventoryFaulty;
