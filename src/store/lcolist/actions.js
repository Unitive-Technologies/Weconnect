import {
  GET_LCO,
  GET_LCO_FAIL,
  GET_LCO_SUCCESS,
  ADD_NEW_LCO,
  ADD_LCO_SUCCESS,
  ADD_LCO_FAIL,
  UPDATE_LCO,
  UPDATE_LCO_SUCCESS,
  UPDATE_LCO_FAIL,
  UPDATE_LCO_CURRENT_PAGE,
} from "./actionTypes";

export const goToPage = (toPage) => ({
  type: UPDATE_LCO_CURRENT_PAGE,
  payload: Number(toPage),
});

export const getLco = () => ({
  type: GET_LCO,
});

export const getLcoSuccess = (lco) => {
  // console.log("Received LCO List:", lco);
  return {
    type: GET_LCO_SUCCESS,
    payload: lco,
  };
};

export const getLcoFail = (error) => ({
  type: GET_LCO_FAIL,
  payload: error,
});

export const addNewLco = (lco) => ({
  type: ADD_NEW_LCO,
  payload: lco,
});

export const addLcoSuccess = (lco) => ({
  type: ADD_LCO_SUCCESS,
  payload: lco,
});

export const addLcoFail = (error) => ({
  type: ADD_LCO_FAIL,
  payload: error,
});

export const updateLco = (lco) => ({
  type: UPDATE_LCO,
  payload: lco,
});

export const updateLcoSuccess = (lco) => ({
  type: UPDATE_LCO_SUCCESS,
  payload: lco,
});

export const updateLcoFail = (error) => ({
  type: UPDATE_LCO_FAIL,
  payload: error,
});
