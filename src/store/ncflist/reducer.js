import { GET_NCF_SUCCESS, GET_NCF_FAIL } from "./actionTypes";

const INIT_STATE = {
  ncf: [],
  error: {},
  loading: true,
};

const Ncf = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_NCF_SUCCESS:
      console.log("Ncf data in reducer:", action.payload);
      return {
        ...state,
        ncf: action.payload,
        loading: false,
      };

    case GET_NCF_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default Ncf;
