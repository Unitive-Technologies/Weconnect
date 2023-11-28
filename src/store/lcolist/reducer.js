import { GET_LCO_SUCCESS, GET_LCO_FAIL } from "./actionTypes";

const INIT_STATE = {
  lco: [],
  error: {},
  loading: true,
};

const Lco = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_LCO_SUCCESS:
      console.log("Lco data in reducer:", action.payload);
      return {
        ...state,
        lco: action.payload,
        loading: false,
      };

    case GET_LCO_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default Lco;
