import {
  GET_COMPLAINTCATEGORY,
  GET_COMPLAINTCATEGORY_SUCCESS,
  GET_COMPLAINTCATEGORY_FAIL,
  UPDATE_COMPLAINTCATEGORY,
  UPDATE_COMPLAINTCATEGORY_SUCCESS,
  UPDATE_COMPLAINTCATEGORY_FAIL,
  GET_COMPLAINTCATEGORY_STATUS_FAIL,
  GET_COMPLAINTCATEGORY_STATUS_SUCCESS,
  ADD_NEW_COMPLAINTCATEGORY,
  ADD_COMPLAINTCATEGORY_SUCCESS,
  ADD_COMPLAINTCATEGORY_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  complaintcategory: [],
  complaintcategoryStatus: [],
  error: {},
  loading: false,
};

const ComplaintCategory = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_COMPLAINTCATEGORY:
      return {
        ...state,
        loading: true,
      };

    case GET_COMPLAINTCATEGORY_SUCCESS:
      console.log("Complaint Category list data in reducer:", action.payload);
      return {
        ...state,
        complaintcategory: action.payload,
        loading: false,
      };

    case GET_COMPLAINTCATEGORY_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    case UPDATE_COMPLAINTCATEGORY:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_COMPLAINTCATEGORY_SUCCESS:
      return {
        ...state,
        complaintcategory: state.complaintcategory.map((complaintcategory) =>
          complaintcategory.id === action.payload.id
            ? { complaintcategory, ...action.payload }
            : complaintcategory
        ),
        loading: false,
      };

    case UPDATE_COMPLAINTCATEGORY_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case GET_COMPLAINTCATEGORY_STATUS_SUCCESS:
      console.log("Complaint Category data in reducer:", action.payload);
      return {
        ...state,
        complaintcategoryStatus: action.payload,
        loading: false,
      };

    case GET_COMPLAINTCATEGORY_STATUS_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case ADD_NEW_COMPLAINTCATEGORY:
      return {
        ...state,
        loading: true,
      };

    case ADD_COMPLAINTCATEGORY_SUCCESS:
      return {
        ...state,
        complaintcategory: [...state.complaintcategory, action.payload],
        loading: false,
      };

    case ADD_COMPLAINTCATEGORY_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default ComplaintCategory;
