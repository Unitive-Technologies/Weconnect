import {
  GET_DISTRICT_SUCCESS,
  GET_DISTRICT_FAIL,
  ADD_DISTRICT_SUCCESS,
  ADD_DISTRICT_FAIL,
  GET_DISTRICT_STATUS_SUCCESS,
  GET_DISTRICT_STATUS_FAIL,
  GET_DISTRICT_STATELIST_SUCCESS,
  GET_DISTRICT_STATELIST_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  district: [],
  status: [],
  statelist: [],
  error: {},
  loading: true,
};

const District = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_DISTRICT_SUCCESS:
      console.log("District data in reducer:", action.payload);
      return {
        ...state,
        district: action.payload,
        loading: false,
      };

    case GET_DISTRICT_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case ADD_DISTRICT_SUCCESS:
      return {
        ...state,
        district: [...state.district, action.payload],
      };

    case ADD_DISTRICT_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_DISTRICT_STATUS_SUCCESS:
      return {
        ...state,
        status: action.payload,
        loading: false,
      };

    case GET_DISTRICT_STATUS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_DISTRICT_STATELIST_SUCCESS:
      console.log("Statelist data in reducer:", action.payload);
      return {
        ...state,
        statelist: action.payload,
        loading: false,
      };

    case GET_DISTRICT_STATELIST_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default District;
