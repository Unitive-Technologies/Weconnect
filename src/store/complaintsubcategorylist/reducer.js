import {
  GET_COMPLAINTSUBCATEGORY_SUCCESS,
  GET_COMPLAINTSUBCATEGORY_FAIL,
  GET_COMPLAINTSUBCATEGORY_STATUS_FAIL,
  GET_COMPLAINTSUBCATEGORY_STATUS_SUCCESS,
  GET_COMPLAINTSUBCATEGORY_DESIGNATION_FAIL,
  GET_COMPLAINTSUBCATEGORY_DESIGNATION_SUCCESS,
  GET_COMPLAINTSUBCATEGORY_CATEGORY_FAIL,
  GET_COMPLAINTSUBCATEGORY_CATEGORY_SUCCESS,
  ADD_COMPLAINTSUBCATEGORY_SUCCESS,
  ADD_COMPLAINTSUBCATEGORY_FAIL,
  ADD_NEW_COMPLAINTSUBCATEGORY,
} from "./actionTypes";

const INIT_STATE = {
  complaintsubcategory: [],
  complaintsubcategoryStatus: [],
  complaintsubcategoryCategory: [],
  complaintsubcategoryDesignation: [],
  error: {},
  loading: true,
};

const ComplaintSubCategory = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_COMPLAINTSUBCATEGORY_SUCCESS:
      console.log(
        "Complaint Sub Category list data in reducer:",
        action.payload
      );
      return {
        ...state,
        complaintsubcategory: action.payload,
        loading: false,
      };

    case GET_COMPLAINTSUBCATEGORY_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_COMPLAINTSUBCATEGORY_STATUS_SUCCESS:
      console.log(
        "complaintsubcategory Status data in reducer:",
        action.payload
      );
      return {
        ...state,
        complaintsubcategoryStatus: action.payload,
        loading: false,
      };

    case GET_COMPLAINTSUBCATEGORY_STATUS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_COMPLAINTSUBCATEGORY_CATEGORY_SUCCESS:
      console.log("complaintsubcategoryCategory in reducer:", action.payload);
      return {
        ...state,
        complaintsubcategoryCategory: action.payload,
        loading: false,
      };

    case GET_COMPLAINTSUBCATEGORY_CATEGORY_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case GET_COMPLAINTSUBCATEGORY_DESIGNATION_SUCCESS:
      console.log(
        "complaintsubcategory Status data in reducer:",
        action.payload
      );
      return {
        ...state,
        complaintsubcategoryDesignation: action.payload,
        loading: false,
      };

    case GET_COMPLAINTSUBCATEGORY_DESIGNATION_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case ADD_NEW_COMPLAINTSUBCATEGORY:
      return {
        ...state,
        loading: true,
      };

    case ADD_COMPLAINTSUBCATEGORY_SUCCESS:
      return {
        ...state,
        complaintsubcategory: [...state.complaintsubcategory, action.payload],
        loading: false,
      };

    case ADD_COMPLAINTSUBCATEGORY_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default ComplaintSubCategory;
