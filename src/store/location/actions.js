import {
  GET_LOCATION,
  GET_LOCATION_FAIL,
  GET_LOCATION_SUCCESS,
} from "./actionTypes";

export const getLocation = () => ({
  type: GET_LOCATION,
});

export const getLocationSuccess = (location) => {
  console.log("Received Location:", location);
  return {
    type: GET_LOCATION_SUCCESS,
    payload: location,
  };
};

export const getLocationFail = (error) => ({
  type: GET_LOCATION_FAIL,
  payload: error,
});