import { call, put, takeEvery } from "redux-saga/effects";

import { GET_INVENTORYSTATELIST, ADD_INVENTORYSTATELIST } from "./actionTypes";

import {
  getInventoryStateListSuccess,
  getInventoryStateListFail,
  addInventoryStateListSuccess,
  addInventoryStateListFail,
} from "./actions";

//Include Both Helper File with needed methods
import {
  getInventoryStateList,
  addInventoryStateList,
} from "../../helpers/fakebackend_helper";

const convertInventoryStateListObject = (inventorystatelist) => {
  // customer user list has more data than what we need, we need to convert each of the customer user object in the list with needed colums of the table
  return inventorystatelist.map((inventorystate) => {
    return {
      ...inventorystate,
      id: inventorystate.id,
      name: inventorystate.name,
      code: inventorystate.code,
      statetype: inventorystate.state_type_lbl,
      description: inventorystate.description,
      status: inventorystate.status_lbl,
      created_at: inventorystate.created_at,
      created_by: inventorystate.created_by_lbl,
    };
  });
};

function* fetchInventoryStateList() {
  try {
    const response = yield call(getInventoryStateList);
    console.log("response:" + JSON.stringify(response));
    const inventoryStateList = convertInventoryStateListObject(response);
    yield put(getInventoryStateListSuccess(inventoryStateList));
  } catch (error) {
    yield put(getInventoryStateListFail(error));
  }
}

function* onAddInventoryState({ payload: inventorystatelist }) {
  try {
    const response = yield call(addInventoryStateList, inventorystatelist);
    yield put(addInventoryStateListSuccess(response));
  } catch (error) {
    yield put(addInventoryStateListFail(error));
  }
}

function* inventoryStateListSaga() {
  yield takeEvery(GET_INVENTORYSTATELIST, fetchInventoryStateList);
  yield takeEvery(ADD_INVENTORYSTATELIST, onAddInventoryState);
}

export default inventoryStateListSaga;
