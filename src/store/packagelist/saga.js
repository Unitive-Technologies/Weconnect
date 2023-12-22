import { call, put, takeEvery } from "redux-saga/effects";

import { GET_PACKAGELIST, ADD_NEW_PACKAGELIST } from "./actionTypes";

import { getPackageListSuccess, getPackageListFail, addPackageListSuccess, addPackageListFail } from "./actions";

//Include Both Helper File with needed methods
import { getPackageList, addNewPackageList } from "../../helpers/fakebackend_helper";

const convertPackageListObject = (packageList) => {
  // package list has more data than what we need, we need to convert each of the customer user object in the list with needed colums of the table
  return packageList.map((packlist) => {
    return {
      ...packlist,
      id: packlist.id,
      name: packlist.name,
      code: packlist.code,
      type: packlist.package_type_lbl,
      packagetype: packlist.isFta_lbl,
      cascodes: packlist.casCodes[0].cas_lbl + "(" + packlist.casCodes[0].cascode + ")",
      channels: packlist.channels.map((pack) => pack.name).join(", "),
      BBQ: packlist.name,
      status: packlist.status_lbl,
      rate: packlist.broadcasterRate,
      created_at: packlist.created_at,
      created_by: packlist.created_by_lbl,
    };
  });
};

function* fetchPackageList() {
  try {
    const response = yield call(getPackageList);
    console.log("response:" + JSON.stringify(response));
    const packageList = convertPackageListObject(response.data);
    yield put(getPackageListSuccess(packageList));
  } catch (error) {
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
