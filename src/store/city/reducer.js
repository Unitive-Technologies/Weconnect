import {
  GET_CITY_SUCCESS,
  GET_CITY_FAIL,
  ADD_CITY_SUCCESS,
  ADD_CITY_FAIL,
  GET_DISTRICT_BYSTATEID_SUCCESS,
  GET_DISTRICT_BYSTATEID_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  city: [],
  districtlist: [],
  error: {},
  loading: true,
};

const City = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_CITY_SUCCESS:
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

    case ADD_CITY_SUCCESS:
      return {
        ...state,
        city: [...state.city, action.payload],
      };

    case ADD_CITY_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_DISTRICT_BYSTATEID_SUCCESS:
      return {
        ...state,
        districtlist: action.payload,
        loading: false,
      };

    case GET_DISTRICT_BYSTATEID_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default City;
