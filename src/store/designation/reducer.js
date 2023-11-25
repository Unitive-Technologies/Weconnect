import {
  GET_DESIGNATION_SUCCESS,
  GET_DESIGNATION_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  designation: [],
  error: {},
  loading: true,
};

const Designation = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_DESIGNATION_SUCCESS:
      console.log("Designation data in reducer:", action.payload);
      return {
        ...state,
        designation: action.payload,
        loading: false,
      };

    case GET_DESIGNATION_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default Designation;
