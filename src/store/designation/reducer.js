import {
  GET_DESIGNATION_SUCCESS,
  GET_DESIGNATION_FAIL,
  ADD_DESIGNATION_SUCCESS,
  ADD_DESIGNATION_FAIL,
  GET_DESIGNATION_STATUS_FAIL,
  GET_DESIGNATION_STATUS_SUCCESS,
} from "./actionTypes";

const INIT_STATE = {
  designation: [],
  designationStatus: [],
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

    case GET_DESIGNATION_STATUS_SUCCESS:
      // console.log("Designation data in reducer:", action.payload);
      return {
        ...state,
        designationStatus: action.payload,
        loading: false,
      };

    case GET_DESIGNATION_STATUS_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case ADD_DESIGNATION_SUCCESS:
      return {
        ...state,
        designation: [...state.designation, action.payload],
      };

    case ADD_DESIGNATION_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default Designation;
