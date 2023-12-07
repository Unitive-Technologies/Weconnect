import {
  GET_CHANNELLIST_SUCCESS, GET_CHANNELLIST_FAIL, ADD_CHANNELLIST_SUCCESS,
  ADD_CHANNELLIST_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  channelList: [],
  error: {},
  loading: true,
};

const ChannelList = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_CHANNELLIST_SUCCESS:
      console.log("ChannelList data in reducer:", action.payload);
      return {
        ...state,
        channelList: action.payload,
        loading: false,
      };

    case GET_CHANNELLIST_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case ADD_CHANNELLIST_SUCCESS:
      return {
        ...state,
        channelList: [
          ...state.channelList,
          action.payload,
        ],
      };

    case ADD_CHANNELLIST_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default ChannelList;
