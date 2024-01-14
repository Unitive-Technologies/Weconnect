import { call, put, select, takeEvery } from "redux-saga/effects";

import {
  GET_DISTRIBUTORS,
  ADD_NEW_DISTRIBUTOR,
  UPDATE_DISTRIBUTOR,
  UPDATE_DISTRIBUTOR_CURRENT_PAGE,
} from "./actionTypes";

import {
  getDistributorsSuccess,
  getDistributorsFail,
  addDistributorsFail,
  addDistributorsSuccess,
  updateDistributorsSuccess,
  updateDistributorsFail,
} from "./actions";

//Include Both Helper File with needed methods
import {
  getDistributors,
  addNewDistributor,
  updateDistributor,
} from "../../helpers/fakebackend_helper";
import { useSelector } from "react-redux";
import { createSelector } from "reselect";

import {
  RESPONSE_HEADER_CURRENT_PAGE,
  RESPONSE_HEADER_PER_PAGE,
} from "../../constants/strings";

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

    // const distributorProperties = yield createSelector(
    //   (state) => state.distributors,
    //   (distributors) => ({
    //     pageSize: distributors.perPage,
    //     currentPage: distributors.currentPage,
    //   })
    // );

    // useSelector to fetch the totalCount
    // yield takeLatest("DISTRIBUTORS/FETCH_TOTAL
    // _COUNT", function* () {
    //   const { pageSize } = yield useSelector(distributorProperties);
    //   const response = yield call(getDistributors, 1, pageSize);
    //   yield put(getDistributorsSuccess(response));
    // });
    // const data = yield select(distributorProperties);
    // console.log("data:", data);
    // const result = yield call(getDistributors, data.currentPage, data.page
    // Size);
    // console.log("result:", result);
    // // const { pageSize, currentPage } = yield useSelector(distributorProperties);

    const pageSize = distributorsStore.pageSize;
    const currentPage = distributorsSaga.currentPage;
    // const { pageSize, currentPage } = yield useSelector(distributorProperties);

    const response = yield call(getDistributors, currentPage, pageSize);
    // const distributorsList = convertDistributorsListObject(response);
    yield put(getDistributorsSuccess(response));
  } catch (error) {
    console.error("Error fetching Distributors list:", error);
    yield put(getDistributorsFail(error));
  }
}

function* onAddNewDistributor({ payload: distributors }) {
  try {
    const response = yield call(addNewDistributor, distributors);

    yield put(addDistributorsSuccess(response));
    toast.success("Distributor Added Successfully", { autoClose: 2000 });
  } catch (error) {
    yield put(addDistributorsFail(error));
    toast.error("Distributor Added Failed", { autoClose: 2000 });
  }
}

function* onUpdateDistributor({ payload: distributors }) {
  try {
    const response = yield call(updateDistributor, distributors);
    yield put(updateDistributorsSuccess(response));
    toast.success("Distributor Updated Successfully", { autoClose: 2000 });
  } catch (error) {
    yield put(updateDistributorsFail(error));
    toast.error("Distributor Updated Failed", { autoClose: 2000 });
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
}

export default distributorsSaga;
