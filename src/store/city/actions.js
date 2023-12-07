import {
  GET_CITY,
  GET_CITY_FAIL,
  GET_CITY_SUCCESS,
  ADD_CITY,
  ADD_CITY_SUCCESS,
  ADD_CITY_FAIL,
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

export const addCity = (city) => ({
  type: ADD_CITY,
  payload: city,
});

export const addCitySuccess = (city) => ({
  type: ADD_CITY_SUCCESS,
  payload: city,
});

export const addCityFail = (error) => ({
  type: ADD_CITY_FAIL,
  payload: error,
});
