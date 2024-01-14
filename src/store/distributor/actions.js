import {
  GET_DISTRIBUTORS,
  GET_DISTRIBUTORS_FAIL,
  GET_DISTRIBUTORS_SUCCESS,
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
  console.log("Received Distributors.. :", distributors);
  return {
    type: GET_DISTRIBUTORS_SUCCESS,
    payload: distributors,
  };
};

export const getDistributorsFail = (error) => ({
  type: GET_DISTRIBUTORS_FAIL,
  payload: error,
});

export const addNewDistributor = (distributors) => ({
  type: ADD_NEW_DISTRIBUTOR,
  payload: distributors,
});

export const addDistributorsSuccess = (distributors) => ({
  type: ADD_DISTRIBUTORS_SUCCESS,
  payload: distributors,
});

export const addDistributorsFail = (error) => ({
  type: ADD_DISTRIBUTORS_FAIL,
  payload: error,
});

export const updateDistributors = (distributors) => ({
  type: UPDATE_DISTRIBUTOR,
  payload: distributors,
});

export const updateDistributorsSuccess = (distributors) => ({
  type: UPDATE_DISTRIBUTORS_SUCCESS,
  payload: distributors,
});

export const updateDistributorsFail = (error) => ({
  type: UPDATE_DISTRIBUTORS_FAIL,
  payload: error,
});
