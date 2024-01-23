import {
  GET_CHANNELLIST,
  GET_CHANNELLIST_FAIL,
  GET_CHANNELLIST_SUCCESS,
  GET_CAS_SOURCE,
  GET_CAS_SOURCE_SUCCESS,
  GET_CAS_SOURCE_FAIL,
  ADD_NEW_CHANNELLIST,
  ADD_CHANNELLIST_SUCCESS,
  ADD_CHANNELLIST_FAIL,
  UPDATE_CHANNELLIST_CURRENT_PAGE,
} from "./actionTypes";

export const goToPage = (toPage) => ({
  type: UPDATE_CHANNELLIST_CURRENT_PAGE,
  payload: Number(toPage),
});

export const getChannelList = () => ({
  type: GET_CHANNELLIST,
});

export const getCASSource = () => ({
  type: GET_CAS_SOURCE,
});

export const getCASSourceSuccess = (casSource) => ({
  type: GET_CAS_SOURCE_SUCCESS,
  payload: casSource,
});

export const getCASSourceFail = (error) => ({
  type: GET_CAS_SOURCE_FAIL,
  payload: error,
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

export const addNewChannelList = (channellist) => ({
  type: ADD_NEW_CHANNELLIST,
  payload: channellist,
});

export const addChannelListSuccess = (channellist) => ({
  type: ADD_CHANNELLIST_SUCCESS,
  payload: channellist,
});

export const addChannelListFail = (error) => ({
  type: ADD_CHANNELLIST_FAIL,
  payload: error,
});
