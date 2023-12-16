import {
  GET_BOUQUET_SUCCESS,
  GET_BOUQUET_FAIL,
  ADD_BOUQUET_SUCCESS,
  ADD_BOUQUET_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  bouquet: [],
  error: {},
  loading: true,
};

const Bouquet = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_BOUQUET_SUCCESS:
      console.log("Bouquet list data in reducer:", action.payload);
      return {
        ...state,
        bouquet: action.payload,
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

    default:
      return state;
  }
};

export default Bouquet;
