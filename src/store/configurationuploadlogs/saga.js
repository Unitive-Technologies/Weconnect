import { call, put, takeEvery } from "redux-saga/effects";

import { GET_CONFIGURATIONUPLOADLOGS } from "./actionTypes";

import {
  getConfigurationUploadLogsSuccess,
  getConfigurationUploadLogsFail,
} from "./actions";

//Include Both Helper File with needed methods
import { getConfigurationUploadLogs } from "../../helpers/fakebackend_helper";

const convertConfigurationUploadLogsObject = (configurationUploadLogs) => {
  // Notification Template has more data than what we need, we need to convert each of the Notification Template user object in the list with needed colums of the table
  return configurationUploadLogs.map((configurationuploadlogs) => {
    return {
      ...configurationuploadlogs,
      id: configurationuploadlogs.id,
      job_id: configurationuploadlogs.job_id,
      type: configurationuploadlogs.type,
      uploaded_file: configurationuploadlogs.uploaded_file,
      file_count: configurationuploadlogs.file_count,
      row_count: configurationuploadlogs.row_count,
      processed_count: configurationuploadlogs.processed_count,
      success_count: configurationuploadlogs.success_count,
      error_count: configurationuploadlogs.error_count,
      created_by_lbl: configurationuploadlogs.created_by_lbl,
      updated_at: configurationuploadlogs.updated_at,
      processed_rows_file: configurationuploadlogs.processed_rows_file,
      created_by:
        configurationuploadlogs.created_by === -1 ? "console" : "My MSO(mso)",
      status:
        configurationuploadlogs.status === 1
          ? "ACTIVE"
          : configurationuploadlogs.status === 0
          ? "INACTIVE"
          : "BLOCKED",
      showonweb:
        configurationuploadlogs.showonweb === 1
          ? "ACTIVE"
          : configurationuploadlogs.showonweb === 0
          ? "INACTIVE"
          : "BLOCKED",
    };
  });
};

function* fetchConfigurationUploadLogs() {
  try {
    const response = yield call(getConfigurationUploadLogs);
    const configurationUploadLogsList =
      convertConfigurationUploadLogsObject(response);
    yield put(getConfigurationUploadLogsSuccess(configurationUploadLogsList));
  } catch (error) {
    console.error("Error fetching configuration upload logs:", error);
    yield put(getConfigurationUploadLogsFail(error));
  }
}

function* configurationUploadLogsSaga() {
  yield takeEvery(GET_CONFIGURATIONUPLOADLOGS, fetchConfigurationUploadLogs);
}

export default configurationUploadLogsSaga;
