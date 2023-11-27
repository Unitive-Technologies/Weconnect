import { call, put, takeEvery } from "redux-saga/effects";

import { GET_DISTRIBUTORS } from "./actionTypes";

import { getDistributorsSuccess, getDistributorsFail } from "./actions";

//Include Both Helper File with needed methods
import { getDistributors } from "../../helpers/fakebackend_helper";

const convertDistributorsListObject = (distributorsList) => {
  // Notification Template has more data than what we need, we need to convert each of the Notification Template user object in the list with needed colums of the table
  return distributorsList.map((distributors) => {
    return {
      ...distributors,
      id: distributors.id,
      name: distributors.name,
      code: distributors.code,
      contact_person: distributors.contact_person,
      addr: distributors.addr,
      mobile_no: distributors.mobile_no,
      state_lbl: distributors.state_lbl,
      district_lbl: distributors.district_lbl,
      created_at: distributors.created_at,
      created_by: distributors.created_by,
      city_lbl: distributors.city_lbl,
      gstno: distributors.gstno,
      panno: distributors.panno,
      username: distributors.username,
      status:
        distributors.status === 1
          ? "ACTIVE"
          : distributors.status === 0
          ? "INACTIVE"
          : "BLOCKED",
    };
  });
};

function* fetchDistributors() {
  try {
    const response = yield call(getDistributors);
    const distributorsList = convertDistributorsListObject(response);
    yield put(getDistributorsSuccess(distributorsList));
  } catch (error) {
    console.error("Error fetching Distributors list:", error);
    yield put(getDistributorsFail(error));
  }
}

function* distributorsSaga() {
  yield takeEvery(GET_DISTRIBUTORS, fetchDistributors);
}

export default distributorsSaga;
