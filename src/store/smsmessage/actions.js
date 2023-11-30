import {
  GET_SMSMESSAGETEMPLIST,
  GET_SMSMESSAGETEMPLIST_FAIL,
  GET_SMSMESSAGETEMPLIST_SUCCESS,
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
