import { call, put, takeEvery } from "redux-saga/effects";

import { GET_CONNECTIONSCHEME, ADD_CONNECTIONSCHEME } from "./actionTypes";

import {
  getConnectionSchemeSuccess,
  getConnectionSchemeFail,
  addConnectionSchemeSuccess,
  addConnectionSchemeFail,
} from "./actions";

//Include Both Helper File with needed methods
import {
  getConnectionScheme,
  addConnectionScheme,
} from "../../helpers/fakebackend_helper";

const convertConnectionSchemeListObject = (connectionschemeList) => {
  // Notification Template has more data than what we need, we need to convert each of the Notification Template user object in the list with needed colums of the table
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
    const connectionSchemeList = convertConnectionSchemeListObject(response);
    yield put(getConnectionSchemeSuccess(connectionSchemeList));
  } catch (error) {
    console.error("Error fetching connection scheme list:", error);
    yield put(getConnectionSchemeFail(error));
  }
}

function* onAddNewConnectionScheme({ payload: connectionscheme }) {
  try {
    const response = yield call(addConnectionScheme, connectionscheme);
    yield put(addConnectionSchemeSuccess(response));
  } catch (error) {
    yield put(addConnectionSchemeFail(error));
  }
}

function* connectionSchemeSaga() {
  yield takeEvery(GET_CONNECTIONSCHEME, fetchConnectionScheme);
  yield takeEvery(ADD_CONNECTIONSCHEME, onAddNewConnectionScheme);
}

export default connectionSchemeSaga;
