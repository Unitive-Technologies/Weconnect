import {
  GET_LCO_SUCCESS,
  GET_LCO_FAIL,
  ADD_LCO_SUCCESS,
  ADD_LCO_FAIL,
  UPDATE_LCO_SUCCESS,
  UPDATE_LCO_FAIL,
} from "./actionTypes";

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

    case ADD_LCO_SUCCESS:
      return {
        ...state,
        lco: [...state.lco, action.payload],
      };

    case ADD_LCO_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case UPDATE_LCO_SUCCESS:
      return {
        ...state,
        lco: state.lco.map((lcodata) =>
          lcodata.id.toString() === action.payload.id.toString()
            ? { lcodata, ...action.payload }
            : lcodata
        ),
      };

    case UPDATE_LCO_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default Lco;
