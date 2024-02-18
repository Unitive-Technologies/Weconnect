import { call, put, takeEvery } from "redux-saga/effects";
import { GET_CONNECTIONSCHEME, ADD_CONNECTIONSCHEME } from "./actionTypes";
import {
  getConnectionSchemeSuccess,
  getConnectionSchemeFail,
  addConnectionSchemeSuccess,
  addConnectionSchemeFail,
} from "./actions";
import {
  getConnectionScheme,
  addConnectionScheme,
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
    const connectionSchemeList = convertConnectionSchemeListObject(
      response.data
    );
    yield put(getConnectionSchemeSuccess(connectionSchemeList));
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
  } catch (error) {
    yield put(addConnectionSchemeFail(error));
  }
}

function* connectionSchemeSaga() {
  yield takeEvery(GET_CONNECTIONSCHEME, fetchConnectionScheme);
  yield takeEvery(ADD_CONNECTIONSCHEME, onAddNewConnectionScheme);
}

export default connectionSchemeSaga;
