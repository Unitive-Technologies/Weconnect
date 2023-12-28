import { call, put, takeEvery } from "redux-saga/effects";

import { GET_SMSMESSAGETEMPLIST, ADD_NEW_SMSMESSAGETEMPLIST } from "./actionTypes";

import {
  getSMSMessageTempListSuccess,
  getSMSMessageTempListFail,
  addSMSMessageTempListSuccess, addSMSMessageTempListFail
} from "./actions";

//Include Both Helper File with needed methods
import { getSMSMessageTempList, addNewSMSMessageTempList } from "../../helpers/fakebackend_helper";

const convertSMSMessageTempListObject = (smsmessagetemp) => {
  // customer user list has more data than what we need, we need to convert each of the customer user object in the list with needed colums of the table
  return smsmessagetemp.map((smsmsgtemp) => {
    return {
      ...smsmsgtemp,
      id: smsmsgtemp.id,
      name: smsmsgtemp.name,
      template: smsmsgtemp.template,
      templateID: smsmsgtemp.template_id,
      category: smsmsgtemp.cat_id,
      subcategory: smsmsgtemp.sub_cat_id,
      status: smsmsgtemp.status_lbl,
      sender: smsmsgtemp.sender_id_lbl,
      created_at: smsmsgtemp.created_at,
      created_by: smsmsgtemp.created_by_lbl,
    };
  });
};

function* fetchSMSMsgTempList() {
  try {
    const response = yield call(getSMSMessageTempList);
    console.log("response:" + JSON.stringify(response));
    // const smsMsgTempList = convertSMSMessageTempListObject(response);
    yield put(getSMSMessageTempListSuccess(response.data));
  } catch (error) {
    yield put(getSMSMessageTempListFail(error));
  }
}

function* onAddNewSMSMessageTempList({ payload: smsmessagetemp }) {
  try {
    const response = yield call(addNewSMSMessageTempList, smsmessagetemp);
    yield put(addSMSMessageTempListSuccess(response));
    toast.success("SMSMessageTempList Successfully", { autoClose: 2000 });
  } catch (error) {
    yield put(addSMSMessageTempListFail(error));
    toast.error("SMSMessageTempList Added Failed", { autoClose: 2000 });
  }
}

function* smsMessageTempListSaga() {
  yield takeEvery(GET_SMSMESSAGETEMPLIST, fetchSMSMsgTempList);
  yield takeEvery(ADD_NEW_SMSMESSAGETEMPLIST, onAddNewSMSMessageTempList);
}

export default smsMessageTempListSaga;
