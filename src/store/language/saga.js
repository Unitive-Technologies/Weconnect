import { call, put, select, takeEvery } from "redux-saga/effects";

import {
  GET_LANGUAGELIST,
  UPDATE_LANGUAGELIST,
  GET_LANGUAGELIST_STATUS,
  ADD_NEW_LANGUAGELIST,
} from "./actionTypes";

import {
  getlanguageList as fetchlanguagelists,
  getLanguageListSuccess,
  getLanguageListFail,
  updateLanguageListSuccess,
  updateLanguageListFail,
  getLanguageListStatusSuccess,
  getLanguageListStatusFail,
  addLanguageListSuccess,
  addLanguageListFail,
} from "./actions";

//Include Both Helper File with needed methods
import {
  getlanguageList,
  updateLanguageList,
  getLanguageListStatus,
  addNewLanguageList,
} from "../../helpers/fakebackend_helper";

// const convertLanguageListObject = (languageList) => {
//   return languageList.map((langlist) => {
//     return {
//       ...langlist,
//       id: langlist.id,
//       name: langlist.name,
//       code: langlist.code,
//       description: langlist.description,
//       status:
//         langlist.status === 1
//           ? "ACTIVE"
//           : langlist.status === 0
//             ? "INACTIVE"
//             : "BLOCKED",
//       created_at: langlist.created_at,
//       created_by: langlist.created_by_lbl,
//     };
//   });
// };

export const getlanguageListStore = (state) => state.languageList;

function* fetchLanguageList() {
  try {
    let languageListStore = yield select(getlanguageListStore);

    const pageSize = languageListStore.pageSize;
    const currentPage = languageListStore.currentPage;

    const response = yield call(getlanguageList, currentPage, pageSize);
    console.log("Response from API -", response);
    debugger;
    yield put(getLanguageListSuccess(response));
  } catch (error) {
    console.error("Error fetching Language List:", error);
    yield put(getLanguageListFail(error));
  }
}

function* onUpdateLanguageList({ payload: languageList }) {
  console.log("Language List in onUpdate:" + JSON.stringify(languageList));
  try {
    // debugger;
    const response = yield call(
      updateLanguageList,
      languageList,
      languageList.id
    );

    yield put(updateLanguageListSuccess(response));
    console.log("update response:" + JSON.stringify(response));

    // toast.success("CustomerUser Updated Successfully", { autoClose: 2000 });
    yield put(fetchlanguagelists());
  } catch (error) {
    yield put(updateLanguageListFail(error));
    // toast.error("LanguageList Updated Failed", { autoClose: 2000 });
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
    yield put(fetchlanguagelists());
  } catch (error) {
    yield put(addLanguageListFail(error));
  }
}

function* languageListSaga() {
  yield takeEvery(GET_LANGUAGELIST, fetchLanguageList);
  yield takeEvery(ADD_NEW_LANGUAGELIST, onAddNewLanguageList);
  yield takeEvery(GET_LANGUAGELIST_STATUS, fetchLanguageListStatus);
  yield takeEvery(UPDATE_LANGUAGELIST, onUpdateLanguageList);
}

export default languageListSaga;
