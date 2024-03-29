import {
  RESPONSE_HEADER_CURRENT_PAGE,
  RESPONSE_HEADER_PAGE_COUNT,
  RESPONSE_HEADER_TOTAL_COUNT,
  RESPONSE_HEADER_PER_PAGE,
} from "../../constants/strings";
import {
  GET_DESIGNATION,
  GET_DESIGNATION_SUCCESS,
  GET_DESIGNATION_FAIL,
  ADD_NEW_DESIGNATION,
  ADD_DESIGNATION_SUCCESS,
  ADD_DESIGNATION_FAIL,
  GET_DESIGNATION_STATUS_FAIL,
  GET_DESIGNATION_STATUS_SUCCESS,
  GET_DESIGNATION_TYPE_FAIL,
  GET_DESIGNATION_TYPE_SUCCESS,
  GET_DESIGNATION_PARENT_FAIL,
  GET_DESIGNATION_PARENT_SUCCESS,
  UPDATE_DESIGNATION,
  UPDATE_DESIGNATION_SUCCESS,
  UPDATE_DESIGNATION_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  designation: [],
  designationStatus: [],
  designationType: [],
  designationParent: [],
  error: {},
  loading: false,
};

const Designation = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_DESIGNATION:
      return {
        ...state,
        loading: true,
      };
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
        loading: false,
      };

    case GET_DESIGNATION_STATUS_SUCCESS:
      console.log("Designation data in reducer:", action.payload);
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

    case GET_DESIGNATION_TYPE_SUCCESS:
      // console.log("Designation data in reducer:", action.payload);
      return {
        ...state,
        designationType: action.payload,
        loading: false,
      };

    case GET_DESIGNATION_TYPE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_DESIGNATION_PARENT_SUCCESS:
      // console.log("Designation data in reducer:", action.payload);
      return {
        ...state,
        designationParent: action.payload,
        loading: false,
      };

    case GET_DESIGNATION_PARENT_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case ADD_NEW_DESIGNATION:
      return {
        ...state,
        loading: true,
      };
    case ADD_DESIGNATION_SUCCESS:
      return {
        ...state,
        designation: [...state.designation, action.payload],
        loading: false,
      };

    case ADD_DESIGNATION_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case UPDATE_DESIGNATION:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_DESIGNATION_SUCCESS:
      return {
        ...state,
        loading: false,
        designation: state.designation.map((desig) =>
          desig.id === action.payload.id
            ? { ...desig, ...action.payload }
            : desig
        ),
      };

    case UPDATE_DESIGNATION_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default Designation;
