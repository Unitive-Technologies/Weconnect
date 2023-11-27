import {
  GET_CITY_SUCCESS,
  GET_CITY_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  city: [],
  error: {},
  loading: true,
};

const City = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_CITY_SUCCESS:
      console.log("City data in reducer:", action.payload);
      return {
        ...state,
        city: action.payload,
        loading: false,
      };

    case GET_CITY_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default City;

