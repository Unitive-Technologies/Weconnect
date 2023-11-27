import {
  GET_DISTRICT_SUCCESS,
  GET_DISTRICT_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  district: [],
  error: {},
  loading: true,
};

const District = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_DISTRICT_SUCCESS:
      console.log("District data in reducer:", action.payload);
      return {
        ...state,
        district: action.payload,
        loading: false,
      };

    case GET_DISTRICT_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default District;
