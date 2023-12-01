import { GET_BANK_SUCCESS, GET_BANK_FAIL } from "./actionTypes";

const INIT_STATE = {
  bank: [],
  error: {},
  loading: true,
};

const Bank = (state = INIT_STATE, action) => {
  switch (action.type) {
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
      };

    default:
      return state;
  }
};

export default Bank;
