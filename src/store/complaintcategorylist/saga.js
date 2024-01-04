import { call, put, takeEvery } from "redux-saga/effects";

import {
  GET_COMPLAINTCATEGORY,
  GET_COMPLAINTCATEGORY_STATUS,
  ADD_NEW_COMPLAINTCATEGORY,
} from "./actionTypes";

import {
  getComplaintCategorySuccess,
  getComplaintCategoryFail,
  getComplaintCategoryStatusSuccess,
  getComplaintCategoryStatusFail,
  addComplaintCategorySuccess,
  addComplaintCategoryFail,
} from "./actions";

//Include Both Helper File with needed methods
import {
  getComplaintCategory,
  getComplaintCategoryStatus,
  addNewComplaintCategory,
} from "../../helpers/fakebackend_helper";

const convertComplaintCategoryListObject = (complaintCategoryList) => {
  // Notification Template has more data than what we need, we need to convert each of the Notification Template user object in the list with needed colums of the table
  console.log("complaint:" + JSON.stringify(complaintCategoryList));
  return complaintCategoryList.map((complaintcategory) => {
    return {
      ...complaintcategory,
      id: complaintcategory.id,
      name: complaintcategory.name,
      status_lbl: complaintcategory.status_lbl,
      category_lbl: complaintcategory.category_lbl,
      showonweb_lbl: complaintcategory.showonweb_lbl,
      description: complaintcategory.description,
      created_at: complaintcategory.created_at,
      created_by:
        complaintcategory.created_by === -1 ? "console" : "My MSO(mso)",
      status:
        complaintcategory.status === 1
          ? "ACTIVE"
          : complaintcategory.status === 0
            ? "INACTIVE"
            : "BLOCKED",
      showonweb:
        complaintcategory.showonweb === 1
          ? "ACTIVE"
          : complaintcategory.showonweb === 0
            ? "INACTIVE"
            : "BLOCKED",
    };
  });
};

function* fetchComplaintCategory() {
  try {
    const response = yield call(getComplaintCategory);
    // const complaintcategoryList = convertComplaintCategoryListObject(
    //   response.data
    // );
    yield put(getComplaintCategorySuccess(response.data));
  } catch (error) {
    console.error("Error fetching complaint category list:", error);
    yield put(getComplaintCategoryFail(error));
  }
}

function* fetchComplaintCategoryStatus() {
  try {
    const response = yield call(getComplaintCategoryStatus);
    console.log("Complaint Category status response:" + JSON.stringify(response));
    yield put(getComplaintCategoryStatusSuccess(response.data));
  } catch (error) {
    yield put(getComplaintCategoryStatusFail(error));
  }
}

function* onAddNewComplaintCategory({ payload: complaintcategory }) {
  try {
    const response = yield call(addNewComplaintCategory, complaintcategory);

    yield put(addComplaintCategorySuccess(response));
    toast.success("Complaint Category Added Successfully", { autoClose: 2000 });
  } catch (error) {
    yield put(addComplaintCategoryFail(error));
    toast.error("ComplaintCategory Added Failed", { autoClose: 2000 });
  }
}

function* complaintCategorySaga() {
  yield takeEvery(GET_COMPLAINTCATEGORY, fetchComplaintCategory);
  yield takeEvery(GET_COMPLAINTCATEGORY_STATUS, fetchComplaintCategoryStatus);
  yield takeEvery(ADD_NEW_COMPLAINTCATEGORY, onAddNewComplaintCategory);
}

export default complaintCategorySaga;
