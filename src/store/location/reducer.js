import {
  GET_LOCATION_SUCCESS,
  GET_LOCATION_FAIL,
  ADD_LOCATION_SUCCESS,
  ADD_LOCATION_FAIL,
  UPDATE_LOCATION_SUCCESS,
  UPDATE_LOCATION_FAIL,
  GET_LCO_ONLOCATION_SUCCESS,
  GET_LCO_ONLOCATION_FAIL,
  GET_SINGLE_LOCATION_SUCCESS,
  GET_SINGLE_LOCATION_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  location: [],
  lcoonlocation: [],
  singlelocation: [],
  error: {},
  loading: true,
};

const Location = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_LOCATION_SUCCESS:
      // console.log("Location data in reducer:", action.payload);
      return {
        ...state,
        location: action.payload,
        loading: false,
      };

    case GET_LOCATION_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case ADD_LOCATION_SUCCESS:
      return {
        ...state,
        location: [...state.location, action.payload],
      };

    case ADD_LOCATION_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case UPDATE_LOCATION_SUCCESS:
      return {
        ...state,
        location: state.location.map((locate) =>
          locate.id.toString() === action.payload.id.toString()
            ? { location: locate, ...action.payload }
            : locate
        ),
      };

    case UPDATE_LOCATION_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_LCO_ONLOCATION_SUCCESS:
      return {
        ...state,
        lcoonlocation: action.payload,
        loading: false,
      };

    case GET_LCO_ONLOCATION_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_SINGLE_LOCATION_SUCCESS:
      console.log("Single Location data in reducer:", action.payload);
      return {
        ...state,
        singlelocation: action.payload,
        loading: false,
      };

    case GET_SINGLE_LOCATION_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default Location;
