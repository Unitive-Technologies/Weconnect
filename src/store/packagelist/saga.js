import { call, put, select, takeEvery } from "redux-saga/effects";

import { GET_PACKAGELIST, ADD_NEW_PACKAGELIST } from "./actionTypes";

import { getPackageListSuccess, getPackageListFail, addPackageListSuccess, addPackageListFail } from "./actions";

//Include Both Helper File with needed methods
import { getPackageList, addNewPackageList } from "../../helpers/fakebackend_helper";


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
    console.log("Package List store in Saga" + PackageListStore)

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

function* onAddNewPackageList({ payload: packageList }) {
  try {
    const response = yield call(addNewPackageList, packageList);
    yield put(addPackageListSuccess(response));
    toast.success("PackageList Added Successfully", { autoClose: 2000 });
  } catch (error) {
    yield put(addPackageListFail(error));
    toast.error("Package List Added Failed", { autoClose: 2000 });
  }
}

function* packageListSaga() {
  yield takeEvery(GET_PACKAGELIST, fetchPackageList);
  yield takeEvery(ADD_NEW_PACKAGELIST, onAddNewPackageList);
}

export default packageListSaga;
