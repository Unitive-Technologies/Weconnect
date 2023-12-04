import { GET_ADMINDETAILS_SUCCESS, GET_ADMINDETAILS_FAIL } from "./actionTypes";

const INIT_STATE = {
  admindetails: [],
  error: {},
  loading: true,
};

const AdminDetails = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_ADMINDETAILS_SUCCESS:
      console.log("Admindetails data in reducer:", action.payload);
      return {
        ...state,
        admindetails: action.payload,
        loading: false,
      };

    case GET_ADMINDETAILS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default AdminDetails;
