import {
  GET_DISTRICT,
  GET_DISTRICT_FAIL,
  GET_DISTRICT_SUCCESS,
  ADD_DISTRICT,
  ADD_DISTRICT_SUCCESS,
  ADD_DISTRICT_FAIL,
  GET_ADMINISTRATIVEDIVISION_STATUS,
  GET_ADMINISTRATIVEDIVISION_STATUS_SUCCESS,
  GET_ADMINISTRATIVEDIVISION_STATUS_FAIL,
  GET_DISTRICT_STATELIST,
  GET_DISTRICT_STATELIST_SUCCESS,
  GET_DISTRICT_STATELIST_FAIL,
  UPDATE_DISTRICT,
  UPDATE_DISTRICT_SUCCESS,
  UPDATE_DISTRICT_FAIL,
} from "./actionTypes";

export const getDistrict = () => ({
  type: GET_DISTRICT,
});

export const getDistrictSuccess = (district) => {
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

export const getAdministrativeDivisionStatus = () => ({
  type: GET_ADMINISTRATIVEDIVISION_STATUS,
});

export const getAdministrativeDivisionStatusSuccess = (status) => ({
  type: GET_ADMINISTRATIVEDIVISION_STATUS_SUCCESS,
  payload: status,
});

export const getAdministrativeDivisionStatusFail = (error) => ({
  type: GET_ADMINISTRATIVEDIVISION_STATUS_FAIL,
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

export const updateDistrict = (district) => ({
  type: UPDATE_DISTRICT,
  payload: district,
});

export const updateDistrictSuccess = (district) => ({
  type: UPDATE_DISTRICT_SUCCESS,
  payload: district,
});

export const updateDistrictFail = (error) => ({
  type: UPDATE_DISTRICT_FAIL,
  payload: error,
});
