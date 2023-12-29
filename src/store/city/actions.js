import {
  GET_CITY,
  GET_CITY_FAIL,
  GET_CITY_SUCCESS,
  ADD_CITY,
  ADD_CITY_SUCCESS,
  ADD_CITY_FAIL,
  GET_DISTRICT_BYSTATEID,
  GET_DISTRICT_BYSTATEID_SUCCESS,
  GET_DISTRICT_BYSTATEID_FAIL,
  UPDATE_CITY,
  UPDATE_CITY_SUCCESS,
  UPDATE_CITY_FAIL,
} from "./actionTypes";

export const getCity = () => ({
  type: GET_CITY,
});

export const getCitySuccess = (city) => {
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

export const getDistrictByStateid = () => ({
  type: GET_DISTRICT_BYSTATEID,
});

export const getDistrictByStateidSuccess = (districtlist) => ({
  type: GET_DISTRICT_BYSTATEID_SUCCESS,
  payload: districtlist,
});

export const getDistrictByStateidFail = (error) => ({
  type: GET_DISTRICT_BYSTATEID_FAIL,
  payload: error,
});

export const updateCity = (city) => ({
  type: UPDATE_CITY,
  payload: city,
});

export const updateCitySuccess = (city) => ({
  type: UPDATE_CITY_SUCCESS,
  payload: city,
});

export const updateCityFail = (error) => ({
  type: UPDATE_CITY_FAIL,
  payload: error,
});
