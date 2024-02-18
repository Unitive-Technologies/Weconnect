import { call, put, takeEvery } from "redux-saga/effects";

import {
  GET_SCHEDULECUSTOMERNOTIFICATION,
  GET_SCHEDULECUSTOMERNOTIFICATION_STATUS,
  GET_SCHEDULECUSTOMERNOTIFICATION_TYPE,
  GET_SCHEDULECUSTOMERNOTIFICATION_SMS,
  GET_SCHEDULECUSTOMERNOTIFICATION_OSD,
  GET_SCHEDULECUSTOMERNOTIFICATION_BMAIL,
  ADD_NEW_SCHEDULECUSTOMERNOTIFICATION,
} from "./actionTypes";

import {
  getScheduleCustomerNotificationSuccess,
  getScheduleCustomerNotificationFail,
  getScheduleCustomerNotificationStatusFail,
  getScheduleCustomerNotificationStatusSuccess,
  getScheduleCustomerNotificationTypeFail,
  getScheduleCustomerNotificationTypeSuccess,
  getScheduleCustomerNotificationSMSFail,
  getScheduleCustomerNotificationSMSSuccess,
  getScheduleCustomerNotificationBmailFail,
  getScheduleCustomerNotificationBmailSuccess,
  getScheduleCustomerNotificationOSDFail,
  getScheduleCustomerNotificationOSDSuccess,
  addScheduleCustomerNotificationSuccess,
  addScheduleCustomerNotificationFail,
} from "./actions";

//Include Both Helper File with needed methods
import {
  getScheduleCustomerNotification,
  getScheduleCustomerNotificationStatus,
  getScheduleCustomerNotificationType,
  getScheduleCustomerNotificationSMS,
  getScheduleCustomerNotificationOSD,
  getScheduleCustomerNotificationBmail,
  addNewScheduleCustomerNotification,
} from "../../helpers/backend_helper";
import { toast } from "react-toastify";

const convertScheduleCustomerNotificationListObject = (
  scheduleCustomerNotificationList
) => {
  // Schedule Customer Notification list has more data than what we need, we need to convert each of the customer user object in the list with needed colums of the table
  return scheduleCustomerNotificationList.map(
    (scheduleCustomerNotification) => {
      return {
        ...scheduleCustomerNotification,
        id: scheduleCustomerNotification.id,
        name: scheduleCustomerNotification.name,
        type_lbl: scheduleCustomerNotification.type_lbl,
        schedule_days: scheduleCustomerNotification.schedule_days,
        osd_template_id_lbl: scheduleCustomerNotification.osd_template_id_lbl,
        osd_configuration_id_lbl:
          scheduleCustomerNotification.osd_configuration_id_lbl,
        bmail_template_id_lbl:
          scheduleCustomerNotification.bmail_template_id_lbl,
        sms_template_id_lbl: scheduleCustomerNotification.sms_template_id_lbl,
        start_date: scheduleCustomerNotification.start_date,
        end_date: scheduleCustomerNotification.end_date,
        description: scheduleCustomerNotification.description,
        status_lbl:
          scheduleCustomerNotification.status_lbl === 1
            ? "ACTIVE"
            : scheduleCustomerNotification.status_lbl === 0
            ? "INACTIVE"
            : "BLOCKED",
        created_at: scheduleCustomerNotification.created_at,
        created_by_lbl: scheduleCustomerNotification.created_by_lbl,
      };
    }
  );
};

function* fetchScheduleCustomerNotification() {
  try {
    const response = yield call(getScheduleCustomerNotification);
    console.log("response:" + JSON.stringify(response));
    // const scheduleCustomerNotificationList = convertScheduleCustomerNotificationListObject(response);
    // yield put(getScheduleCustomerNotificationSuccess(scheduleCustomerNotificationList));
    yield put(getScheduleCustomerNotificationSuccess(response.data));
  } catch (error) {
    yield put(getScheduleCustomerNotificationFail(error));
  }
}

function* fetchScheduleCustomerNotificationType() {
  try {
    const response = yield call(getScheduleCustomerNotificationType);
    console.log(
      "Schedule Customer Notification Type response:" + JSON.stringify(response)
    );
    yield put(getScheduleCustomerNotificationTypeSuccess(response.data));
  } catch (error) {
    yield put(getScheduleCustomerNotificationTypeFail(error));
  }
}

