import {
  GET_INVENTORYBLACKLISTED_SMARTCARD_SUCCESS,
  GET_INVENTORYBLACKLISTED_SMARTCARD_FAIL,
  GET_INVENTORYBLACKLISTED_STB_SUCCESS,
  GET_INVENTORYBLACKLISTED_STB_FAIL,
  GET_INVENTORYBLACKLISTED_PAIRING_SUCCESS,
  GET_INVENTORYBLACKLISTED_PAIRING_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  blacklistedsmartcard: [],
  blacklistedstb: [],
  blacklistedpairing: [],
  error: {},
  loading: true,
};

const InventoryBlacklisted = (state = INIT_STATE, action) => {
  switch (action.type) {
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

    default:
      return state;
  }
};

export default InventoryBlacklisted;
