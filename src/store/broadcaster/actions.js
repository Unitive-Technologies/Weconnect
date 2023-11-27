import {
  GET_BROADCASTER,
  GET_BROADCASTER_FAIL,
  GET_BROADCASTER_SUCCESS,
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
