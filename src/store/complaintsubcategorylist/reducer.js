import {
  GET_COMPLAINTSUBCATEGORY_SUCCESS,
  GET_COMPLAINTSUBCATEGORY_FAIL,
  ADD_COMPLAINTSUBCATEGORY_SUCCESS,
  ADD_COMPLAINTSUBCATEGORY_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  complaintsubcategory: [],
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

    case ADD_COMPLAINTSUBCATEGORY_SUCCESS:
      return {
        ...state,
        complaintsubcategory: [
          ...state.complaintsubcategory,
          action.payload,
        ],
      };

    case ADD_COMPLAINTSUBCATEGORY_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default ComplaintSubCategory;
