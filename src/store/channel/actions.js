import {
  GET_CHANNELLIST,
  GET_CHANNELLIST_FAIL,
  GET_CHANNELLIST_SUCCESS,
} from "./actionTypes";

export const getChannelList = () => ({
  type: GET_CHANNELLIST,
});

export const getChannelListSuccess = (channellist) => {
  console.log("Received Channel List:", channellist);
  return {
    type: GET_CHANNELLIST_SUCCESS,
    payload: channellist,
  };
};

export const getChannelListFail = (error) => ({
  type: GET_CHANNELLIST_FAIL,
  payload: error,
});
