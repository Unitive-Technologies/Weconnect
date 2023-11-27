import {
  GET_CITY,
  GET_CITY_FAIL,
  GET_CITY_SUCCESS,
} from "./actionTypes";

export const getCity = () => ({
  type: GET_CITY,
});

export const getCitySuccess = (city) => {
  console.log("Received City:", city);
  return {
    type: GET_CITY_SUCCESS,
    payload: city,
  };
};

export const getCityFail = (error) => ({
  type: GET_CITY_FAIL,
  payload: error,
});