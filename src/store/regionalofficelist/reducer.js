import {
  GET_REGIONALOFFICE_SUCCESS,
  GET_REGIONALOFFICE_FAIL,
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

    default:
      return state;
  }
};

export default RegionalOffice;
