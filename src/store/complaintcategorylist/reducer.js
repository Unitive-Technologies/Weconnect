import {
  GET_COMPLAINTCATEGORY_SUCCESS,
  GET_COMPLAINTCATEGORY_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  complaintcategory: [],
  error: {},
  loading: true,
};

const ComplaintCategory = (state = INIT_STATE, action) => {
  switch (action.type) {
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
      };

    default:
      return state;
  }
};

export default ComplaintCategory;
