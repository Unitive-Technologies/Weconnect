import { call, put, takeEvery } from "redux-saga/effects";

import { GET_BOUQUET } from "./actionTypes";

import { getBouquetSuccess, getBouquetFail } from "./actions";

//Include Both Helper File with needed methods
import { getBouquet } from "../../helpers/fakebackend_helper";

const convertBouquetListObject = (bouquetList) => {
  // Notification Template has more data than what we need, we need to convert each of the Notification Template user object in the list with needed colums of the table
  return bouquetList.map((bouquet) => {
    return {
      ...bouquet,
      id: bouquet.id,
      name: bouquet.name,
      code: bouquet.code,
      category_lbl: bouquet.category_lbl,
      type_lbl: bouquet.type_lbl,
      boxtype_lbl: bouquet.boxtype_lbl,
      description: bouquet.description,
      created_at: bouquet.created_at,
      created_by: bouquet.created_by === -1 ? "console" : "My MSO(mso)",
      status:
        bouquet.status === 1
          ? "ACTIVE"
          : bouquet.status === 0
          ? "INACTIVE"
          : "BLOCKED",
    };
  });
};

function* fetchBouquet() {
  try {
    const response = yield call(getBouquet);
    const bouquetList = convertBouquetListObject(response);
    yield put(getBouquetSuccess(bouquetList));
  } catch (error) {
    console.error("Error fetching bouquet list:", error);
    yield put(getBouquetFail(error));
  }
}

function* bouquetSaga() {
  yield takeEvery(GET_BOUQUET, fetchBouquet);
}

export default bouquetSaga;
