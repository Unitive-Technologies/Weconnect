import {
  GET_INVENTORYSTOCK_SUCCESS,
  GET_INVENTORYSTOCK_FAIL,
  GET_INVENTORYSTOCK_STB_SUCCESS,
  GET_INVENTORYSTOCK_STB_FAIL,
  GET_INVENTORYSTOCK_PAIRING_SUCCESS,
  GET_INVENTORYSTOCK_PAIRING_FAIL,
  GET_INVENTORYFAULTY_SMARTCARD_SUCCESS,
  GET_INVENTORYFAULTY_SMARTCARD_FAIL,
  GET_INVENTORYFAULTY_STB_SUCCESS,
  GET_INVENTORYFAULTY_STB_FAIL,
  GET_INVENTORYFAULTY_PAIRING_SUCCESS,
  GET_INVENTORYFAULTY_PAIRING_FAIL,
  GET_INVENTORYBLACKLISTED_SMARTCARD_SUCCESS,
  GET_INVENTORYBLACKLISTED_SMARTCARD_FAIL,
  GET_INVENTORYBLACKLISTED_STB_SUCCESS,
  GET_INVENTORYBLACKLISTED_STB_FAIL,
  GET_INVENTORYBLACKLISTED_PAIRING_SUCCESS,
  GET_INVENTORYBLACKLISTED_PAIRING_FAIL,
  GET_INVENTORYALLOTTED_SMARTCARD_SUCCESS,
  GET_INVENTORYALLOTTED_SMARTCARD_FAIL,
  GET_INVENTORYALLOTTED_STB_SUCCESS,
  GET_INVENTORYALLOTTED_STB_FAIL,
  GET_INVENTORYALLOTTED_PAIRING_SUCCESS,
  GET_INVENTORYALLOTTED_PAIRING_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  inventorystock: [],
  stockstb: [],
  stockpairing: [],
  faultysmartcard: [],
  faultystb: [],
  faultypairing: [],
  blacklistedsmartcard: [],
  blacklistedstb: [],
  blacklistedpairing: [],
  allottedsmartcard: [],
  allottedstb: [],
  allottedpairing: [],
  error: {},
  loading: true,
};

const InventoryStock = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_INVENTORYSTOCK_SUCCESS:
      return {
        ...state,
        inventorystock: action.payload,
        loading: false,
      };

    case GET_INVENTORYSTOCK_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_INVENTORYSTOCK_STB_SUCCESS:
      return {
        ...state,
        stockstb: action.payload,
        loading: false,
      };

    case GET_INVENTORYSTOCK_STB_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_INVENTORYSTOCK_PAIRING_SUCCESS:
      return {
        ...state,
        stockpairing: action.payload,
        loading: false,
      };

    case GET_INVENTORYSTOCK_PAIRING_FAIL:
      return {
        ...state,
        error: action.payload,
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
        faultypairing: action.payload,
        loading: false,
      };

    case GET_INVENTORYFAULTY_PAIRING_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_INVENTORYBLACKLISTED_SMARTCARD_SUCCESS:
      return {
        ...state,
        blacklistedsmartcard: action.payload,
        loading: false,
      };

    case GET_INVENTORYBLACKLISTED_SMARTCARD_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_INVENTORYBLACKLISTED_STB_SUCCESS:
      return {
        ...state,
        blacklistedstb: action.payload,
        loading: false,
      };

    case GET_INVENTORYBLACKLISTED_STB_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_INVENTORYBLACKLISTED_PAIRING_SUCCESS:
      return {
        ...state,
        blacklistedpairing: action.payload,
        loading: false,
      };

    case GET_INVENTORYBLACKLISTED_PAIRING_FAIL:
      return {
        ...state,
        error: action.payload,
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
      return {
        ...state,
        allottedpairing: action.payload,
        loading: false,
      };

    case GET_INVENTORYALLOTTED_PAIRING_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default InventoryStock;
