import { call, put, takeEvery } from "redux-saga/effects";

import { GET_COMPLAINTSUBCATEGORY, ADD_NEW_COMPLAINTSUBCATEGORY } from "./actionTypes";

import {
  getComplaintSubCategorySuccess,
  getComplaintSubCategoryFail,
  addComplaintSubCategorySuccess, addComplaintSubCategoryFail
} from "./actions";

//Include Both Helper File with needed methods
import { getComplaintSubCategory, addNewComplaintSubCategory } from "../../helpers/fakebackend_helper";

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
    const complaintsubcategoryList =
      convertComplaintSubCategoryListObject(response);
    yield put(getComplaintSubCategorySuccess(complaintsubcategoryList));
  } catch (error) {
    console.error("Error fetching complaint sub category list:", error);
    yield put(getComplaintSubCategoryFail(error));
  }
}

function* onAddNewComplaintSubCategory({ payload: complaintsubcategory }) {
  try {
    const response = yield call(addNewComplaintSubCategory, complaintsubcategory);

    yield put(addComplaintSubCategorySuccess(response));
    toast.success("Complaint SubCategory Added Successfully", { autoClose: 2000 });
  } catch (error) {
    yield put(addComplaintSubCategoryFail(error));
    toast.error("Complaint SubCategory Added Failed", { autoClose: 2000 });
  }
}

function* complaintSubCategorySaga() {
  yield takeEvery(GET_COMPLAINTSUBCATEGORY, fetchComplaintSubCategory);
  yield takeEvery(ADD_NEW_COMPLAINTSUBCATEGORY, onAddNewComplaintSubCategory);
}

export default complaintSubCategorySaga;
