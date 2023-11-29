import { GET_NCF, GET_NCF_FAIL, GET_NCF_SUCCESS } from "./actionTypes";

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
