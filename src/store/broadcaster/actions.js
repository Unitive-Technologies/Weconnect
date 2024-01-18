import {
  GET_BROADCASTER,
  GET_BROADCASTER_FAIL,
  GET_BROADCASTER_SUCCESS,
  GET_BROADCASTER_STATUS,
  GET_BROADCASTER_STATUS_FAIL,
  GET_BROADCASTER_STATUS_SUCCESS,
  ADD_NEW_BROADCASTER,
  ADD_BROADCASTER_SUCCESS,
  ADD_BROADCASTER_FAIL,
  UPDATE_BROADCASTER,
  UPDATE_BROADCASTER_SUCCESS,
  UPDATE_BROADCASTER_FAIL,
  UPDATE_BROADCASTER_CURRENT_PAGE,
} from "./actionTypes";

export const goToPage = (toPage) => ({
  type: UPDATE_BROADCASTER_CURRENT_PAGE,
  payload: Number(toPage),
});

export const getBroadCaster = () => ({
  type: GET_BROADCASTER,
});

export const getBroadCasterSuccess = (broadcasters) => {
  console.log("Received Broad Caster:", broadcasters);
  return {
    type: GET_BROADCASTER_SUCCESS,
    payload: broadcasters,
  };
};

export const getBroadCasterFail = (error) => ({
  type: GET_BROADCASTER_FAIL,
  payload: error,
});

export const getBroadCasterStatus = () => ({
  type: GET_BROADCASTER_STATUS,
});

export const getBroadCasterStatusSuccess = (broadcasterStatus) => {
  return {
    type: GET_BROADCASTER_STATUS_SUCCESS,
    payload: broadcasterStatus,
  };
};

export const getBroadCasterStatusFail = (error) => ({
  type: GET_BROADCASTER_STATUS_FAIL,
  payload: error,
});

export const addNewBroadCaster = (broadcasters) => ({
  type: ADD_NEW_BROADCASTER,
  payload: broadcasters,
});

export const addBroadCasterSuccess = (broadcasters) => ({
  type: ADD_BROADCASTER_SUCCESS,
  payload: broadcasters,
});

export const addBroadCasterFail = (error) => ({
  type: ADD_BROADCASTER_FAIL,
  payload: error,
});

export const updateBroadCaster = (broadcasters) => ({
  type: UPDATE_BROADCASTER,
  payload: broadcasters,
});

export const updateBroadCasterSuccess = (broadcasters) => ({
  type: UPDATE_BROADCASTER_SUCCESS,
  payload: broadcasters,
});

export const updateBroadCasterFail = (error) => ({
  type: UPDATE_BROADCASTER_FAIL,
  payload: error,
});