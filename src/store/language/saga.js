import { call, put, takeEvery } from "redux-saga/effects";

import { GET_LANGUAGELIST } from "./actionTypes";

import { getLanguageListSuccess, getLanguageListFail } from "./actions";

//Include Both Helper File with needed methods
import { getLanguageList } from "../../helpers/fakebackend_helper";

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
      created_by: langlist.created_at,
    };
  });
};

function* fetchLanguageList() {
  try {
    const response = yield call(getLanguageList);
    console.log("response:" + JSON.stringify(response));
    const languageList = convertLanguageListObject(response);
    yield put(getLanguageListSuccess(languageList));
  } catch (error) {
    yield put(getLanguageListFail(error));
  }
}

function* languageListSaga() {
  yield takeEvery(GET_LANGUAGELIST, fetchLanguageList);
}

export default languageListSaga;
