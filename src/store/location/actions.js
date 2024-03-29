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
  // GET_SINGLE_LOCATION,
  // GET_SINGLE_LOCATION_SUCCESS,
  // GET_SINGLE_LOCATION_FAIL,
  UPDATE_LOCATION_CURRENT_PAGE,
} from "./actionTypes";

export const goToPage = (toPage) => ({
  type: UPDATE_LOCATION_CURRENT_PAGE,
  payload: Number(toPage),
});

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

export const getLcoOnLocation = () => ({
  type: GET_LCO_ONLOCATION,
});

export const getLcoOnLocationSuccess = (lcoonlocation) => ({
  type: GET_LCO_ONLOCATION_SUCCESS,
  payload: lcoonlocation,
});

export const getLcoOnLocationFail = (error) => ({
  type: GET_LCO_ONLOCATION_FAIL,
  payload: error,
});

// export const getSingleLocation = () => ({
//   type: GET_SINGLE_LOCATION,
// });

// export const getSingleLocationSuccess = (singlelocation) => {
//   return {
//     type: GET_SINGLE_LOCATION_SUCCESS,
//     payload: singlelocation,
//   };
// };

// export const getSingleLocationFail = (error) => ({
//   type: GET_SINGLE_LOCATION_FAIL,
//   payload: error,
// });
