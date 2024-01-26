import { call, put, select, takeEvery } from "redux-saga/effects";

import {
  GET_DISTRIBUTORS,
  ADD_NEW_DISTRIBUTOR,
  UPDATE_DISTRIBUTOR,
  UPDATE_DISTRIBUTOR_CURRENT_PAGE,
  GET_DISTRIBUTORS_PHASE,
  GET_DISTRIBUTORS_STATUS,
} from "./actionTypes";

import {
  getDistributors as fetchdistributors,
  getDistributorsSuccess,
  getDistributorsFail,
  addDistributorsFail,
  addDistributorsSuccess,
  updateDistributorsSuccess,
  updateDistributorsFail,
  getDistributorsPhaseFail,
  getDistributorsPhaseSuccess,
  getDistributorsStatusFail,
  getDistributorsStatusSuccess,
} from "./actions";

//Include Both Helper File with needed methods
import {
  getDistributors,
  getDistributorsPhase,
  getDistributorsStatus,
  addNewDistributor,
  updateDistributor,
} from "../../helpers/fakebackend_helper";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

export const getDistributorStore = (state) => state.distributors;

const convertDistributorsListObject = (distributorsList) => {
  // Notification Template has more data than what we need, we need to convert each of the Notification Template user object in the list with needed colums of the table
  return distributorsList.map((distributors) => {
    return {
      ...distributors,
      id: distributors.id,
      name: distributors.name,
      code: distributors.code,
      contact_person: distributors.contact_person,
      addr1: distributors.addr1,
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
    let distributorsStore = yield select(getDistributorStore);

    const pageSize = distributorsStore.pageSize;
    const currentPage = distributorsStore.currentPage;
    // const { pageSize, currentPage } = yield useSelector(distributorProperties);

    const response = yield call(getDistributors, currentPage, pageSize);
    // const distributorsList = convertDistributorsListObject(response);
    yield put(getDistributorsSuccess(response));
  } catch (error) {
    console.error("Error fetching Distributors list:", error);
    yield put(getDistributorsFail(error));
  }
}

function* fetchDistributorsPhase() {
  try {
    const response = yield call(getDistributorsPhase);
    console.log(
      "dddddddddd disphase response:" + JSON.stringify(response.data)
    );
    yield put(getDistributorsPhaseSuccess(response.data));
  } catch (error) {
    yield put(getDistributorsPhaseFail(error));
  }
}

function* fetchDistributorsStatus() {
  try {
    const response = yield call(getDistributorsStatus);
    console.log(
      "dddddddddd disstatus response:" + JSON.stringify(response.data)
    );
    yield put(getDistributorsStatusSuccess(response.data));
  } catch (error) {
    yield put(getDistributorsStatusFail(error));
  }
}

function* onAddNewDistributor({ payload: distributors }) {
  try {
    const response = yield call(addNewDistributor, distributors);

    yield put(addDistributorsSuccess(response));
    yield put(fetchdistributors());
    // toast.success("Distributor Added Successfully", { autoClose: 2000 });
  } catch (error) {
    yield put(addDistributorsFail(error));
    // toast.error("Distributor Added Failed", { autoClose: 2000 });
  }
}

function* onUpdateDistributor({ payload: distributor }) {
  try {
    const response = yield call(updateDistributor, distributor, distributor.id);
    yield put(updateDistributorsSuccess(response));
    yield put(fetchdistributors());
    // toast.success("Distributor Updated Successfully", { autoClose: 2000 });
  } catch (error) {
    yield put(updateDistributorsFail(error));
    // toast.error("Distributor Updated Failed", { autoClose: 2000 });
  }
}

// function* updateCurrentPage({ payload: toPage }) {
//   // try {
//   //   const totalPages = yield useSelector((state) => state.distributors.totalPages);
//   //   if (toPage <= totalPages) {
//   //     yield put(goToPageSuccess(toPage));
//   //   }
//   // } catch (error) {
//   //   console.error("Error updating current page:", error);
//   // }
// }

function* distributorsSaga() {
  // yield takeEvery(UPDATE_DISTRIBUTOR_CURRENT_PAGE, updateCurrentPage);
  yield takeEvery(GET_DISTRIBUTORS, fetchDistributors);
  yield takeEvery(ADD_NEW_DISTRIBUTOR, onAddNewDistributor);
  yield takeEvery(UPDATE_DISTRIBUTOR, onUpdateDistributor);
  yield takeEvery(GET_DISTRIBUTORS_PHASE, fetchDistributorsPhase);
  yield takeEvery(GET_DISTRIBUTORS_STATUS, fetchDistributorsStatus);
}

export default distributorsSaga;
