import {
  GET_LOCATION_SUCCESS,
  GET_LOCATION_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  location: [],
  error: {},
  loading: true,
};

const Location = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_LOCATION_SUCCESS:
      console.log("Location data in reducer:", action.payload);
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

    default:
      return state;
  }
};

export default Location;
