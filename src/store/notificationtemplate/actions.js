import {
  GET_NOTIFICATIONTEMPLATE,
  GET_NOTIFICATIONTEMPLATE_FAIL,
  GET_NOTIFICATIONTEMPLATE_SUCCESS,
  GET_NOTIFICATIONTEMPLATE_STATUS,
  GET_NOTIFICATIONTEMPLATE_STATUS_FAIL,
  GET_NOTIFICATIONTEMPLATE_STATUS_SUCCESS,
  GET_NOTIFICATIONTEMPLATE_TYPE,
  GET_NOTIFICATIONTEMPLATE_TYPE_FAIL,
  GET_NOTIFICATIONTEMPLATE_TYPE_SUCCESS,
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

export const getNotificationTemplateType = () => ({
  type: GET_NOTIFICATIONTEMPLATE_TYPE,
});

export const getNotificationTemplateTypeSuccess = (noTemplateType) => ({
  type: GET_NOTIFICATIONTEMPLATE_TYPE_SUCCESS,
  payload: noTemplateType,
});


export const getNotificationTemplateTypeFail = (error) => ({
  type: GET_NOTIFICATIONTEMPLATE_TYPE_FAIL,
  payload: error,
});

export const getNotificationTemplateStatus = () => ({
  type: GET_NOTIFICATIONTEMPLATE_STATUS,
});


export const getNotificationTemplateStatusSuccess = (noTemplateStatus) => ({
  type: GET_NOTIFICATIONTEMPLATE_STATUS_SUCCESS,
  payload: noTemplateStatus,
});

// export const getNotificationTemplateStatusSuccess = (noTemplateStatus) => {
//   console.log("Received Notification Template:", noTemplateStatus);
//   return {
//     type: GET_NOTIFICATIONTEMPLATE_STATUS_SUCCESS,
//     payload: noTemplateStatus,
//   };
// };

export const getNotificationTemplateStatusFail = (error) => ({
  type: GET_NOTIFICATIONTEMPLATE_STATUS_FAIL,
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

