import { call, put, takeEvery } from "redux-saga/effects";

import { GET_SCHEDULEDNOTIFICATION } from "./actionTypes";

import {
  getScheduledNotificationSuccess,
  getScheduledNotificationFail,
} from "./actions";

//Include Both Helper File with needed methods
import { getScheduledNotification } from "../../helpers/fakebackend_helper";

const convertScheduledNotificationListObject = (ScheduleNotificationList) => {
  // Notification Template has more data than what we need, we need to convert each of the Notification Template user object in the list with needed colums of the table
  return ScheuledNotificationList.map((scheduledNotification) => {
    return {
      ...scheduledNotification,
      id: scheduledNotification.id,
      name: scheduledNotification.name,
      code: scheduledNotification.code,
      contact_person: scheduledNotification.contact_person,
      addr: scheduledNotification.addr,
      mobile_no: scheduledNotification.mobile_no,
      state_lbl: scheduledNotification.state_lbl,
      district_lbl: scheduledNotification.district_lbl,
      created_at: scheduledNotification.created_at,
      created_by: scheduledNotification.created_by,
      city_lbl: scheduledNotification.city_lbl,
      gstno: scheduledNotification.gstno,
      panno: scheduledNotification.panno,
      username: scheduledNotification.username,
      distributor_lbl: scheduledNotification.distributor_lbl,
      branch_code_lbl: scheduledNotification.branch_code_lbl,
      branch_lbl: scheduledNotification.branch_lbl,
      balance: scheduledNotification.balance,
      status:
        scheduledNotification.status === 1
          ? "ACTIVE"
          : scheduledNotification.status === 0
          ? "INACTIVE"
          : "BLOCKED",
    };
  });
};

function* fetchScheduledNotification() {
  try {
    const response = yield call(getScheduledNotification);
    const scheduledNotificationList =
      convertScheduledNotificationListObject(response);
    yield put(getScheduledNotificationSuccess(scheduledNotificationList));
  } catch (error) {
    console.error("Error fetching Scheduled notification list:", error);
    yield put(getScheduledNotificationFail(error));
  }
}

function* scheduledNotificationSaga() {
  yield takeEvery(GET_SCHEDULEDNOTIFICATION, fetchScheduledNotification);
}

export default scheduledNotificationSaga;
