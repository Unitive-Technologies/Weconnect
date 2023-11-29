import {
  GET_LOCALCHANNELNUMBER_SUCCESS,
  GET_LOCALCHANNELNUMBER_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  localChannelNumber: [],
  error: {},
  loading: true,
};

const LocalChannelNumber = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_LOCALCHANNELNUMBER_SUCCESS:
      console.log("Local Channel Number data in reducer:", action.payload);
      return {
        ...state,
        localChannelNumber: action.payload,
        loading: false,
      };

    case GET_LOCALCHANNELNUMBER_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default LocalChannelNumber;
