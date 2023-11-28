import {
  GET_SCHEDULEDNOTIFICATION,
  GET_SCHEDULEDNOTIFICATION_FAIL,
  GET_SCHEDULEDNOTIFICATION_SUCCESS,
} from "./actionTypes";

export const getScheduledNotification = () => ({
  type: GET_SCHEDULEDNOTIFICATION,
});

export const getScheduledNotificationSuccess = (schedulednotification) => {
  console.log("Received scheduled notification List:", schedulednotification);
  return {
    type: GET_SCHEDULEDNOTIFICATION_SUCCESS,
    payload: schedulednotification,
  };
};

export const getScheduledNotificationFail = (error) => ({
  type: GET_SCHEDULEDNOTIFICATION_FAIL,
  payload: error,
});
