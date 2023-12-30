import {
  GET_DISTRICT_SUCCESS,
  GET_DISTRICT_FAIL,
  ADD_DISTRICT_SUCCESS,
  ADD_DISTRICT_FAIL,
  GET_ADMINISTRATIVEDIVISION_STATUS_SUCCESS,
  GET_ADMINISTRATIVEDIVISION_STATUS_FAIL,
  GET_DISTRICT_STATELIST_SUCCESS,
  GET_DISTRICT_STATELIST_FAIL,
  UPDATE_DISTRICT_SUCCESS,
  UPDATE_DISTRICT_FAIL,
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

    case GET_ADMINISTRATIVEDIVISION_STATUS_SUCCESS:
      return {
        ...state,
        status: action.payload,
        loading: false,
      };

    case GET_ADMINISTRATIVEDIVISION_STATUS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_DISTRICT_STATELIST_SUCCESS:
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

    case UPDATE_DISTRICT_SUCCESS:
      return {
        ...state,
        district: state.district.map((dist) =>
          dist.id.toString() === action.payload.id.toString()
            ? { district: dist, ...action.payload }
            : dist
        ),
      };

    case UPDATE_DISTRICT_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default District;
