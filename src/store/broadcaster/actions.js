import {
  GET_BROADCASTER,
  GET_BROADCASTER_FAIL,
  GET_BROADCASTER_SUCCESS,
  ADD_NEW_BROADCASTER,
  ADD_BROADCASTER_SUCCESS,
  ADD_BROADCASTER_FAIL,
} from "./actionTypes";

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
