import {
  GET_BROADCASTERBOUQUETLIST,
  GET_BROADCASTERBOUQUETLIST_FAIL,
  GET_BROADCASTERBOUQUETLIST_SUCCESS,
  GET_BROADCASTERBOUQUETLIST_STATUS,
  GET_BROADCASTERBOUQUETLIST_STATUS_FAIL,
  GET_BROADCASTERBOUQUETLIST_STATUS_SUCCESS,
  GET_BROADCASTERBOUQUETLIST_DEFINITION,
  GET_BROADCASTERBOUQUETLIST_DEFINITION_FAIL,
  GET_BROADCASTERBOUQUETLIST_DEFINITION_SUCCESS,
  GET_BROADCASTERBOUQUETLIST_TYPE,
  GET_BROADCASTERBOUQUETLIST_TYPE_FAIL,
  GET_BROADCASTERBOUQUETLIST_TYPE_SUCCESS,
  GET_BROADCASTERBOUQUETLIST_BROADCASTER,
  GET_BROADCASTERBOUQUETLIST_BROADCASTER_FAIL,
  GET_BROADCASTERBOUQUETLIST_BROADCASTER_SUCCESS,
  GET_BROADCASTERBOUQUETLIST_ADDCHANNELS,
  GET_BROADCASTERBOUQUETLIST_ADDCHANNELS_FAIL,
  GET_BROADCASTERBOUQUETLIST_ADDCHANNELS_SUCCESS,
  ADD_NEW_BROADCASTERBOUQUETLIST,
  ADD_BROADCASTERBOUQUETLIST_SUCCESS,
  ADD_BROADCASTERBOUQUETLIST_FAIL,
  UPDATE_BROADCASTERBOUQUETLIST,
  UPDATE_BROADCASTERBOUQUETLIST_FAIL,
  UPDATE_BROADCASTERBOUQUETLIST_SUCCESS,
  UPDATE_BROADCASTERBOUQUETLIST_CURRENT_PAGE,
} from "./actionTypes";

export const updateBroadcasterBouquet = (broadbouquet) => ({
  type: UPDATE_BROADCASTERBOUQUETLIST,
  payload: broadbouquet,
});

export const updateBroadcasterSuccess = (broadbouquet) => ({
  type: UPDATE_BROADCASTERBOUQUETLIST_SUCCESS,
  payload: broadbouquet,
});

export const updateBroadcasterFail = (error) => ({
  type: UPDATE_BROADCASTERBOUQUETLIST_FAIL,
  payload: error,
});

export const goToPage = (toPage) => ({
  type: UPDATE_BROADCASTERBOUQUETLIST_CURRENT_PAGE,
  payload: Number(toPage),
});

export const getBroadcasterBouquetList = () => ({
  type: GET_BROADCASTERBOUQUETLIST,
});

export const getBroadcasterBouquetListSuccess = (broadbouquet) => {
  console.log("Received BroadcasterBouquet List:", broadbouquet);
  return {
    type: GET_BROADCASTERBOUQUETLIST_SUCCESS,
    payload: broadbouquet,
  };
};

export const getBroadcasterBouquetListFail = (error) => ({
  type: GET_BROADCASTERBOUQUETLIST_FAIL,
  payload: error,
});

export const getBroadcasterBouquetStatus = () => ({
  type: GET_BROADCASTERBOUQUETLIST_STATUS,
});

export const getBroadcasterBouquetStatusSuccess = (broadbouquetStatus) => {
  // console.log("Received Channel List Status:", channellistStatus);
  return {
    type: GET_BROADCASTERBOUQUETLIST_STATUS_SUCCESS,
    payload: broadbouquetStatus,
  };
};

export const getBroadcasterBouquetStatusFail = (error) => ({
  type: GET_BROADCASTERBOUQUETLIST_STATUS_FAIL,
  payload: error,
});

export const getBroadcasterBouquetDefinition = () => ({
  type: GET_BROADCASTERBOUQUETLIST_DEFINITION,
});

export const getBroadcasterBouquetDefinitionSuccess = (broadbouquetDefinition) => {
  // console.log("Received Channel List Status:", channellistStatus);
  return {
    type: GET_BROADCASTERBOUQUETLIST_DEFINITION_SUCCESS,
    payload: broadbouquetDefinition,
  };
};

export const getBroadcasterBouquetDefinitionFail = (error) => ({
  type: GET_BROADCASTERBOUQUETLIST_DEFINITION_FAIL,
  payload: error,
});

export const getBroadcasterBouquetType = () => ({
  type: GET_BROADCASTERBOUQUETLIST_TYPE,
});

export const getBroadcasterBouquetTypeSuccess = (broadbouquetType) => {
  // console.log("Received Channel List Status:", channellistStatus);
  return {
    type: GET_BROADCASTERBOUQUETLIST_TYPE_SUCCESS,
    payload: broadbouquetType,
  };
};

export const getBroadcasterBouquetTypeFail = (error) => ({
  type: GET_BROADCASTERBOUQUETLIST_TYPE_FAIL,
  payload: error,
});

export const getBroadcasterBouquetBroadcaster = () => ({
  type: GET_BROADCASTERBOUQUETLIST_BROADCASTER,
});

export const getBroadcasterBouquetBroadcasterSuccess = (broadbouquetBroadcaster) => {
  // console.log("Received Channel List Status:", channellistStatus);
  return {
    type: GET_BROADCASTERBOUQUETLIST_BROADCASTER_SUCCESS,
    payload: broadbouquetBroadcaster,
  };
};

export const getBroadcasterBouquetBroadcasterFail = (error) => ({
  type: GET_BROADCASTERBOUQUETLIST_BROADCASTER_FAIL,
  payload: error,
});

export const getBroadcasterBouquetAddchannels = () => ({
  type: GET_BROADCASTERBOUQUETLIST_ADDCHANNELS,
});

export const getBroadcasterBouquetAddchannelsSuccess = (broadbouquetAddchannels) => {
  // console.log("Received Channel List Status:", channellistStatus);
  return {
    type: GET_BROADCASTERBOUQUETLIST_ADDCHANNELS_SUCCESS,
    payload: broadbouquetAddchannels,
  };
};

export const getBroadcasterBouquetAddchannelsFail = (error) => ({
  type: GET_BROADCASTERBOUQUETLIST_ADDCHANNELS_FAIL,
  payload: error,
});

export const addNewBroadcasterBouquetList = (
  broadbouquet
) => ({
  type: ADD_NEW_BROADCASTERBOUQUETLIST,
  payload: broadbouquet,
});

export const addBroadcasterBouquetListSuccess = (
  broadbouquet
) => ({
  type: ADD_BROADCASTERBOUQUETLIST_SUCCESS,
  payload: broadbouquet,
});

export const addBroadcasterBouquetListFail = (error) => ({
  type: ADD_BROADCASTERBOUQUETLIST_FAIL,
  payload: error,
});