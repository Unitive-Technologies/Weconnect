import {
  GET_CITY,
  GET_CITY_SUCCESS,
  GET_CITY_FAIL,
  ADD_CITY,
  ADD_CITY_SUCCESS,
  ADD_CITY_FAIL,
  GET_DISTRICT_BYSTATEID_SUCCESS,
  GET_DISTRICT_BYSTATEID_FAIL,
  UPDATE_CITY_SUCCESS,
  UPDATE_CITY_FAIL,
  UPDATE_CITY,
} from "./actionTypes";

const INIT_STATE = {
  city: [],
  districtlist: [],
  error: {},
  loading: true,
};

const City = (state = INIT_STATE, action) => {
  switch (action.type) {

    case GET_CITY:
      return {
        ...state,
        loading: true,
      };

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

    case ADD_CITY:
      return {
        ...state,
        loading: true,
      };

    case ADD_CITY_SUCCESS:
      return {
        ...state,
        city: [...state.city, action.payload],
        loading: false,
      };

    case ADD_CITY_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
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

    case UPDATE_CITY:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_CITY_SUCCESS:
      return {
        ...state,

        loading: false,
        city: state.city.map((cite) =>
          cite.id === action.payload.id ? { ...cite, ...action.payload } : cite
        ),
        // city: state.city.map((cite) =>
        //   cite.id.toString() === action.payload.id.toString()
        //     ? { city: cite, ...action.payload }
        //     : cite
        // ),
      };

    case UPDATE_CITY_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default City;
