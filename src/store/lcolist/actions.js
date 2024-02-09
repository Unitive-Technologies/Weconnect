import {
  GET_LCO,
  GET_LCO_FAIL,
  GET_LCO_SUCCESS,
  GET_LCO_BILLEDBY,
  GET_LCO_BILLEDBY_FAIL,
  GET_LCO_BILLEDBY_SUCCESS,
  GET_LCO_STATUS,
  GET_LCO_STATUS_FAIL,
  GET_LCO_STATUS_SUCCESS,
  GET_LCO_PHASE,
  GET_LCO_PHASE_FAIL,
  GET_LCO_PHASE_SUCCESS,
  GET_LCO_STATES,
  GET_LCO_STATES_FAIL,
  GET_LCO_STATES_SUCCESS,
  GET_LCO_CUSTOMERPORTAL,
  GET_LCO_CUSTOMERPORTAL_FAIL,
  GET_LCO_CUSTOMERPORTAL_SUCCESS,
  GET_LCO_PARENTDISTRIBUTOR,
  GET_LCO_PARENTDISTRIBUTOR_FAIL,
  GET_LCO_PARENTDISTRIBUTOR_SUCCESS,
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

export const getLcoBilledby = () => ({
  type: GET_LCO_BILLEDBY,
});

export const getLcoBilledbySuccess = (lco) => {
  // console.log("Received LCO List:", lco);
  return {
    type: GET_LCO_BILLEDBY_SUCCESS,
    payload: lco,
  };
};

export const getLcoBilledbyFail = (error) => ({
  type: GET_LCO_BILLEDBY_FAIL,
  payload: error,
});

export const getLcoStatus = () => ({
  type: GET_LCO_STATUS,
});

export const getLcoStatusSuccess = (lco) => {
  // console.log("Received LCO List:", lco);
  return {
    type: GET_LCO_STATUS_SUCCESS,
    payload: lco,
  };
};

export const getLcoStatusFail = (error) => ({
  type: GET_LCO_STATUS_FAIL,
  payload: error,
});

export const getLcoPhase = () => ({
  type: GET_LCO_PHASE,
});

export const getLcoPhaseSuccess = (lco) => {
  // console.log("Received LCO List:", lco);
  return {
    type: GET_LCO_PHASE_SUCCESS,
    payload: lco,
  };
};

export const getLcoPhaseFail = (error) => ({
  type: GET_LCO_PHASE_FAIL,
  payload: error,
});

export const getLcoStates = () => ({
  type: GET_LCO_STATES,
});

export const getLcoStatesSuccess = (lco) => {
  // console.log("Received LCO List:", lco);
  return {
    type: GET_LCO_STATES_SUCCESS,
    payload: lco,
  };
};

export const getLcoStatesFail = (error) => ({
  type: GET_LCO_STATES_FAIL,
  payload: error,
});

export const getLcoCustomerPortal = () => ({
  type: GET_LCO_CUSTOMERPORTAL,
});

export const getLcoCustomerPortalSuccess = (lco) => {
  // console.log("Received LCO List:", lco);
  return {
    type: GET_LCO_CUSTOMERPORTAL_SUCCESS,
    payload: lco,
  };
};

export const getLcoCustomerPortalFail = (error) => ({
  type: GET_LCO_CUSTOMERPORTAL_FAIL,
  payload: error,
});

export const getLcoParentDistributor = () => ({
  type: GET_LCO_PARENTDISTRIBUTOR,
});

export const getLcoParentDistributorSuccess = (lco) => {
  // console.log("Received LCO List:", lco);
  return {
    type: GET_LCO_PARENTDISTRIBUTOR_SUCCESS,
    payload: lco,
  };
};

export const getLcoParentDistributorFail = (error) => ({
  type: GET_LCO_PARENTDISTRIBUTOR_FAIL,
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
