import { call, put, takeEvery } from "redux-saga/effects";

import { GET_OSDCONFIGURATION } from "./actionTypes";

import { getOSDConfigurationSuccess, getOSDConfigurationFail } from "./actions";

//Include Both Helper File with needed methods
import { getOSDConfiguration } from "../../helpers/fakebackend_helper";

const convertOSDConfigurationListObject = (osdConfigurationList) => {
  // customer user list has more data than what we need, we need to convert each of the customer user object in the list with needed colums of the table
  return osdConfigurationList.map((osdConfiguration) => {
    return {
      ...osdConfiguration,
      id: osdConfiguration.id,
      name: osdConfiguration.name,
      cas_code: osdConfiguration.cas_code,
      status_lbl:
        osdConfiguration.status === 1
          ? "ACTIVE"
          : osdConfiguration.status_lbl === 0
            ? "INACTIVE"
            : "BLOCKED",
      is_reserved_lbl: osdConfiguration.is_reserved_lbl,
      type_lbl: osdConfiguration.type_lbl,
      start_time: osdConfiguration.start_time,
      end_time: osdConfiguration.end_time,
      created_at: osdConfiguration.created_at,
      created_by_lbl: osdConfiguration.created_by_lbl,
    };
  });
};

function* fetchOSDConfiguration() {
  try {
    const response = yield call(getOSDConfiguration);
    console.log("response:" + JSON.stringify(response));
    const osdConfigurationList = convertOSDConfigurationListObject(response);
    yield put(getOSDConfigurationSuccess(osdConfigurationList));
  } catch (error) {
    yield put(getOSDConfigurationFail(error));
  }
}

function* osdConfigurationSaga() {
  yield takeEvery(GET_OSDCONFIGURATION, fetchOSDConfiguration);
}

export default osdConfigurationSaga;
