import { call, put, takeEvery } from "redux-saga/effects";

import { GET_SCHEDULECUSTOMERNOTIFICATION, ADD_NEW_SCHEDULECUSTOMERNOTIFICATION } from "./actionTypes";

import { getScheduleCustomerNotificationSuccess, getScheduleCustomerNotificationFail, addScheduleCustomerNotificationSuccess, addScheduleCustomerNotificationFail } from "./actions";

//Include Both Helper File with needed methods
import { getScheduleCustomerNotification, addNewScheduleCustomerNotification } from "../../helpers/fakebackend_helper";
import { toast } from "react-toastify";


const convertScheduleCustomerNotificationListObject = (scheduleCustomerNotificationList) => {
  // Schedule Customer Notification list has more data than what we need, we need to convert each of the customer user object in the list with needed colums of the table
  return scheduleCustomerNotificationList.map((scheduleCustomerNotification) => {
    return {
      ...scheduleCustomerNotification,
      id: scheduleCustomerNotification.id,
      name: scheduleCustomerNotification.name,
      type_lbl: scheduleCustomerNotification.type_lbl,
      schedule_days: scheduleCustomerNotification.schedule_days,
      osd_template_id_lbl: scheduleCustomerNotification.osd_template_id_lbl,
      osd_configuration_id_lbl: scheduleCustomerNotification.osd_configuration_id_lbl,
      bmail_template_id_lbl: scheduleCustomerNotification.bmail_template_id_lbl,
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
  });
};

function* fetchScheduleCustomerNotification() {
  try {
    const response = yield call(getScheduleCustomerNotification);
    console.log("response:" + JSON.stringify(response));
    const scheduleCustomerNotificationList = convertScheduleCustomerNotificationListObject(response);
    yield put(getScheduleCustomerNotificationSuccess(scheduleCustomerNotificationList));
  } catch (error) {
    yield put(getScheduleCustomerNotificationFail(error));
  }
}

function* onAddNewScheduleCustomerNotification({ payload: schedulecustomernotification }) {
  try {
    const response = yield call(addNewScheduleCustomerNotification, schedulecustomernotification);

    yield put(addScheduleCustomerNotificationSuccess(response));
    toast.success("ScheduleCustomerNotification Added Successfully", { autoClose: 2000 });
  } catch (error) {
    yield put(addScheduleCustomerNotificationFail(error));
    toast.error("ScheduleCustomerNotification Added Failed", { autoClose: 2000 });
  }
}

function* scheduleCustomerNotificationSaga() {
  yield takeEvery(GET_SCHEDULECUSTOMERNOTIFICATION, fetchScheduleCustomerNotification);
  yield takeEvery(ADD_NEW_SCHEDULECUSTOMERNOTIFICATION, onAddNewScheduleCustomerNotification);
}

export default scheduleCustomerNotificationSaga;
