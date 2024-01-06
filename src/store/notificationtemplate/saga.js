import { call, put, takeEvery } from "redux-saga/effects";

import {
  GET_NOTIFICATIONTEMPLATE,
  GET_NOTIFICATIONTEMPLATE_TYPE,
  GET_NOTIFICATIONTEMPLATE_STATUS,
  ADD_NEW_NOTIFICATIONTEMPLATE,
  UPDATE_NOTIFICATIONTEMPLATE,
} from "./actionTypes";

import {
  getNotificationTemplateSuccess,
  getNotificationTemplateFail,
  getNotificationTemplateTypeSuccess,
  getNotificationTemplateTypeFail,
  getNotificationTemplateStatusSuccess,
  getNotificationTemplateStatusFail,
  addNotificationTemplateFail,
  addNotificationTemplateSuccess,
  updateNotificationTemplateFail,
  updateNotificationTemplateSuccess,
} from "./actions";

//Include Both Helper File with needed methods
import {
  getNotificationTemplate,
  getNotificationTemplateType,
  getNotificationTemplateStatus,
  addNewNotificationTemplate,
  updateNotificationTemplate,
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

function* fetchNotificationTemplateStatus() {
  try {
    const response = yield call(getNotificationTemplateStatus);
    const notificationTemplateList =
      //   convertNotificationTemplateListObject(response);s
      yield put(getNotificationTemplateStatusSuccess(response.data));
    console.log("notifcation template status response data" + response.data);
  } catch (error) {
    console.error("Error fetching notification templates:", error);
    yield put(getNotificationTemplateStatusFail(error));
  }
}

function* fetchNotificationTemplateType() {
  try {
    const response = yield call(getNotificationTemplateType);
    const notificationTemplateList =
      //   convertNotificationTemplateListObject(response);s
      yield put(getNotificationTemplateTypeSuccess(response.data));
  } catch (error) {
    console.error("Error fetching notification templates:", error);
    yield put(getNotificationTemplateTypeFail(error));
  }
}

function* onAddNewNotificationTemplate({ payload: notificationTemplate }) {
  try {
    const response = yield call(
      addNewNotificationTemplate,
      notificationTemplate
    );
    yield put(addNotificationTemplateSuccess(response.data));
    // toast.success("Notification Template Added Successfully", {
    //   autoClose: 2000,
    // });
  } catch (error) {
    yield put(addNotificationTemplateFail(error));
    // toast.error("Notification Template Added Failed", { autoClose: 2000 });
  }
}

function* onUpdateNotificationTemplate({ payload: notificationTemplate }) {
  console.log(
    "notificationTemplate in onUpdate:" + JSON.stringify(notificationTemplate)
  );
  try {
    const response = yield call(
      updateNotificationTemplate,
      notificationTemplate,
      notificationTemplate.id
    );
    yield put(updateNotificationTemplateSuccess(response));
    console.log("update response:" + JSON.stringify(response));
    // toast.success("Designation Updated Successfully", { autoClose: 2000 });
  } catch (error) {
    yield put(updateNotificationTemplateFail(error));
    // toast.error("Designation Updated Failed", { autoClose: 2000 });
  }
}

function* notificationTemplateSaga() {
  yield takeEvery(GET_NOTIFICATIONTEMPLATE, fetchNotificationTemplate);
  yield takeEvery(GET_NOTIFICATIONTEMPLATE_TYPE, fetchNotificationTemplateType);
  yield takeEvery(
    GET_NOTIFICATIONTEMPLATE_STATUS,
    fetchNotificationTemplateStatus
  );
  yield takeEvery(ADD_NEW_NOTIFICATIONTEMPLATE, onAddNewNotificationTemplate);
  yield takeEvery(UPDATE_NOTIFICATIONTEMPLATE, onUpdateNotificationTemplate);
}

export default notificationTemplateSaga;
