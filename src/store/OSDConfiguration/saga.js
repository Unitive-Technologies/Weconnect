import { call, put, takeEvery } from "redux-saga/effects";

import {
  GET_OSDCONFIGURATION,
  GET_OSDCONFIGURATION_ENABLE,
  GET_OSDCONFIGURATION_FORCESDDISPLAY,
  GET_OSDCONFIGURATION_DISPLAY,
  GET_OSDCONFIGURATION_FONTCOLOR,
  GET_OSDCONFIGURATION_BACKGROUNDCOLOR,
  GET_OSDCONFIGURATION_FONTSIZE,
  GET_OSDCONFIGURATION_BACKGROUNDAREA,
  GET_OSDCONFIGURATION_STATUS, ADD_NEW_OSDCONFIGURATION
} from "./actionTypes";

import {
  getOSDConfigurationSuccess, getOSDConfigurationFail,
  getOSDConfigurationEnableSuccess, getOSDConfigurationEnableFail,
  getOSDConfigurationForcedDisplaySuccess, getOSDConfigurationForcedDisplayFail,
  getOSDConfigurationDisplaySuccess, getOSDConfigurationDisplayFail,
  getOSDConfigurationFontColorSuccess, getOSDConfigurationFontColorFail,
  getOSDConfigurationBackgroundColorSuccess, getOSDConfigurationBackgroundColorFail,
  getOSDConfigurationFontSizeSuccess, getOSDConfigurationFontSizeFail,
  getOSDConfigurationBackgroundAreaSuccess, getOSDConfigurationBackgroundAreaFail,
  getOSDConfigurationStatusSuccess, getOSDConfigurationStatusFail,
  addOSDConfigurationSuccess, addOSDConfigurationFail
} from "./actions";

//Include Both Helper File with needed methods
import {
  getOSDConfiguration, getOSDConfigurationEnable, getOSDConfigurationDisplay, getOSDConfigurationForcedDisplay, getOSDConfigurationFontSize, getOSDConfigurationFontColor, getOSDConfigurationBackgroundArea, getOSDConfigurationBackgroundColor, getOSDConfigurationStatus,
  addNewOSDConfiguration
} from "../../helpers/fakebackend_helper";

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
    // const osdConfigurationList = convertOSDConfigurationListObject(response);
    yield put(getOSDConfigurationSuccess(response.data));
  } catch (error) {
    yield put(getOSDConfigurationFail(error));
  }
}

function* fetchOSDConfigurationEnable() {
  try {
    const response = yield call(getOSDConfigurationEnable);
    console.log("OSD Configuration Enable  response:" + JSON.stringify(response));
    yield put(getOSDConfigurationEnableSuccess(response.data));
  } catch (error) {
    yield put(getOSDConfigurationEnableFail(error));
  }
}

function* fetchOSDConfigurationForcedDisplay() {
  try {
    const response = yield call(getOSDConfigurationForcedDisplay);
    console.log("OSD Configuration Forced Display  response:" + JSON.stringify(response));
    yield put(getOSDConfigurationForcedDisplaySuccess(response.data));
  } catch (error) {
    yield put(getOSDConfigurationForcedDisplayFail(error));
  }
}

function* fetchOSDConfigurationDisplay() {
  try {
    const response = yield call(getOSDConfigurationDisplay);
    console.log("OSD Configuration  Display  response:" + JSON.stringify(response));
    yield put(getOSDConfigurationDisplaySuccess(response.data));
  } catch (error) {
    yield put(getOSDConfigurationDisplayFail(error));
  }
}


function* fetchOSDConfigurationFontColor() {
  try {
    const response = yield call(getOSDConfigurationFontColor);
    console.log("OSD Configuration Font Colorr  response:" + JSON.stringify(response));
    yield put(getOSDConfigurationFontColorSuccess(response.data));
  } catch (error) {
    yield put(getOSDConfigurationFontColorFail(error));
  }
}

function* fetchOSDConfigurationBackgroundColor() {
  try {
    const response = yield call(getOSDConfigurationBackgroundColor);
    console.log("OSD Configuration Background Color response:" + JSON.stringify(response));
    yield put(getOSDConfigurationBackgroundColorSuccess(response.data));
  } catch (error) {
    yield put(getOSDConfigurationBackgroundColorFail(error));
  }
}

function* fetchOSDConfigurationBackgroundArea() {
  try {
    const response = yield call(getOSDConfigurationBackgroundArea);
    console.log("OSD Configuration Background Area response:" + JSON.stringify(response));
    yield put(getOSDConfigurationBackgroundAreaSuccess(response.data));
  } catch (error) {
    yield put(getOSDConfigurationBackgroundAreaFail(error));
  }
}

function* fetchOSDConfigurationFontSize() {
  try {
    const response = yield call(getOSDConfigurationFontSize);
    console.log("OSD Configuration Font Size response:" + JSON.stringify(response));
    yield put(getOSDConfigurationFontSizeSuccess(response.data));
  } catch (error) {
    yield put(getOSDConfigurationFontSizeFail(error));
  }
}

function* fetchOSDConfigurationStatus() {
  try {
    const response = yield call(getOSDConfigurationStatus);
    console.log("OSD Configuration Status response:" + JSON.stringify(response));
    yield put(getOSDConfigurationStatusSuccess(response.data));
  } catch (error) {
    yield put(getOSDConfigurationStatusFail(error));
  }
}

function* onAddNewOSDConfiguration({ payload: osdConfiguration }) {
  try {
    const response = yield call(addNewOSDConfiguration, osdConfiguration);
    yield put(addOSDConfigurationSuccess(response));
  } catch (error) {
    yield put(addOSDConfigurationFail(error));
  }
}

function* osdConfigurationSaga() {
  yield takeEvery(GET_OSDCONFIGURATION, fetchOSDConfiguration);
  yield takeEvery(GET_OSDCONFIGURATION_ENABLE, fetchOSDConfigurationEnable);
  yield takeEvery(GET_OSDCONFIGURATION_FORCESDDISPLAY, fetchOSDConfigurationForcedDisplay);
  yield takeEvery(GET_OSDCONFIGURATION_DISPLAY, fetchOSDConfigurationDisplay);
  yield takeEvery(GET_OSDCONFIGURATION_FONTCOLOR, fetchOSDConfigurationFontColor);
  yield takeEvery(GET_OSDCONFIGURATION_BACKGROUNDCOLOR, fetchOSDConfigurationBackgroundColor);
  yield takeEvery(GET_OSDCONFIGURATION_FONTSIZE, fetchOSDConfigurationFontSize);
  yield takeEvery(GET_OSDCONFIGURATION_BACKGROUNDAREA, fetchOSDConfigurationBackgroundArea);
  yield takeEvery(GET_OSDCONFIGURATION_STATUS, fetchOSDConfigurationStatus);
  yield takeEvery(ADD_NEW_OSDCONFIGURATION, onAddNewOSDConfiguration);
}

export default osdConfigurationSaga;
