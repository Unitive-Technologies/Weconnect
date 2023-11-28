import { GET_PACKAGELIST_SUCCESS, GET_PACKAGELIST_FAIL } from "./actionTypes";

const INIT_STATE = {
  packageList: [],
  error: {},
  loading: true,
};

const PackageList = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_PACKAGELIST_SUCCESS:
      console.log("PackageList data in reducer:", action.payload);
      return {
        ...state,
        packageList: action.payload,
        loading: false,
      };

    case GET_PACKAGELIST_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default PackageList;
