import {
  GET_BROADCASTER_SUCCESS,
  GET_BROADCASTER_FAIL,
  UPDATE_BROADCASTER_SUCCESS,
  UPDATE_BROADCASTER_FAIL,
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

    case GET_BROADCASTER_STATUS_SUCCESS:
      console.log("Broadcaster status data in reducer:", action.payload);
      return {
        ...state,
        broadCastersStatus: action.payload,
        loading: false,
      };

    case GET_BROADCASTER_STATUS_FAIL:
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

    case UPDATE_BROADCASTER_SUCCESS:
      return {
        ...state,
        broadCasters: state.broadCasters.map((broadCasters) =>
          broadCasters.id.toString() === action.payload.id.toString()
            ? { broadCasters, ...action.payload }
            : broadCasters
        ),
      };

    case UPDATE_BROADCASTER_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default BroadCaster;
