import {
  GET_SCHEDULECUSTOMERNOTIFICATION,
  GET_SCHEDULECUSTOMERNOTIFICATION_FAIL,
  GET_SCHEDULECUSTOMERNOTIFICATION_SUCCESS,
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
