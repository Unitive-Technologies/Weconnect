import { call, put, takeEvery } from "redux-saga/effects";

import {
  GET_NOTIFICATIONTEMPLATE,
  ADD_NEW_NOTIFICATIONTEMPLATE,
} from "./actionTypes";

import {
  getNotificationTemplateSuccess,
  getNotificationTemplateFail,
  addNotificationTemplateFail,
  addNotificationTemplateSuccess,
} from "./actions";

//Include Both Helper File with needed methods
import {
  getNotificationTemplate,
  addNewNotificationTemplate,
} from "../../helpers/fakebackend_helper";

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
    const notificationTemplateList =
      //   convertNotificationTemplateListObject(response);s
      yield put(getNotificationTemplateSuccess(response.data));
  } catch (error) {
    console.error("Error fetching notification templates:", error);
    yield put(getNotificationTemplateFail(error));
  }
}

function* onAddNewNotificationTemplate({ payload: notificationTemplate }) {
  try {
    const response = yield call(
      addNewNotificationTemplate,
      notificationTemplate
    );

    yield put(addNotificationTemplateSuccess(response.data));
    toast.success("Notification Template Added Successfully", {
      autoClose: 2000,
    });
  } catch (error) {
    yield put(addNotificationTemplateFail(error));
    toast.error("Notification Template Added Failed", { autoClose: 2000 });
  }
}

function* notificationTemplateSaga() {
  yield takeEvery(GET_NOTIFICATIONTEMPLATE, fetchNotificationTemplate);
  yield takeEvery(ADD_NEW_NOTIFICATIONTEMPLATE, onAddNewNotificationTemplate);
}

export default notificationTemplateSaga;
