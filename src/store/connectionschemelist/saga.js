import { call, put, takeEvery } from "redux-saga/effects";
import {
  GET_CONNECTIONSCHEME,
  ADD_CONNECTIONSCHEME,
  UPDATE_CONNECTIONSCHEME,
  GET_CONNECTIONSCHEME_BOXTYPE,
  GET_CONNECTIONSCHEME_STATUS,
} from "./actionTypes";
import {
  getConnectionScheme as fetchAllConnectionSchemes,
  getConnectionSchemeSuccess,
  getConnectionSchemeFail,
  addConnectionSchemeSuccess,
  addConnectionSchemeFail,
  updateConnectionSchemeSuccess,
  updateConnectionSchemeFail,
  getConnectionSchemeBoxTypeSuccess,
  getConnectionSchemeBoxTypeFail,
  getConnectionSchemeStatusFail,
  getConnectionSchemeStatusSuccess,
} from "./actions";
import {
  getConnectionScheme,
  addConnectionScheme,
  getConnectionSchemeBoxType,
  getConnectionSchemeStatus,
  updateConnectionScheme,
} from "../../helpers/backend_helper";

const convertConnectionSchemeListObject = (connectionschemeList) => {
  return connectionschemeList.map((connectionscheme) => {
    return {
      ...connectionscheme,
      id: connectionscheme.id,
      name: connectionscheme.name,
      code: connectionscheme.code,
      hardware_charge: connectionscheme.hardware_charge,
      installation_charge: connectionscheme.installation_charge,
      description: connectionscheme.description,
      boxtype_lbl: connectionscheme.boxtype_lbl,
      created_at: connectionscheme.created_at,
      created_by:
        connectionscheme.created_by === -1 ? "console" : "My MSO(mso)",
      status:
        connectionscheme.status === 1
          ? "ACTIVE"
          : connectionscheme.status === 0
          ? "INACTIVE"
          : "BLOCKED",
    };
  });
};

function* fetchConnectionScheme() {
  try {
    const response = yield call(getConnectionScheme);
    // const connectionSchemeList = convertConnectionSchemeListObject(
    //   response.data
    // );
    yield put(getConnectionSchemeSuccess(response.data));
  } catch (error) {
    console.error("Error fetching connection scheme list:", error);
    yield put(getConnectionSchemeFail(error));
  }
}
// function* onAddCity({ payload: city }) {
//   try {
//     const response = yield call(addCity, city);
//     yield put(addCitySuccess(response));
//     toast.success("City list Added Successfully", { autoClose: 2000 });
//   } catch (error) {
//     yield put(addCityFail(error));
//     toast.error("City list Added Failed", { autoClose: 2000 });
//   }
// }
function* onAddNewConnectionScheme({ payload: connectionscheme }) {
  try {
    const response = yield call(addConnectionScheme, connectionscheme);
    console.log("Post response in saga: ", response);
    yield put(addConnectionSchemeSuccess(response));
    yield put(fetchAllConnectionSchemes());
  } catch (error) {
    yield put(addConnectionSchemeFail(error));
  }
}

function* fetchConnectionSchemeBoxType() {
  try {
    const response = yield call(getConnectionSchemeBoxType);
    yield put(getConnectionSchemeBoxTypeSuccess(response.data));
  } catch (error) {
    console.error("Error fetching connection scheme boxtype:", error);
    yield put(getConnectionSchemeBoxTypeFail(error));
  }
}

function* fetchConnectionSchemeStatus() {
  try {
    const response = yield call(getConnectionSchemeStatus);
    yield put(getConnectionSchemeStatusSuccess(response.data));
  } catch (error) {
    console.error("Error fetching connection scheme status:", error);
    yield put(getConnectionSchemeStatusFail(error));
  }
}

function* onUpdateConnectionScheme({ payload: connectionscheme }) {
  console.log(
    "connectionscheme in onUpdate:" + JSON.stringify(connectionscheme)
  );
  try {
    const response = yield call(
      updateConnectionScheme,
      connectionscheme,
      connectionscheme.id
    );
    yield put(updateConnectionSchemeSuccess(response));
    console.log("update response:" + JSON.stringify(response));
    yield put(fetchAllConnectionSchemes());
  } catch (error) {
    yield put(updateConnectionSchemeFail(error));
  }
}

function* connectionSchemeSaga() {
  yield takeEvery(GET_CONNECTIONSCHEME, fetchConnectionScheme);
  yield takeEvery(ADD_CONNECTIONSCHEME, onAddNewConnectionScheme);
  yield takeEvery(GET_CONNECTIONSCHEME_BOXTYPE, fetchConnectionSchemeBoxType);
  yield takeEvery(GET_CONNECTIONSCHEME_STATUS, fetchConnectionSchemeStatus);
  yield takeEvery(UPDATE_CONNECTIONSCHEME, onUpdateConnectionScheme);
}

export default connectionSchemeSaga;
