import {
  RESPONSE_HEADER_CURRENT_PAGE,
  RESPONSE_HEADER_PAGE_COUNT,
  RESPONSE_HEADER_TOTAL_COUNT,
  RESPONSE_HEADER_PER_PAGE,
} from "../../constants/strings";
import {
  GET_INVENTORYALLOTTED_SMARTCARD_SUCCESS,
  GET_INVENTORYALLOTTED_SMARTCARD_FAIL,
  GET_INVENTORYALLOTTED_STB_SUCCESS,
  GET_INVENTORYALLOTTED_STB_FAIL,
  GET_INVENTORYALLOTTED_PAIRING,
  GET_INVENTORYALLOTTED_PAIRING_SUCCESS,
  GET_INVENTORYALLOTTED_PAIRING_FAIL,
  UPDATE_ALLOTTEDPAIRING_CURRENT_PAGE,
  GET_INVENTORYALLOTTED_SMARTCARDLIST_SUCCESS,
  GET_INVENTORYALLOTTED_SMARTCARDLIST_FAIL,
  GET_INVENTORYALLOTTED_USERTYPE_SUCCESS,
  GET_INVENTORYALLOTTED_USERTYPE_FAIL,
  GET_INVENTORYALLOTTED_OPERATORLIST_SUCCESS,
  GET_INVENTORYALLOTTED_OPERATORLIST_FAIL,
  ALLOT_SMARTCARD,
  ALLOT_SMARTCARD_SUCCESS,
  ALLOT_SMARTCARD_FAIL,
  DEALLOT_SMARTCARD,
  DEALLOT_SMARTCARD_SUCCESS,
  DEALLOT_SMARTCARD_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  allottedsmartcard: [],
  allottedstb: [],
  allottedpairing: [],
  allottedsmartcardlist: [],
  allottedusertype: [],
  allottedoperatorlist: [],
  pagination: {},
  error: {},
  loading: false,
  currentPage: 1,
  perPage: 10,
  totalCount: 0,
  totalPages: 0,
};

const InventoryAllotted = (state = INIT_STATE, action) => {
  switch (action.type) {
    case UPDATE_ALLOTTEDPAIRING_CURRENT_PAGE:
      return Number(action.payload) <= state.totalPages
        ? {
            ...state,
            currentPage: action.payload,
          }
        : state;

    case GET_INVENTORYALLOTTED_PAIRING:
      return {
        ...state,
        loading: true,
      };

    case GET_INVENTORYALLOTTED_SMARTCARD_SUCCESS:
      return {
        ...state,
        allottedsmartcard: action.payload,
        loading: false,
      };

    case GET_INVENTORYALLOTTED_SMARTCARD_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_INVENTORYALLOTTED_STB_SUCCESS:
      return {
        ...state,
        allottedstb: action.payload,
        loading: false,
      };

    case GET_INVENTORYALLOTTED_STB_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_INVENTORYALLOTTED_PAIRING_SUCCESS:
      // console.log("Allotted pairing in reducer: ", action.payload);
      return {
        ...state,
        allottedpairing: action.payload.data.data,
        currentPage: action.payload.headers[RESPONSE_HEADER_CURRENT_PAGE],
        perPage: action.payload.headers[RESPONSE_HEADER_PER_PAGE],
        totalCount: action.payload.headers[RESPONSE_HEADER_TOTAL_COUNT],
        totalPages: action.payload.headers[RESPONSE_HEADER_PAGE_COUNT],
        loading: false,
      };

    case GET_INVENTORYALLOTTED_PAIRING_FAIL:
      return {
        ...state,
        error: action.payload,
        pagination: {},
        loading: false,
      };

    case GET_INVENTORYALLOTTED_SMARTCARDLIST_SUCCESS:
      return {
        ...state,
        allottedsmartcardlist: action.payload,
        loading: false,
      };

    case GET_INVENTORYALLOTTED_SMARTCARDLIST_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_INVENTORYALLOTTED_USERTYPE_SUCCESS:
      return {
        ...state,
        allottedusertype: action.payload,
        loading: false,
      };

    case GET_INVENTORYALLOTTED_USERTYPE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_INVENTORYALLOTTED_OPERATORLIST_SUCCESS:
      return {
        ...state,
        allottedoperatorlist: action.payload,
        loading: false,
      };

    case GET_INVENTORYALLOTTED_OPERATORLIST_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case ALLOT_SMARTCARD:
      return {
        ...state,
        loading: true,
      };

    case ALLOT_SMARTCARD_SUCCESS:
      return {
        ...state,
        allottedsmartcard: [...state.allottedsmartcard, action.payload],
        loading: false,
      };

    case ALLOT_SMARTCARD_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case DEALLOT_SMARTCARD:
      return {
        ...state,
        loading: true,
      };

    case DEALLOT_SMARTCARD_SUCCESS:
      return {
        ...state,
        loading: false,
        allottedsmartcard: state.allottedsmartcard.map((smartcard) =>
          smartcard.id === action.payload.id
            ? { ...smartcard, ...action.payload }
            : smartcard
        ),
      };

    case DEALLOT_SMARTCARD_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default InventoryAllotted;
