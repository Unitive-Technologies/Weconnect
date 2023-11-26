import {
  GET_CUSTOMERUSERS,
  GET_CUSTOMERUSERS_FAIL,
  GET_CUSTOMERUSERS_SUCCESS,
} from "./actionTypes";

export const getNotificationTemplate = () => ({
  type: GET_CUSTOMERUSERS,
});

export const getCustomerUsersSuccess = (notificationTemplate) => {
  console.log("Received Notification Template:", notificationTemplate);
  return {
    type: GET_CUSTOMERUSERS_SUCCESS,
    payload: notificationTemplate,
  };
};

export const getNotificationTemplateFail = (error) => ({
  type: GET_CUSTOMERUSERS_FAIL,
  payload: error,
});