function* fetchScheduleCustomerNotificationStatus() {
  try {
    const response = yield call(getScheduleCustomerNotificationStatus);
    console.log(
      "Schedule Customer Notification status response:" +
        JSON.stringify(response)
    );
    // const designation = convertDesignationListObject(response.data);
    // yield put(getDesignationSuccess(designation));
    yield put(getScheduleCustomerNotificationStatusSuccess(response.data));
  } catch (error) {
    yield put(getScheduleCustomerNotificationStatusFail(error));
  }
}

function* fetchScheduleCustomerNotificationSMS() {
  try {
    const response = yield call(getScheduleCustomerNotificationSMS);
    console.log(
      "Schedule Customer Notficiation SMS response:" + JSON.stringify(response)
    );
    // const designation = convertDesignationListObject(response.data);
    // yield put(getDesignationSuccess(designation));
    yield put(getScheduleCustomerNotificationSMSSuccess(response.data));
  } catch (error) {
    yield put(getScheduleCustomerNotificationSMSFail(error));
  }
}

function* fetchScheduleCustomerNotificationOSD() {
  try {
    const response = yield call(getScheduleCustomerNotificationOSD);
    console.log(
      "Schedule Customer Notficiation  OSD response:" + JSON.stringify(response)
    );
    // const designation = convertDesignationListObject(response.data);
    // yield put(getDesignationSuccess(designation));
    yield put(getScheduleCustomerNotificationOSDSuccess(response.data));
  } catch (error) {
    yield put(getScheduleCustomerNotificationOSDFail(error));
  }
}

function* fetchScheduleCustomerNotificationBmail() {
  try {
    const response = yield call(getScheduleCustomerNotificationBmail);
    console.log(
      "Schedule Customer Notficiation Bmail response:" +
        JSON.stringify(response)
    );
    // const designation = convertDesignationListObject(response.data);
    // yield put(getDesignationSuccess(designation));
    yield put(getScheduleCustomerNotificationBmailSuccess(response.data));
  } catch (error) {
    yield put(getScheduleCustomerNotificationBmailFail(error));
  }
}

function* onAddNewScheduleCustomerNotification({
  payload: schedulecustomernotification,
}) {
  try {
    const response = yield call(
      addNewScheduleCustomerNotification,
      schedulecustomernotification
    );
    console.log("added schedule customer Notification response" + response);
    yield put(addScheduleCustomerNotificationSuccess(response.data));

    // toast.success("ScheduleCustomerNotification Added Successfully", {
    //    autoClose: 2000,
    // });
  } catch (error) {
    console.log("added schedule customer Notification Error" + error);
    yield put(addScheduleCustomerNotificationFail(error));
    // toast.error("ScheduleCustomerNotification Added Failed", {
    //   autoClose: 2000,
    // });
  }
}

function* scheduleCustomerNotificationSaga() {
  yield takeEvery(
    GET_SCHEDULECUSTOMERNOTIFICATION,
    fetchScheduleCustomerNotification
  );
  yield takeEvery(
    ADD_NEW_SCHEDULECUSTOMERNOTIFICATION,
    onAddNewScheduleCustomerNotification
  );
  yield takeEvery(
    GET_SCHEDULECUSTOMERNOTIFICATION_TYPE,
    fetchScheduleCustomerNotificationType
  );
  yield takeEvery(
    GET_SCHEDULECUSTOMERNOTIFICATION_SMS,
    fetchScheduleCustomerNotificationSMS
  );
  yield takeEvery(
    GET_SCHEDULECUSTOMERNOTIFICATION_OSD,
    fetchScheduleCustomerNotificationOSD
  );
  yield takeEvery(
    GET_SCHEDULECUSTOMERNOTIFICATION_STATUS,
    fetchScheduleCustomerNotificationStatus
  );
  yield takeEvery(
    GET_SCHEDULECUSTOMERNOTIFICATION_BMAIL,
    fetchScheduleCustomerNotificationBmail
  );
}

export default scheduleCustomerNotificationSaga;
