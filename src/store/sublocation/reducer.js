import {
  GET_SUBLOCATION_SUCCESS,
  GET_SUBLOCATION_FAIL,
  ADD_SUBLOCATION_SUCCESS,
  ADD_SUBLOCATION_FAIL,
  UPDATE_SUBLOCATION_SUCCESS,
  UPDATE_SUBLOCATION_FAIL,
  GET_LOCATION_ONSUBLOCATION_SUCCESS,
  GET_LOCATION_ONSUBLOCATION_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  sublocation: [],
  locateonsublocate: [],
  error: {},
  loading: true,
};

const Sublocation = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_SUBLOCATION_SUCCESS:
      return {
        ...state,
        sublocation: action.payload,
        loading: false,
      };

    case GET_SUBLOCATION_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case ADD_SUBLOCATION_SUCCESS:
      return {
        ...state,
        sublocation: [...state.sublocation, action.payload],
      };

    case ADD_SUBLOCATION_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case UPDATE_SUBLOCATION_SUCCESS:
      console.log("Sublocation in reducer: ", action.payload);
      return {
        ...state,
        sublocation: state.sublocation.map((sublocate) =>
          sublocate.id.toString() === action.payload.id.toString()
            ? { sublocation: sublocate, ...action.payload }
            : sublocate
        ),
      };

    case UPDATE_SUBLOCATION_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_LOCATION_ONSUBLOCATION_SUCCESS:
      return {
        ...state,
        locateonsublocate: action.payload,
        loading: false,
      };

    case GET_LOCATION_ONSUBLOCATION_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default Sublocation;
