import {
  GET_LOCATION,
  GET_LOCATION_FAIL,
  GET_LOCATION_SUCCESS,
  ADD_LOCATION,
  ADD_LOCATION_SUCCESS,
  ADD_LOCATION_FAIL,
  UPDATE_LOCATION,
  UPDATE_LOCATION_SUCCESS,
  UPDATE_LOCATION_FAIL,
  GET_LCO_ONLOCATION,
  GET_LCO_ONLOCATION_SUCCESS,
  GET_LCO_ONLOCATION_FAIL,
} from "./actionTypes";

export const getLocation = () => ({
  type: GET_LOCATION,
});

export const getLocationSuccess = (location) => {
  return {
    type: GET_LOCATION_SUCCESS,
    payload: location,
  };
};

export const getLocationFail = (error) => ({
  type: GET_LOCATION_FAIL,
  payload: error,
});

export const addLocation = (location) => ({
  type: ADD_LOCATION,
  payload: location,
});

export const addLocationSuccess = (location) => ({
  type: ADD_LOCATION_SUCCESS,
  payload: location,
});

export const addLocationFail = (error) => ({
  type: ADD_LOCATION_FAIL,
  payload: error,
});

export const updateLocation = (location) => ({
  type: UPDATE_LOCATION,
  payload: location,
});

export const updateLocationSuccess = (location) => ({
  type: UPDATE_LOCATION_SUCCESS,
  payload: location,
});

export const updateLocationFail = (error) => ({
  type: UPDATE_LOCATION_FAIL,
  payload: error,
});
