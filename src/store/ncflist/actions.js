import {
  GET_NCF,
  GET_NCF_FAIL,
  GET_NCF_SUCCESS,
  ADD_NCF,
  ADD_NCF_SUCCESS,
  ADD_NCF_FAIL,
} from "./actionTypes";

export const getNcf = () => ({
  type: GET_NCF,
});

export const getNcfSuccess = (ncf) => {
  console.log("Received ncf:", ncf);
  return {
    type: GET_NCF_SUCCESS,
    payload: ncf,
  };
};

export const getNcfFail = (error) => ({
  type: GET_NCF_FAIL,
  payload: error,
});

export const addNcf = (ncf) => ({
  type: ADD_NCF,
  payload: ncf,
});

export const addNcfSuccess = (ncf) => ({
  type: ADD_NCF_SUCCESS,
  payload: ncf,
});

export const addNcfFail = (error) => ({
  type: ADD_NCF_FAIL,
  payload: error,
});
