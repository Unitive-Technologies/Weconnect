import {
  GET_REGIONALOFFICE_SUCCESS,
  GET_REGIONALOFFICE_FAIL,
  ADD_REGIONALOFFICE_SUCCESS,
  ADD_REGIONALOFFICE_FAIL,
  UPDATE_REGIONALOFFICE_SUCCESS,
  UPDATE_REGIONALOFFICE_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  regionaloffice: [],
  error: {},
  loading: true,
};

const RegionalOffice = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_REGIONALOFFICE_SUCCESS:
      console.log("Regional office data in reducer:", action.payload);
      return {
        ...state,
        regionaloffice: action.payload,
        loading: false,
      };

    case GET_REGIONALOFFICE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case ADD_REGIONALOFFICE_SUCCESS:
      return {
        ...state,
        regionaloffice: [...state.regionaloffice, action.payload],
      };

    case ADD_REGIONALOFFICE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case UPDATE_REGIONALOFFICE_SUCCESS:
      return {
        ...state,
        regionaloffice: state.regionaloffice.map((regoff) =>
          regoff.id.toString() === action.payload.id.toString()
            ? { regoff, ...action.payload }
            : regoff
        ),
      };

    case UPDATE_REGIONALOFFICE_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default RegionalOffice;
