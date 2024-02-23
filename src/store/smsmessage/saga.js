import { call, put, select, takeEvery } from "redux-saga/effects";

import {
  GET_SMSMESSAGETEMPLIST,
  GET_SMSMESSAGETEMPLIST_STATUS,
  GET_SMSMESSAGETEMPLIST_SENDER,
  GET_SMSMESSAGETEMPLIST_SUBCATEGORY,
  GET_SMSMESSAGETEMPLIST_CATEGORY,
  ADD_NEW_SMSMESSAGETEMPLIST,
  UPDATE_SMSMESSAGETEMPLIST,
} from "./actionTypes";

import {
  getSMSMessageTempList as fetchSMSMessageTemp,
  getSMSMessageTempListSuccess,
  getSMSMessageTempListFail,
  addSMSMessageTempListSuccess,
  addSMSMessageTempListFail,
  getSMSMessageTempListStatusSuccess,
  getSMSMessageTempListStatusFail,
  getSMSMessageTempListSubcategorySuccess,
  getSMSMessageTempListSubcategoryFail,
  getSMSMessageTempListCategorySuccess,
  getSMSMessageTempListCategoryFail,
  getSMSMessageTempListSenderSuccess,
  getSMSMessageTempListSenderFail,
  updateSMSMessageTempListSuccess,
  updateSMSMessageTempListFail,
} from "./actions";

//Include Both Helper File with needed methods
import {
  getSMSMessageTempList,
  addNewSMSMessageTempList,
  updateSMSMessageTempList,
  getSMSMessageTempListStatus,
  getSMSMessageTempListCategory,
  getSMSMessageTempListSubcategory,
  getSMSMessageTempListSender,
} from "../../helpers/backend_helper";

// const convertSMSMessageTempListObject = (smsmessagetemp) => {
//   return smsmessagetemp.map((smsmsgtemp) => {
//     return {
//       ...smsmsgtemp,
//       id: smsmsgtemp.id,
//       name: smsmsgtemp.name,
//       template: smsmsgtemp.template,
//       template_id: smsmsgtemp.template_id,
//       cat_id: smsmsgtemp.cat_id,
//       sub_cat_id: smsmsgtemp.sub_cat_id,
//       status_lbl: smsmsgtemp.status_lbl,
//       sender_id_lbl: smsmsgtemp.sender_id_lbl,
//       created_at: smsmsgtemp.created_at,
//       created_by: smsmsgtemp.created_by_lbl,
//     };
//   });
// };

export const getSMSMessageTempListStore = (state) => state.smsmessagetemp;

function* fetchSMSMsgTempList() {
  try {
    let SMSMessageTempListStore = yield select(getSMSMessageTempListStore);

    const pageSize = SMSMessageTempListStore.pageSize;
    const currentPage = SMSMessageTempListStore.currentPage;

    const response = yield call(getSMSMessageTempList, currentPage, pageSize);
    console.log("Response from API -", response);
    // debugger;
    yield put(getSMSMessageTempListSuccess(response));
  } catch (error) {
    console.error("Error fetching SMS Message Temp list:", error);
    yield put(getSMSMessageTempListFail(error));
  }
}

function* onAddNewSMSMessageTempList({ payload: smsmessagetemp }) {
  try {
    const response = yield call(addNewSMSMessageTempList, smsmessagetemp);
    yield put(addSMSMessageTempListSuccess(response));
    yield put(fetchSMSMessageTemp());
  } catch (error) {
    yield put(addSMSMessageTempListFail(error));
  }
}

function* onUpdateSMSMessageTempList({ payload: smsmessagetemp }) {
  // console.log("SMS in onUpdate:" + JSON.stringify(tax));
  try {
    const response = yield call(
      updateSMSMessageTempList,
      smsmessagetemp.id,
      smsmessagetemp
    );
    yield put(updateSMSMessageTempListSuccess(response));
    console.log("update response:" + JSON.stringify(response));
    yield put(fetchSMSMessageTemp());
  } catch (error) {
    yield put(updateSMSMessageTempListFail(error));
  }
}

function* fetchSMSMessageTempListStatus() {
  try {
    const response = yield call(getSMSMessageTempListStatus);
    console.log(
      "SMSMessageTempList status response:" + JSON.stringify(response)
    );
    yield put(getSMSMessageTempListStatusSuccess(response.data));
  } catch (error) {
    yield put(getSMSMessageTempListStatusFail(error));
  }
}

function* fetchSMSMessageTempListSender() {
  try {
    const response = yield call(getSMSMessageTempListSender);
    console.log(
      "SMSMessageTempList Sender response:" + JSON.stringify(response)
    );
    yield put(getSMSMessageTempListSenderSuccess(response.data));
  } catch (error) {
    yield put(getSMSMessageTempListSenderFail(error));
  }
}

function* fetchSMSMessageTempListSubcategory() {
  try {
    const response = yield call(getSMSMessageTempListSubcategory);
    console.log(
      "SMSMessageTempList Subcategory response:" + JSON.stringify(response)
    );
    yield put(getSMSMessageTempListSubcategorySuccess(response.data));
  } catch (error) {
    console.log("SMS Message Temp List Error" + error);
    yield put(getSMSMessageTempListSubcategoryFail(error));
  }
}

function* fetchSMSMessageTempListCategory() {
  try {
    const response = yield call(getSMSMessageTempListCategory);
    console.log(
      "SMSMessageTempList Category response:" + JSON.stringify(response)
    );
    yield put(getSMSMessageTempListCategorySuccess(response.data));
  } catch (error) {
    yield put(getSMSMessageTempListCategoryFail(error));
  }
}

function* smsMessageTempListSaga() {
  yield takeEvery(GET_SMSMESSAGETEMPLIST, fetchSMSMsgTempList);
  yield takeEvery(ADD_NEW_SMSMESSAGETEMPLIST, onAddNewSMSMessageTempList);
  yield takeEvery(
    GET_SMSMESSAGETEMPLIST_CATEGORY,
    fetchSMSMessageTempListCategory
  );
  yield takeEvery(GET_SMSMESSAGETEMPLIST_SENDER, fetchSMSMessageTempListSender);
  yield takeEvery(GET_SMSMESSAGETEMPLIST_STATUS, fetchSMSMessageTempListStatus);
  yield takeEvery(
    GET_SMSMESSAGETEMPLIST_SUBCATEGORY,
    fetchSMSMessageTempListSubcategory
  );
  yield takeEvery(UPDATE_SMSMESSAGETEMPLIST, onUpdateSMSMessageTempList);
}

export default smsMessageTempListSaga;
