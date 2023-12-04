import {
  GET_NOTIFICATIONTEMPLATE,
  GET_NOTIFICATIONTEMPLATE_FAIL,
  GET_NOTIFICATIONTEMPLATE_SUCCESS,
  ADD_NEW_NOTIFICATIONTEMPLATE,
  ADD_NOTIFICATIONTEMPLATE_SUCCESS,
  ADD_NOTIFICATIONTEMPLATE_FAIL,
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

export const addNewNotificationTemplate = (notificationTemplate) => ({
  type: ADD_NEW_NOTIFICATIONTEMPLATE,
  payload: notificationTemplate,
});

export const addNotificationTemplateSuccess = (notificationTemplate) => ({
  type: ADD_NOTIFICATIONTEMPLATE_SUCCESS,
  payload: notificationTemplate,
});

export const addNotificationTemplateFail = (error) => ({
  type: ADD_NOTIFICATIONTEMPLATE_FAIL,
  payload: error,
});
