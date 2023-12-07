import {
  GET_CHANNELLIST,
  GET_CHANNELLIST_FAIL,
  GET_CHANNELLIST_SUCCESS,
  ADD_NEW_CHANNELLIST,
  ADD_CHANNELLIST_SUCCESS,
  ADD_CHANNELLIST_FAIL,
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

export const addNewChannelList = (
  channellist
) => ({
  type: ADD_NEW_CHANNELLIST,
  payload: channellist,
});

export const addChannelListSuccess = (
  channellist
) => ({
  type: ADD_CHANNELLIST_SUCCESS,
  payload: channellist,
});

export const addChannelListFail = (error) => ({
  type: ADD_CHANNELLIST_FAIL,
  payload: error,
});