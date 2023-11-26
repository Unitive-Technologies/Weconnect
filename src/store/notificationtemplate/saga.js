import { call, put, takeEvery } from "redux-saga/effects";

import { GET_NOTIFICATIONTEMPLATE } from "./actionTypes";

import { getNotificationTemplateSuccess, getNotificationTemplateFail } from "./actions";

//Include Both Helper File with needed methods
import { getNotificationTemplate } from "../../helpers/fakebackend_helper";

const convertNotificationTemplateListObject = (notificationTemplateList) => {
  // Notification Template has more data than what we need, we need to convert each of the Notification Template user object in the list with needed colums of the table
  return notificationTemplateList.map((notificationTemplate) => {
    return {
      ...notificationTemplate,
      id: notificationTemplate.id,
      msg_head: notificationTemplate.msg_head,
      msg_content: notificationTemplate.msg_content,
      msg_type: notificationTemplate.msg_type,
      msg_fontsize: notificationTemplate.msg_fontsize,
      msg_fontcolor: notificationTemplate.msg_fontcolor,
      msg_fontbackgroundcolor: notificationTemplate.msg_fontbackgroundcolor,
      msg_fontfamily: notificationTemplate.msg_fontfamily,
      status:
        notificationTemplate.status === 1
          ? "ACTIVE"
          : notificationTemplate.status === 0
            ? "INACTIVE"
            : "BLOCKED",
      created_at: notificationTemplate.created_at,
      created_by: notificationTemplate.created_by,
    };
  });
};

function* fetchNotificationTemplate() {
  try {
    const response = yield call(getNotificationTemplate);
    const notificationTemplateList = convertNotificationTemplateListObject(response);
    yield put(getNotificationTemplateSuccess(notificationTemplateList));
  } catch (error) {
    console.error("Error fetching notification templates:", error);
    yield put(getNotificationTemplateFail(error));
  }
}


function* notificationTemplateSaga() {
  yield takeEvery(GET_NOTIFICATIONTEMPLATE, fetchNotificationTemplate);
}

export default notificationTemplateSaga;
