import {
  GET_REGIONALOFFICE,
  GET_REGIONALOFFICE_FAIL,
  GET_REGIONALOFFICE_SUCCESS,
} from "./actionTypes";

export const getRegionalOffice = () => ({
  type: GET_REGIONALOFFICE,
});

export const getRegionalOfficeSuccess = (regionalOffice) => {
  console.log("Received Notification Template:", regionalOffice);
  return {
    type: GET_REGIONALOFFICE_SUCCESS,
    payload: regionalOffice,
  };
};

export const getRegionalOfficeFail = (error) => ({
  type: GET_REGIONALOFFICE_FAIL,
  payload: error,
});
