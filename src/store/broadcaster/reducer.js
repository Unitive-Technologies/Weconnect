import {
  GET_BROADCASTER_SUCCESS,
  GET_BROADCASTER_FAIL,
  GET_BROADCASTER_STATUS_SUCCESS,
  GET_BROADCASTER_STATUS_FAIL,
  ADD_BROADCASTER_SUCCESS,
  ADD_BROADCASTER_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  broadCasters: [],
  broadCastersStatus: [],
  error: {},
  loading: true,
};

const BroadCaster = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_BROADCASTER_SUCCESS:
      console.log("BroadCasters data in reducer:", action.payload);
      return {
        ...state,
        broadCasters: action.payload,
        loading: false,
      };

    case GET_BROADCASTER_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case ADD_BROADCASTER_SUCCESS:
      return {
        ...state,
        broadCasters: [
          ...state.broadCasters,
          action.payload,
        ],
      };

    case ADD_BROADCASTER_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default BroadCaster;
