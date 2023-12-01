import { call, put, takeEvery } from "redux-saga/effects";

import { GET_COMPLAINTCATEGORY } from "./actionTypes";

import {
  getComplaintCategorySuccess,
  getComplaintCategoryFail,
} from "./actions";

//Include Both Helper File with needed methods
import { getComplaintCategory } from "../../helpers/fakebackend_helper";

const convertComplaintCategoryListObject = (complaintCategoryList) => {
  // Notification Template has more data than what we need, we need to convert each of the Notification Template user object in the list with needed colums of the table
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
    const complaintcategoryList = convertComplaintCategoryListObject(response);
    yield put(getComplaintCategorySuccess(complaintcategoryList));
  } catch (error) {
    console.error("Error fetching complaint category list:", error);
    yield put(getComplaintCategoryFail(error));
  }
}

function* complaintCategorySaga() {
  yield takeEvery(GET_COMPLAINTCATEGORY, fetchComplaintCategory);
}

export default complaintCategorySaga;