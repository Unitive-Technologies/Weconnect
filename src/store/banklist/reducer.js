import {
  GET_BANK,
  GET_BANK_SUCCESS,
  GET_BANK_FAIL,
  UPDATE_BANK,
  UPDATE_BANK_SUCCESS,
  UPDATE_BANK_FAIL,
  ADD_NEW_BANK,
  ADD_BANK_SUCCESS,
  ADD_BANK_FAIL,
  GET_BANK_STATUS_FAIL,
  GET_BANK_STATUS_SUCCESS,
} from "./actionTypes";

const INIT_STATE = {
  bank: [],
  bankStatus: [],
  error: {},
  loading: true,
};

const Bank = (state = INIT_STATE, action) => {
  switch (action.type) {

    case GET_BANK:
      return {
        ...state,
        loading: true,
      };

    case GET_BANK_SUCCESS:
      console.log("Bank list data in reducer:", action.payload);
      return {
        ...state,
        bank: action.payload,
        loading: false,
      };


    case GET_BANK_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case UPDATE_BANK:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_BANK_SUCCESS:
      return {
        ...state,
        loading: false,
        bank: state.bank.map((bank) =>
          bank.id === action.payload.id ? { ...bank, ...action.payload } : bank
        ),
        // bank: state.bank.map((bank) =>
        //   bank.id.toString() === action.payload.id.toString()
        //     ? { bank, ...action.payload }
        //     : bank
        // ),
      };

    case UPDATE_BANK_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case GET_BANK_STATUS_SUCCESS:
      console.log("Bank data in reducer:", action.payload);
      return {
        ...state,
        bankStatus: action.payload,
        loading: false,
      };

    case GET_BANK_STATUS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case ADD_NEW_BANK:
      return {
        ...state,
        loading: true,
      };

    case ADD_BANK_SUCCESS:
      return {
        ...state,
        bank: [
          ...state.bank,
          action.payload,
        ],
        loading: false,
      };

    case ADD_BANK_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default Bank;
