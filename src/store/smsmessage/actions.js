import {
  GET_SMSMESSAGETEMPLIST,
  GET_SMSMESSAGETEMPLIST_FAIL,
  GET_SMSMESSAGETEMPLIST_SUCCESS,
  ADD_NEW_SMSMESSAGETEMPLIST,
  ADD_SMSMESSAGETEMPLIST_SUCCESS,
  ADD_SMSMESSAGETEMPLIST_FAIL,
} from "./actionTypes";

export const getSMSMessageTempList = () => ({
  type: GET_SMSMESSAGETEMPLIST,
});

export const getSMSMessageTempListSuccess = (smsmessagetemp) => {
  console.log("Received SMS Msg Temp List:", smsmessagetemp);
  return {
    type: GET_SMSMESSAGETEMPLIST_SUCCESS,
    payload: smsmessagetemp,
  };
};

export const getSMSMessageTempListFail = (error) => ({
  type: GET_SMSMESSAGETEMPLIST_FAIL,
  payload: error,
});

export const addNewSMSMessageTempList = (
  smsmessagetemp
) => ({
  type: ADD_NEW_SMSMESSAGETEMPLIST,
  payload: smsmessagetemp,
});

export const addSMSMessageTempListSuccess = (
  smsmessagetemp
) => ({
  type: ADD_SMSMESSAGETEMPLIST_SUCCESS,
  payload: smsmessagetemp,
});

export const addSMSMessageTempListFail = (error) => ({
  type: ADD_SMSMESSAGETEMPLIST_FAIL,
  payload: error,
});