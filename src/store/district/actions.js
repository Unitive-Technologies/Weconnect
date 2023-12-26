import {
  GET_DISTRICT,
  GET_DISTRICT_FAIL,
  GET_DISTRICT_SUCCESS,
  ADD_DISTRICT,
  ADD_DISTRICT_SUCCESS,
  ADD_DISTRICT_FAIL,
  GET_DISTRICT_STATUS,
  GET_DISTRICT_STATUS_SUCCESS,
  GET_DISTRICT_STATUS_FAIL,
  GET_DISTRICT_STATELIST,
  GET_DISTRICT_STATELIST_SUCCESS,
  GET_DISTRICT_STATELIST_FAIL,
} from "./actionTypes";

export const getDistrict = () => ({
  type: GET_DISTRICT,
});

export const getDistrictSuccess = (district) => {
  console.log("Received District:", district);
  return {
    type: GET_DISTRICT_SUCCESS,
    payload: district,
  };
};

export const getDistrictFail = (error) => ({
  type: GET_DISTRICT_FAIL,
  payload: error,
});

export const addDistrict = (district) => ({
  type: ADD_DISTRICT,
  payload: district,
});

export const addDistrictSuccess = (district) => ({
  type: ADD_DISTRICT_SUCCESS,
  payload: district,
});

export const addDistrictFail = (error) => ({
  type: ADD_DISTRICT_FAIL,
  payload: error,
});

export const getDistrictStatus = () => ({
  type: GET_DISTRICT_STATUS,
});

export const getDistrictStatusSuccess = (status) => ({
  type: GET_DISTRICT_STATUS_SUCCESS,
  payload: status,
});

export const getDistrictStatusFail = (error) => ({
  type: GET_DISTRICT_STATUS_FAIL,
  payload: error,
});

export const getDistrictStateList = () => ({
  type: GET_DISTRICT_STATELIST,
});

export const getDistrictStateListSuccess = (statelist) => ({
  type: GET_DISTRICT_STATELIST_SUCCESS,
  payload: statelist,
});

export const getDistrictStateListFail = (error) => ({
  type: GET_DISTRICT_STATELIST_FAIL,
  payload: error,
});
