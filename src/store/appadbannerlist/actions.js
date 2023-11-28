import {
  GET_APPADBANNER,
  GET_APPADBANNER_FAIL,
  GET_APPADBANNER_SUCCESS,
} from "./actionTypes";

export const getAppAdBanner = () => ({
  type: GET_APPADBANNER,
});

export const getAppAdBannerSuccess = (appadbanner) => {
  console.log("Received Notification Template:", appadbanner);
  return {
    type: GET_APPADBANNER_SUCCESS,
    payload: appadbanner,
  };
};

export const getAppAdBannerFail = (error) => ({
  type: GET_APPADBANNER_FAIL,
  payload: error,
});
