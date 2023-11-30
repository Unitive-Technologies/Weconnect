import { GET_BRANDLIST_SUCCESS, GET_BRANDLIST_FAIL } from "./actionTypes";

const INIT_STATE = {
  brandlist: [],
  error: {},
  loading: true,
};

const BrandList = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_BRANDLIST_SUCCESS:
      console.log("BrandList data in reducer:", action.payload);
      return {
        ...state,
        brandlist: action.payload,
        loading: false,
      };

    case GET_BRANDLIST_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default BrandList;
