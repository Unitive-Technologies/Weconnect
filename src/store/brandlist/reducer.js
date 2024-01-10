import {
  GET_BRANDLIST_SUCCESS,
  GET_BRANDLIST_FAIL,
  GET_BRANDLIST_BRANDTYPE_SUCCESS,
  GET_BRANDLIST_BRANDTYPE_FAIL,
  GET_BRANDLIST_BOXTYPE_SUCCESS,
  GET_BRANDLIST_BOXTYPE_FAIL,
  GET_BRANDLIST_CHARACTERS_SUCCESS,
  GET_BRANDLIST_CHARACTERS_FAIL,
  GET_BRANDLIST_STATUS_SUCCESS,
  GET_BRANDLIST_STATUS_FAIL,
  GET_BRANDLIST_CASTYPE_SUCCESS,
  GET_BRANDLIST_CASTYPE_FAIL,
  ADD_BRANDLIST_SUCCESS,
  ADD_BRANDLIST_FAIL,
  UPDATE_BRANDLIST_SUCCESS,
  UPDATE_BRANDLIST_FAIL,

} from "./actionTypes";

const INIT_STATE = {
  brandlist: [],
  brandlistBrandType: [],
  brandlistBoxType: [],
  brandlistCharacters: [],
  brandlistStatus: [],
  brandlistCasType: [],
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

    case UPDATE_BRANDLIST_SUCCESS:
      return {
        ...state,
        brandlist: state.brandlist.map((brandlist) =>
          brandlist.id.toString() === action.payload.id.toString()
            ? { brandlist, ...action.payload }
            : brandlist
        ),
      };

    case UPDATE_BRANDLIST_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_BRANDLIST_BRANDTYPE_SUCCESS:
      console.log("BrandType data in reducer:", action.payload);
      return {
        ...state,
        brandlistBrandType: action.payload,
        loading: false,
      };

    case GET_BRANDLIST_BRANDTYPE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_BRANDLIST_BOXTYPE_SUCCESS:
      console.log("Box Type data in reducer:", action.payload);
      return {
        ...state,
        brandlistBoxType: action.payload,
        loading: false,
      };

    case GET_BRANDLIST_BOXTYPE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_BRANDLIST_CHARACTERS_SUCCESS:
      console.log("BrandType data in reducer:", action.payload);
      return {
        ...state,
        brandlistCharacters: action.payload,
        loading: false,
      };

    case GET_BRANDLIST_CHARACTERS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_BRANDLIST_STATUS_SUCCESS:
      console.log("BrandType data in reducer:", action.payload);
      return {
        ...state,
        brandlistStatus: action.payload,
        loading: false,
      };

    case GET_BRANDLIST_STATUS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_BRANDLIST_CASTYPE_SUCCESS:
      console.log("BrandType data in reducer:", action.payload);
      return {
        ...state,
        brandlistCasType: action.payload,
        loading: false,
      };

    case GET_BRANDLIST_CASTYPE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case ADD_BRANDLIST_SUCCESS:
      return {
        ...state,
        brandlist: [...state.brandlist, action.payload],
      };

    case ADD_BRANDLIST_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default BrandList;
