import {
  GET_BOUQUET_SUCCESS,
  GET_BOUQUET_FAIL,
  ADD_BOUQUET_SUCCESS,
  ADD_BOUQUET_FAIL,
  GET_BOUQUETTYPE_SUCCESS,
  GET_BOUQUETTYPE_FAIL,
  GET_BOUQUET_BOXTYPE_SUCCESS,
  GET_BOUQUET_BOXTYPE_FAIL,
  GET_BOUQUEX_SUCCESS,
  GET_BOUQUEX_FAIL,
  GET_BOUQUET_TAXLIST_SUCCESS,
  GET_BOUQUET_TAXLIST_FAIL,
  GET_RECHARGEPERIOD_SUCCESS,
  GET_RECHARGEPERIOD_FAIL,
  GET_ALACARTECHANNELS_SUCCESS,
  GET_ALACARTECHANNELS_FAIL,
  GET_BOUQUET_PACKAGES_SUCCESS,
  GET_BOUQUET_PACKAGES_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  bouquet: [],
  bouquettype: [],
  bouquetboxtype: [],
  bouquex: [],
  bouquettaxlist: [],
  rechargeperiod: [],
  alacartechannels: [],
  bouquetpackages: [],
  error: {},
  loading: true,
};

const Bouquet = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_BOUQUET_SUCCESS:
      console.log("Bouquet list data in reducer:", action.payload);
      return {
        ...state,
        bouquet: action.payload,
        loading: false,
      };

    case GET_BOUQUET_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case ADD_BOUQUET_SUCCESS:
      return {
        ...state,
        bouquet: [...state.bouquet, action.payload],
      };

    case ADD_BOUQUET_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_BOUQUETTYPE_SUCCESS:
      return {
        ...state,
        bouquettype: action.payload,
        loading: false,
      };

    case GET_BOUQUETTYPE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_BOUQUET_BOXTYPE_SUCCESS:
      return {
        ...state,
        bouquetboxtype: action.payload,
        loading: false,
      };

    case GET_BOUQUET_BOXTYPE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_BOUQUEX_SUCCESS:
      return {
        ...state,
        bouquex: action.payload,
        loading: false,
      };

    case GET_BOUQUEX_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_BOUQUET_TAXLIST_SUCCESS:
      return {
        ...state,
        bouquettaxlist: action.payload,
        loading: false,
      };

    case GET_BOUQUET_TAXLIST_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_RECHARGEPERIOD_SUCCESS:
      return {
        ...state,
        rechargeperiod: action.payload,
        loading: false,
      };

    case GET_RECHARGEPERIOD_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_ALACARTECHANNELS_SUCCESS:
      return {
        ...state,
        alacartechannels: action.payload,
        loading: false,
      };

    case GET_ALACARTECHANNELS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_BOUQUET_PACKAGES_SUCCESS:
      return {
        ...state,
        bouquetpackages: action.payload,
        loading: false,
      };

    case GET_BOUQUET_PACKAGES_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default Bouquet;
