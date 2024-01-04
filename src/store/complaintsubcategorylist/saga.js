import { call, put, takeEvery } from "redux-saga/effects";

import {
  GET_COMPLAINTSUBCATEGORY, GET_COMPLAINTSUBCATEGORY_STATUS
  , GET_COMPLAINTSUBCATEGORY_DESIGNATION, GET_COMPLAINTSUBCATEGORY_CATEGORY, ADD_NEW_COMPLAINTSUBCATEGORY
} from "./actionTypes";

import {
  getComplaintSubCategorySuccess,
  getComplaintSubCategoryFail,
  getComplaintSubCategoryStatusSuccess,
  getComplaintSubCategoryStatusFail,
  getComplaintSubCategoryDesignationSuccess,
  getComplaintSubCategoryDesignationFail,
  getComplaintSubCategoryCategorySuccess,
  getComplaintSubCategoryCategoryFail,
  addComplaintSubCategorySuccess, addComplaintSubCategoryFail
} from "./actions";

//Include Both Helper File with needed methods
import { getComplaintSubCategory, getComplaintSubCategoryDesignation, getComplaintSubCategoryCategory, getComplaintSubCategoryStatus, addNewComplaintSubCategory } from "../../helpers/fakebackend_helper";

const convertComplaintSubCategoryListObject = (complaintSubCategoryList) => {
  // Notification Template has more data than what we need, we need to convert each of the Notification Template user object in the list with needed colums of the table
  return complaintSubCategoryList.map((complaintsubcategory) => {
    return {
      ...complaintsubcategory,
      id: complaintsubcategory.id,
      name: complaintsubcategory.name,
      status_lbl: complaintsubcategory.status_lbl,
      category_lbl: complaintsubcategory.category_lbl,
      showonweb_lbl: complaintsubcategory.showonweb_lbl,
      description: complaintsubcategory.description,
      created_at: complaintsubcategory.created_at,
      created_by:
        complaintsubcategory.created_by === -1 ? "console" : "My MSO(mso)",
      status:
        complaintsubcategory.status === 1
          ? "ACTIVE"
          : complaintsubcategory.status === 0
            ? "INACTIVE"
            : "BLOCKED",
      showonweb:
        complaintsubcategory.showonweb === 1
          ? "ACTIVE"
          : complaintsubcategory.showonweb === 0
            ? "INACTIVE"
            : "BLOCKED",
    };
  });
};

function* fetchComplaintSubCategory() {
  try {
    const response = yield call(getComplaintSubCategory);
    // const complaintsubcategoryList =
    //   convertComplaintSubCategoryListObject(response);
    yield put(getComplaintSubCategorySuccess(response.data));
  } catch (error) {
    yield put(getComplaintSubCategoryFail(error));
  }
}

function* fetchComplaintSubCategoryStatus() {
  try {
    const response = yield call(getComplaintSubCategoryStatus);
    console.log("ComplaintSubCategory status response:" + JSON.stringify(response));
    yield put(getComplaintSubCategoryStatusSuccess(response.data));
  } catch (error) {
    yield put(getComplaintSubCategoryStatusFail(error));
  }
}

function* fetchComplaintSubCategoryCategory() {
  try {
    const response = yield call(getComplaintSubCategoryCategory);
    console.log("ComplaintSubCategory Category response:" + JSON.stringify(response));
    yield put(getComplaintSubCategoryCategorySuccess(response.data));
  } catch (error) {
    yield put(getComplaintSubCategoryCategoryFail(error));
  }
}

function* fetchComplaintSubCategoryDesignation() {
  try {
    const response = yield call(getComplaintSubCategoryDesignation);
    console.log("ComplaintSubCategory Designation response:" + JSON.stringify(response));
    yield put(getComplaintSubCategoryDesignationSuccess(response.data));
  } catch (error) {
    yield put(getComplaintSubCategoryDesignationFail(error));
  }
}

function* onAddNewComplaintSubCategory({ payload: complaintsubcategory }) {
  try {
    const response = yield call(addNewComplaintSubCategory, complaintsubcategory);

    yield put(addComplaintSubCategorySuccess(response.data));
    // toast.success("Complaint SubCategory Added Successfully", { autoClose: 2000 });
  } catch (error) {
    yield put(addComplaintSubCategoryFail(error));
    // toast.error("Complaint SubCategory Added Failed", { autoClose: 2000 });
  }
}

function* complaintSubCategorySaga() {
  yield takeEvery(GET_COMPLAINTSUBCATEGORY, fetchComplaintSubCategory);
  yield takeEvery(GET_COMPLAINTSUBCATEGORY_STATUS, fetchComplaintSubCategoryStatus);
  yield takeEvery(GET_COMPLAINTSUBCATEGORY_DESIGNATION, fetchComplaintSubCategoryDesignation);
  yield takeEvery(GET_COMPLAINTSUBCATEGORY_CATEGORY, fetchComplaintSubCategoryCategory);
  yield takeEvery(ADD_NEW_COMPLAINTSUBCATEGORY, onAddNewComplaintSubCategory);
}

export default complaintSubCategorySaga;
