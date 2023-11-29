import {
  GET_LOCALCHANNELNUMBER,
  GET_LOCALCHANNELNUMBER_FAIL,
  GET_LOCALCHANNELNUMBER_SUCCESS,
} from "./actionTypes";

export const getLocalChannelNumber = () => ({
  type: GET_LOCALCHANNELNUMBER,
});

export const getLocalChannelNumberSuccess = (localChannelNumber) => {
  console.log("Received Local Channel Number:", localChannelNumber);
  return {
    type: GET_LOCALCHANNELNUMBER_SUCCESS,
    payload: localChannelNumber,
  };
};

export const getLocalChannelNumberFail = (error) => ({
  type: GET_LOCALCHANNELNUMBER_FAIL,
  payload: error,
});