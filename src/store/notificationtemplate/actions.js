import {
  GET_NOTIFICATIONTEMPLATE,
  GET_NOTIFICATIONTEMPLATE_FAIL,
  GET_NOTIFICATIONTEMPLATE_SUCCESS,
} from "./actionTypes";

export const getNotificationTemplate = () => ({
  type: GET_NOTIFICATIONTEMPLATE,
});

export const getNotificationTemplateSuccess = (notificationTemplate) => {
  console.log("Received Notification Template:", notificationTemplate);
  return {
    type: GET_NOTIFICATIONTEMPLATE_SUCCESS,
    payload: notificationTemplate,
  };
};

export const getNotificationTemplateFail = (error) => ({
  type: GET_NOTIFICATIONTEMPLATE_FAIL,
  payload: error,
});