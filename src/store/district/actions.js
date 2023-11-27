import {
  GET_DISTRICT,
  GET_DISTRICT_FAIL,
  GET_DISTRICT_SUCCESS,
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