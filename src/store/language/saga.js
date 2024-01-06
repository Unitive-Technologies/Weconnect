import { call, put, takeEvery } from "redux-saga/effects";

import { GET_LANGUAGELIST, GET_LANGUAGELIST_STATUS, ADD_NEW_LANGUAGELIST } from "./actionTypes";

import {
  getLanguageListSuccess,
  getLanguageListFail,
  getLanguageListStatusSuccess,
  getLanguageListStatusFail,
  addLanguageListSuccess,
  addLanguageListFail,
} from "./actions";

//Include Both Helper File with needed methods
import {
  getLanguageList,
  getLanguageListStatus,
  addNewLanguageList,
} from "../../helpers/fakebackend_helper";

const convertLanguageListObject = (languageList) => {
  // customer user list has more data than what we need, we need to convert each of the customer user object in the list with needed colums of the table
  return languageList.map((langlist) => {
    return {
      ...langlist,
      id: langlist.id,
      name: langlist.name,
      code: langlist.code,
      description: langlist.description,
      status:
        langlist.status === 1
          ? "ACTIVE"
          : langlist.status === 0
            ? "INACTIVE"
            : "BLOCKED",
      created_at: langlist.created_at,
      created_by: langlist.created_by_lbl,
    };
  });
};

function* fetchLanguageList() {
  try {
    const response = yield call(getLanguageList);
    console.log("response:" + JSON.stringify(response));
    // const languageList = convertLanguageListObject(response);
    yield put(getLanguageListSuccess(response.data));
  } catch (error) {
    yield put(getLanguageListFail(error));
  }
}

function* fetchLanguageListStatus() {
  try {
    const response = yield call(getLanguageListStatus);
    console.log("designation status response:" + JSON.stringify(response));
    yield put(getLanguageListStatusSuccess(response.data));
  } catch (error) {
    yield put(getLanguageListStatusFail(error));
  }
}

function* onAddNewLanguageList({ payload: LanguageList }) {
  try {
    const response = yield call(addNewLanguageList, LanguageList);

    yield put(addLanguageListSuccess(response));
  } catch (error) {
    yield put(addLanguageListFail(error));
  }
}

function* languageListSaga() {
  yield takeEvery(GET_LANGUAGELIST, fetchLanguageList);
  yield takeEvery(ADD_NEW_LANGUAGELIST, onAddNewLanguageList);
  yield takeEvery(GET_LANGUAGELIST_STATUS, fetchLanguageListStatus);
}

export default languageListSaga;
