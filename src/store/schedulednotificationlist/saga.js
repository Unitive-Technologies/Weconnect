import { call, put, takeEvery } from "redux-saga/effects";

import { GET_SCHEDULEDNOTIFICATION } from "./actionTypes";

import {
  getScheduledNotificationSuccess,
  getScheduledNotificationFail,
} from "./actions";

//Include Both Helper File with needed methods
import { getScheduledNotification } from "../../helpers/backend_helper";

const convertScheduledNotificationListObject = (ScheduledNotificationList) => {
  // Notification Template has more data than what we need, we need to convert each of the Notification Template user object in the list with needed colums of the table
  return ScheduledNotificationList.map((scheduledNotification) => {
    return {
      ...scheduledNotification,
      id: scheduledNotification.id,
      name: scheduledNotification.name,
      content: scheduledNotification.content,
      type: scheduledNotification.type,
      starttime: scheduledNotification.starttime,
      endtime: scheduledNotification.endtime,
      broadcast_status: scheduledNotification.broadcast_status,
      usercount: scheduledNotification.usercount,
      scheduledat: scheduledNotification.created_at,
      scheduledby: scheduledNotification.created_by,
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
    // const scheduledNotificationList =
    //   convertScheduledNotificationListObject(response);
    yield put(getScheduledNotificationSuccess(response.data));
  } catch (error) {
    console.error("Error fetching Scheduled notification list:", error);
    yield put(getScheduledNotificationFail(error));
  }
}

function* scheduledNotificationSaga() {
  yield takeEvery(GET_SCHEDULEDNOTIFICATION, fetchScheduledNotification);
}

export default scheduledNotificationSaga;
