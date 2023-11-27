import {
  GET_SCHEDULECUSTOMERNOTIFICATION,
  GET_SCHEDULECUSTOMERNOTIFICATION_FAIL,
  GET_SCHEDULECUSTOMERNOTIFICATION_SUCCESS,
} from "./actionTypes";

export const getScheduleCustomerNotification = () => ({
  type: GET_SCHEDULECUSTOMERNOTIFICATION,
});

export const getScheduleCustomerNotificationSuccess = (scheduleCustomerNotification) => {
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