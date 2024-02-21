
import {
  GET_SMSMESSAGETEMPLIST,
  GET_SMSMESSAGETEMPLIST_FAIL,
  GET_SMSMESSAGETEMPLIST_SUCCESS,
  ADD_NEW_SMSMESSAGETEMPLIST,
  ADD_SMSMESSAGETEMPLIST_SUCCESS,
  ADD_SMSMESSAGETEMPLIST_FAIL,
  GET_SMSMESSAGETEMPLIST_STATUS,
  GET_SMSMESSAGETEMPLIST_STATUS_FAIL,
  GET_SMSMESSAGETEMPLIST_STATUS_SUCCESS,
  GET_SMSMESSAGETEMPLIST_SUBCATEGORY,
  GET_SMSMESSAGETEMPLIST_SUBCATEGORY_FAIL,
  GET_SMSMESSAGETEMPLIST_SUBCATEGORY_SUCCESS,
  GET_SMSMESSAGETEMPLIST_CATEGORY,
  GET_SMSMESSAGETEMPLIST_CATEGORY_FAIL,
  GET_SMSMESSAGETEMPLIST_CATEGORY_SUCCESS,
  GET_SMSMESSAGETEMPLIST_SENDER,
  GET_SMSMESSAGETEMPLIST_SENDER_FAIL,
  GET_SMSMESSAGETEMPLIST_SENDER_SUCCESS,
  UPDATE_SMSMESSAGETEMPLIST,
  UPDATE_SMSMESSAGETEMPLIST_FAIL,
  UPDATE_SMSMESSAGETEMPLIST_SUCCESS,
  UPDATE_SMSMESSAGETEMPLIST_CURRENT_PAGE,
} from "./actionTypes";

export const goToPage = (toPage) => ({
  type: UPDATE_SMSMESSAGETEMPLIST_CURRENT_PAGE,
  payload: Number(toPage),
});


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

export const updateSMSMessageTempList = (smsmessagetemp) => ({
  type: UPDATE_SMSMESSAGETEMPLIST,
  payload: smsmessagetemp,
});

export const updateSMSMessageTempListSuccess = (smsmessagetemp) => ({
  type: UPDATE_SMSMESSAGETEMPLIST_SUCCESS,
  payload: smsmessagetemp,
});

export const updateSMSMessageTempListFail = (error) => ({
  type: UPDATE_SMSMESSAGETEMPLIST_FAIL,
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

export const getSMSMessageTempListStatus = () => ({
  type: GET_SMSMESSAGETEMPLIST_STATUS,
});

export const getSMSMessageTempListStatusSuccess = (smsmessagetempStatus) => {
  console.log("Received SMS message temp status:", smsmessagetempStatus);
  return {
    type: GET_SMSMESSAGETEMPLIST_STATUS_SUCCESS,
    payload: smsmessagetempStatus,
  };
};

export const getSMSMessageTempListStatusFail = (error) => ({
  type: GET_SMSMESSAGETEMPLIST_STATUS_FAIL,
  payload: error,
});

export const getSMSMessageTempListSubcategory = (cat_id) => ({
  type: GET_SMSMESSAGETEMPLIST_SUBCATEGORY,
  payload: cat_id,
});

export const getSMSMessageTempListSubcategorySuccess = (smsmessagetempSubcategory) => {
  console.log("Received SMS message temp subcategory:", smsmessagetempSubcategory);
  return {
    type: GET_SMSMESSAGETEMPLIST_SUBCATEGORY_SUCCESS,
    payload: smsmessagetempSubcategory,
  };
};

export const getSMSMessageTempListSubcategoryFail = (error) => ({
  type: GET_SMSMESSAGETEMPLIST_SUBCATEGORY_FAIL,
  payload: error,
});

export const getSMSMessageTempListCategory = () => ({
  type: GET_SMSMESSAGETEMPLIST_CATEGORY,
});

export const getSMSMessageTempListCategorySuccess = (smsmessagetempCategory) => {
  console.log("Received SMS message temp subcategory:", smsmessagetempCategory);
  return {
    type: GET_SMSMESSAGETEMPLIST_CATEGORY_SUCCESS,
    payload: smsmessagetempCategory,
  };
};

export const getSMSMessageTempListCategoryFail = (error) => ({
  type: GET_SMSMESSAGETEMPLIST_CATEGORY_FAIL,
  payload: error,
});

export const getSMSMessageTempListSender = () => ({
  type: GET_SMSMESSAGETEMPLIST_SENDER,
});

export const getSMSMessageTempListSenderSuccess = (smsmessagetempSender) => {
  console.log("Received SMS message temp Sender:", smsmessagetempSender);
  return {
    type: GET_SMSMESSAGETEMPLIST_SENDER_SUCCESS,
    payload: smsmessagetempSender,
  };
};

export const getSMSMessageTempListSenderFail = (error) => ({
  type: GET_SMSMESSAGETEMPLIST_SENDER_FAIL,
  payload: error,
});
