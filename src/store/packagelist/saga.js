import { call, put, select, takeEvery } from "redux-saga/effects";

import {
  GET_PACKAGELIST,
  GET_PACKAGE_TYPE,
  GET_PACKAGE_BOXTYPE,
  GET_PACKAGE_STATUS,
  ADD_NEW_PACKAGELIST,
  UPDATE_PACKAGE,
} from "./actionTypes";

import {
  getPackageList as fetchallpackages,
  getPackageListSuccess,
  getPackageListFail,
  getPackageTypeSuccess,
  getPackageTypeFail,
  getPackageBoxTypeSuccess,
  getPackageBoxTypeFail,
  getPackageStatusSuccess,
  getPackageStatusFail,
  addPackageListSuccess,
  addPackageListFail,
  updatePackageSuccess,
  updatePackageFail,
} from "./actions";

//Include Both Helper File with needed methods
import {
  getPackageList,
  getPackageType,
  getPackageBoxType,
  getPackageStatus,
  addNewPackageList,
  updatePackage,
} from "../../helpers/fakebackend_helper";

// function* fetchPackageList() {
//   try {
//     const response = yield call(getPackageList);
//     console.log("response:" + JSON.stringify(response));
//     const packageList = convertPackageListObject(response.data);
//     yield put(getPackageListSuccess(packageList));
//   } catch (error) {
//     yield put(getPackageListFail(error));
//   }
// }

export const getPackageListStore = (state) => state.packageList;

function* fetchPackageList() {
  try {
    let PackageListStore = yield select(getPackageListStore);
    console.log("Package List store in Saga" + PackageListStore);

    const pageSize = PackageListStore.pageSize;
    const currentPage = PackageListStore.currentPage;

    const response = yield call(getPackageList, currentPage, pageSize);
    console.log("Response from API -", response);
    // debugger;
    yield put(getPackageListSuccess(response));
  } catch (error) {
    console.error("Error fetching Package List:", error);
    yield put(getPackageListFail(error));
  }
}

function* fetchPackageType() {
  try {
    const response = yield call(getPackageType);

    yield put(getPackageTypeSuccess(response.data));
    console.log("Package Type response data" + response.data);
  } catch (error) {
    console.error("Error fetching packae type:", error);
    yield put(getPackageTypeFail(error));
  }
}

function* fetchPackageBoxType() {
  try {
    const response = yield call(getPackageBoxType);

    yield put(getPackageBoxTypeSuccess(response.data));
    console.log("Package BoxType response data" + response.data);
  } catch (error) {
    console.error("Error fetching packae boxtype:", error);
    yield put(getPackageBoxTypeFail(error));
  }
}

function* fetchPackageStatus() {
  try {
    const response = yield call(getPackageStatus);

    yield put(getPackageStatusSuccess(response.data));
    console.log("Package Status response data" + response.data);
  } catch (error) {
    console.error("Error fetching packae Status:", error);
    yield put(getPackageStatusFail(error));
  }
}

function* onAddNewPackageList({ payload: packageList }) {
  try {
    const response = yield call(addNewPackageList, packageList);
    yield put(addPackageListSuccess(response));
    yield put(fetchallpackages());
    // toast.success("PackageList Added Successfully", { autoClose: 2000 });
  } catch (error) {
    yield put(addPackageListFail(error));
    // toast.error("Package List Added Failed", { autoClose: 2000 });
  }
}

function* onUpdatePackage({ payload: packlist }) {
  console.log("package in onUpdate:" + JSON.stringify(packlist));
  try {
    const response = yield call(updatePackage, packlist, packlist.id);
    yield put(updatePackageSuccess(response));
    console.log("update response:" + JSON.stringify(response));
    yield put(fetchallpackages());
  } catch (error) {
    yield put(updatePackageFail(error));
  }
}

function* packageListSaga() {
  yield takeEvery(GET_PACKAGELIST, fetchPackageList);
  yield takeEvery(ADD_NEW_PACKAGELIST, onAddNewPackageList);
  yield takeEvery(GET_PACKAGE_TYPE, fetchPackageType);
  yield takeEvery(GET_PACKAGE_BOXTYPE, fetchPackageBoxType);
  yield takeEvery(GET_PACKAGE_STATUS, fetchPackageStatus);
  yield takeEvery(UPDATE_PACKAGE, onUpdatePackage);
}

export default packageListSaga;
