import { call, put, takeEvery } from "redux-saga/effects";
import {
  GET_NCF,
  ADD_NCF,
  UPDATE_NCF,
  GET_OPERATOR_FORBULKASSIGN,
  ADD_BULKASSIGN_NCF,
} from "./actionTypes";
import {
  getNcf as fetchAllNcf,
  getNcfSuccess,
  getNcfFail,
  addNcfSuccess,
  addNcfFail,
  getOperatorForBulkAssignSuccess,
  getOperatorForBulkAssignFail,
  addBulkAssignNcfSuccess,
  addBulkAssignNcfFail,
  updateNcfFail,
  updateNcfSuccess,
} from "./actions";
import {
  getNcf,
  addNcf,
  getOperatorForBulkAssign,
  addBulkAssignNcf,
  updateNcf,
} from "../../helpers/backend_helper";

const convertNcfListObject = (ncflist) => {
  return ncflist.map((ncf) => {
    return {
      ...ncf,
      id: ncf.id,
      name: ncf.name,
      code: ncf.code,
      status: ncf.status === 1 ? "Active" : "In_active",
      from_channel_no: ncf.from_channel_no,
      to_channel_no: ncf.to_channel_no,
      mrp: ncf.mrp,
      lmo_discount: ncf.lmo_discount,
      lmo_rate: ncf.lmo_rate,
      calculate_per_channel: ncf.calculate_per_channel === 0 ? "Yes" : "No",
      is_refundable: ncf.is_refundable === 1 ? "Yes" : "No",
      created_at: ncf.created_at,
      created_by: ncf.created_by === -1 ? "console" : "other",
      status_lbl: ncf.status_lbl,
      additional_rates: ncf.additional_rates,
      _id: ncf.additional_rates._id,
      ncf_id: ncf.additional_rates.ncf_id,
      operator_id: ncf.additional_rates.operator_id,
    };
  });
};

const convertOperatorForAssignListObject = (operatorforassign) => {
  return operatorforassign.map((operator) => {
    return {
      ...operator,
      id: operator.id,
      name: operator.name,
      code: operator.code,
      status_lbl: operator.status_lbl,
      branch_lbl: operator.branch_lbl,
      type_lbl: operator.type_lbl,
      distributor_lbl: operator.distributor_lbl,
    };
  });
};

function* fetchNcf() {
  try {
    const response = yield call(getNcf);
    // const ncfList = convertNcfListObject(response.data);
    yield put(getNcfSuccess(response.data));
  } catch (error) {
    yield put(getNcfFail(error));
  }
}

function* onAddNcf({ payload: ncf }) {
  try {
    const response = yield call(addNcf, ncf);
    yield put(addNcfSuccess(response));
    yield put(fetchAllNcf());
  } catch (error) {
    yield put(addNcfFail(error));
  }
}

function* fetchOperatorForBulkAssign({ payload: id }) {
  console.log("Selected row id in saga: ", id);
  try {
    const response = yield call(getOperatorForBulkAssign, id);
    console.log("Operator data in saga: ", response.data);
    const operatorforassign = convertOperatorForAssignListObject(response.data);
    yield put(getOperatorForBulkAssignSuccess(operatorforassign));
  } catch (error) {
    console.log("error in fetch Operator For BulkAssign at ncf", error);
    yield put(getOperatorForBulkAssignFail(error));
  }
}

function* onAddBulkAssignNcf({ payload: bulkassign }) {
  try {
    const response = yield call(addBulkAssignNcf, bulkassign);
    yield put(addBulkAssignNcfSuccess(response));
  } catch (error) {
    yield put(addBulkAssignNcfFail(error));
  }
}

function* onUpdateNcf({ payload: ncf }) {
  console.log("ncf in onUpdate:" + JSON.stringify(ncf));
  try {
    const response = yield call(updateNcf, ncf, ncf.id);
    yield put(updateNcfSuccess(response));
    yield put(fetchAllNcf());
    console.log("update response:" + JSON.stringify(response));
    // toast.success("Designation Updated Successfully", { autoClose: 2000 });
  } catch (error) {
    yield put(updateNcfFail(error));
    // toast.error("Designation Updated Failed", { autoClose: 2000 });
  }
}

function* ncfSaga() {
  yield takeEvery(GET_NCF, fetchNcf);
  yield takeEvery(ADD_NCF, onAddNcf);
  yield takeEvery(GET_OPERATOR_FORBULKASSIGN, fetchOperatorForBulkAssign);
  yield takeEvery(ADD_BULKASSIGN_NCF, onAddBulkAssignNcf);
  yield takeEvery(UPDATE_NCF, onUpdateNcf);
}

export default ncfSaga;
