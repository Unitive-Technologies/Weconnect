import {
  GET_COMPANYLIST_SUCCESS, GET_COMPANYLIST_FAIL, ADD_COMPANYLIST_SUCCESS,
  ADD_COMPANYLIST_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  companylist: [],
  error: {},
  loading: true,
};

const CompanyList = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_COMPANYLIST_SUCCESS:
      console.log("CompanyList data in reducer:", action.payload);
      return {
        ...state,
        companylist: action.payload,
        loading: false,
      };

    case GET_COMPANYLIST_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case ADD_COMPANYLIST_SUCCESS:
      return {
        ...state,
        companylist: [
          ...state.companylist,
          action.payload,
        ],
      };

    case ADD_COMPANYLIST_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default CompanyList;
