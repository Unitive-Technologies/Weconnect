import {
  GET_SCHEDULECUSTOMERNOTIFICATION,
  GET_SCHEDULECUSTOMERNOTIFICATION_FAIL,
  GET_SCHEDULECUSTOMERNOTIFICATION_SUCCESS,
  GET_SCHEDULECUSTOMERNOTIFICATION_TYPE,
  GET_SCHEDULECUSTOMERNOTIFICATION_TYPE_FAIL,
  GET_SCHEDULECUSTOMERNOTIFICATION_TYPE_SUCCESS,
  GET_SCHEDULECUSTOMERNOTIFICATION_OSD,
  GET_SCHEDULECUSTOMERNOTIFICATION_OSD_FAIL,
  GET_SCHEDULECUSTOMERNOTIFICATION_OSD_SUCCESS,
  GET_SCHEDULECUSTOMERNOTIFICATION_BMAIL,
  GET_SCHEDULECUSTOMERNOTIFICATION_BMAIL_FAIL,
  GET_SCHEDULECUSTOMERNOTIFICATION_BMAIL_SUCCESS,
  GET_SCHEDULECUSTOMERNOTIFICATION_SMS,
  GET_SCHEDULECUSTOMERNOTIFICATION_SMS_FAIL,
  GET_SCHEDULECUSTOMERNOTIFICATION_SMS_SUCCESS,
  GET_SCHEDULECUSTOMERNOTIFICATION_STATUS,
  GET_SCHEDULECUSTOMERNOTIFICATION_STATUS_FAIL,
  GET_SCHEDULECUSTOMERNOTIFICATION_STATUS_SUCCESS,
  ADD_NEW_SCHEDULECUSTOMERNOTIFICATION,
  ADD_SCHEDULECUSTOMERNOTIFICATION_SUCCESS,
  ADD_SCHEDULECUSTOMERNOTIFICATION_FAIL,
} from "./actionTypes";

export const getScheduleCustomerNotification = () => ({
  type: GET_SCHEDULECUSTOMERNOTIFICATION,
});

export const getScheduleCustomerNotificationSuccess = (
  scheduleCustomerNotification
) => {
  console.log("Received Customer Users:", scheduleCustomerNotification);
  return {
    type: GET_SCHEDULECUSTOMERNOTIFICATION_SUCCESS,
    payload: scheduleCustomerNotification,
  };
};

export const getScheduleCustomerNotificationFail = (error) => ({
  type: GET_SCHEDULECUSTOMERNOTIFICATION_FAIL,
  payload: error,
});

export const addNewScheduleCustomerNotification = (
  scheduleCustomerNotification
) => ({
  type: ADD_NEW_SCHEDULECUSTOMERNOTIFICATION,
  payload: scheduleCustomerNotification,
});

export const addScheduleCustomerNotificationSuccess = (
  scheduleCustomerNotification
) => ({
  type: ADD_SCHEDULECUSTOMERNOTIFICATION_SUCCESS,
  payload: scheduleCustomerNotification,
});

export const addScheduleCustomerNotificationFail = (error) => ({
  type: ADD_SCHEDULECUSTOMERNOTIFICATION_FAIL,
  payload: error,
});

export const getScheduleCustomerNotificationType = () => ({
  type: GET_SCHEDULECUSTOMERNOTIFICATION_TYPE,
});

export const getScheduleCustomerNotificationTypeSuccess = (SchCusNotType) => {
  // console.log("Received Designation:", designation);
  return {
    type: GET_SCHEDULECUSTOMERNOTIFICATION_TYPE_SUCCESS,
    payload: SchCusNotType,
  };
};

export const getScheduleCustomerNotificationTypeFail = (error) => ({
  type: GET_SCHEDULECUSTOMERNOTIFICATION_TYPE_FAIL,
  payload: error,
});

export const getScheduleCustomerNotificationOSD = () => ({
  type: GET_SCHEDULECUSTOMERNOTIFICATION_OSD,
});

export const getScheduleCustomerNotificationOSDSuccess = (SchCusNotOSD) => {
  // console.log("Received Designation:", designation);
  return {
    type: GET_SCHEDULECUSTOMERNOTIFICATION_OSD_SUCCESS,
    payload: SchCusNotOSD,
  };
};

export const getScheduleCustomerNotificationOSDFail = (error) => ({
  type: GET_SCHEDULECUSTOMERNOTIFICATION_OSD_FAIL,
  payload: error,
});


export const getScheduleCustomerNotificationBmail = () => ({
  type: GET_SCHEDULECUSTOMERNOTIFICATION_BMAIL,
});

export const getScheduleCustomerNotificationBmailSuccess = (SchCusNotBmail) => {
  // console.log("Received Designation:", designation);
  return {
    type: GET_SCHEDULECUSTOMERNOTIFICATION_BMAIL_SUCCESS,
    payload: SchCusNotBmail,
  };
};

export const getScheduleCustomerNotificationBmailFail = (error) => ({
  type: GET_SCHEDULECUSTOMERNOTIFICATION_BMAIL_FAIL,
  payload: error,
});

export const getScheduleCustomerNotificationSMS = () => ({
  type: GET_SCHEDULECUSTOMERNOTIFICATION_SMS,
});

export const getScheduleCustomerNotificationSMSSuccess = (SchCusNotSMS) => {
  // console.log("Received Designation:", designation);
  return {
    type: GET_SCHEDULECUSTOMERNOTIFICATION_SMS_SUCCESS,
    payload: SchCusNotSMS,
  };
};

export const getScheduleCustomerNotificationSMSFail = (error) => ({
  type: GET_SCHEDULECUSTOMERNOTIFICATION_SMS_FAIL,
  payload: error,
});

export const getScheduleCustomerNotificationStatus = () => ({
  type: GET_SCHEDULECUSTOMERNOTIFICATION_STATUS,
});

export const getScheduleCustomerNotificationStatusSuccess = (SchCusNotStatus) => {
  // console.log("Received Designation:", designation);
  return {
    type: GET_SCHEDULECUSTOMERNOTIFICATION_STATUS_SUCCESS,
    payload: SchCusNotStatus,
  };
};

export const getScheduleCustomerNotificationStatusFail = (error) => ({
  type: GET_SCHEDULECUSTOMERNOTIFICATION_STATUS_FAIL,
  payload: error,
});