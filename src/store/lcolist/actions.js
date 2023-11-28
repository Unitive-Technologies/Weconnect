import { GET_LCO, GET_LCO_FAIL, GET_LCO_SUCCESS } from "./actionTypes";

export const getLco = () => ({
  type: GET_LCO,
});

export const getLcoSuccess = (lco) => {
  console.log("Received LCO List:", lco);
  return {
    type: GET_LCO_SUCCESS,
    payload: lco,
  };
};

export const getLcoFail = (error) => ({
  type: GET_LCO_FAIL,
  payload: error,
});
