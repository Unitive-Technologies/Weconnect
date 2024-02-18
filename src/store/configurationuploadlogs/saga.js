import { call, put, select, takeEvery } from "redux-saga/effects";

import { GET_CONFIGURATIONUPLOADLOGS } from "./actionTypes";

import {
  getConfigurationUploadLogsSuccess,
  getConfigurationUploadLogsFail,
} from "./actions";

//Include Both Helper File with needed methods
import { getConfigurationUploadLogs } from "../../helpers/backend_helper";

export const getConfigurationUploadLogsStore = (state) =>
  state.configurationuploadlogs;

function* fetchConfigurationUploadLogs() {
  try {
    let ConfigurationUploadLogsStore = yield select(
      getConfigurationUploadLogsStore
    );

    const pageSize = ConfigurationUploadLogsStore.pageSize;
    const currentPage = ConfigurationUploadLogsStore.currentPage;

    const response = yield call(
      getConfigurationUploadLogs,
      currentPage,
      pageSize
    );
    console.log("Response from API -", response);
    // debugger;
    yield put(getConfigurationUploadLogsSuccess(response));
  } catch (error) {
    console.error("Error fetching Configuration Upload Logs list:", error);
    yield put(getUsersFail(error));
  }
}

function* configurationUploadLogsSaga() {
  yield takeEvery(GET_CONFIGURATIONUPLOADLOGS, fetchConfigurationUploadLogs);
}

export default configurationUploadLogsSaga;
