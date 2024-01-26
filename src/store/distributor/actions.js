import {
  GET_DISTRIBUTORS,
  GET_DISTRIBUTORS_FAIL,
  GET_DISTRIBUTORS_SUCCESS,
  GET_DISTRIBUTORS_PHASE,
  GET_DISTRIBUTORS_PHASE_FAIL,
  GET_DISTRIBUTORS_PHASE_SUCCESS,
  GET_DISTRIBUTORS_STATUS,
  GET_DISTRIBUTORS_STATUS_FAIL,
  GET_DISTRIBUTORS_STATUS_SUCCESS,
  ADD_NEW_DISTRIBUTOR,
  ADD_DISTRIBUTORS_SUCCESS,
  ADD_DISTRIBUTORS_FAIL,
  UPDATE_DISTRIBUTOR,
  UPDATE_DISTRIBUTORS_SUCCESS,
  UPDATE_DISTRIBUTORS_FAIL,
  UPDATE_DISTRIBUTOR_CURRENT_PAGE,
} from "./actionTypes";

export const goToPage = (toPage) => ({
  type: UPDATE_DISTRIBUTOR_CURRENT_PAGE,
  payload: Number(toPage),
});

export const getDistributors = () => ({
  type: GET_DISTRIBUTORS,
});

export const getDistributorsSuccess = (distributors) => {
  // console.log("Received Distributors.. :", distributors);
  return {
    type: GET_DISTRIBUTORS_SUCCESS,
    payload: distributors,
  };
};

export const getDistributorsFail = (error) => ({
  type: GET_DISTRIBUTORS_FAIL,
  payload: error,
});

export const getDistributorsPhase = () => ({
  type: GET_DISTRIBUTORS_PHASE,
});

export const getDistributorsPhaseSuccess = (distributorsPhase) => {
  console.log("Received DistributorsPhase.. :", distributorsPhase);
  return {
    type: GET_DISTRIBUTORS_PHASE_SUCCESS,
    payload: distributorsPhase,
  };
};

export const getDistributorsPhaseFail = (error) => ({
  type: GET_DISTRIBUTORS_PHASE_FAIL,
  payload: error,
});

export const getDistributorsStatus = () => ({
  type: GET_DISTRIBUTORS_STATUS,
});

export const getDistributorsStatusSuccess = (distributorsStatus) => {
  console.log("Received DistributorsStatus.. :", distributorsStatus);
  return {
    type: GET_DISTRIBUTORS_STATUS_SUCCESS,
    payload: distributorsStatus,
  };
};

export const getDistributorsStatusFail = (error) => ({
  type: GET_DISTRIBUTORS_STATUS_FAIL,
  payload: error,
});

export const addNewDistributor = (distributor) => ({
  type: ADD_NEW_DISTRIBUTOR,
  payload: distributor,
});

export const addDistributorsSuccess = (distributor) => ({
  type: ADD_DISTRIBUTORS_SUCCESS,
  payload: distributor,
});

export const addDistributorsFail = (error) => ({
  type: ADD_DISTRIBUTORS_FAIL,
  payload: error,
});

export const updateDistributors = (distributor) => ({
  type: UPDATE_DISTRIBUTOR,
  payload: distributor,
});

export const updateDistributorsSuccess = (distributor) => ({
  type: UPDATE_DISTRIBUTORS_SUCCESS,
  payload: distributor,
});

export const updateDistributorsFail = (error) => ({
  type: UPDATE_DISTRIBUTORS_FAIL,
  payload: error,
});
