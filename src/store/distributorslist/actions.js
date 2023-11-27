import {
  GET_DISTRIBUTORS,
  GET_DISTRIBUTORS_FAIL,
  GET_DISTRIBUTORS_SUCCESS,
} from "./actionTypes";

export const getDistributors = () => ({
  type: GET_DISTRIBUTORS,
});

export const getDistributorsSuccess = (distributors) => {
  console.log("Received Notification Template:", distributors);
  return {
    type: GET_DISTRIBUTORS_SUCCESS,
    payload: distributors,
  };
};

export const getDistributorsFail = (error) => ({
  type: GET_DISTRIBUTORS_FAIL,
  payload: error,
});
