import { call, put, select, takeEvery } from "redux-saga/effects";

import { GET_DOCUMENTUPLOADPOLICY, ADD_NEW_DOCUMENTUPLOADPOLICY } from "./actionTypes";

import {
  getDocumentUploadPolicySuccess,
  getDocumentUploadPolicyFail,
  addDocumentUploadPolicySuccess, addDocumentUploadPolicyFail
} from "./actions";

//Include Both Helper File with needed methods
import { getDocumentUploadPolicy, addNewDocumentUploadPolicy } from "../../helpers/fakebackend_helper";

export const getDocumentUploadPolicyStore = (state) => state.documentUploadPolicy;

function* fetchDocumentUploadPolicy() {
  try {
    let DocumentUploadPolicyStore = yield select(getDocumentUploadPolicyStore);

    const pageSize = DocumentUploadPolicyStore.pageSize;
    const currentPage = DocumentUploadPolicyStore.currentPage;

    const response = yield call(getDocumentUploadPolicy, currentPage, pageSize);
    console.log("Response from API -", response);
    // debugger;
    yield put(getDocumentUploadPolicySuccess(response));
  } catch (error) {
    console.error("Error fetching Document Upload Policy:", error);
    yield put(getDocumentUploadPolicyFail(error));
  }
}

function* onAddNewDocumentUploadPolicy({ payload: documentUploadPolicy }) {
  try {
    const response = yield call(addNewDocumentUploadPolicy, documentUploadPolicy);
    yield put(addDocumentUploadPolicySuccess(response));
    toast.success("DocumentUploadPolicy Added Successfully", { autoClose: 2000 });
  } catch (error) {
    yield put(addDocumentUploadPolicyFail(error));
    toast.error("DocumentUploadPolicy Added Failed", { autoClose: 2000 });
  }
}

function* documentUploadPolicySaga() {
  yield takeEvery(GET_DOCUMENTUPLOADPOLICY, fetchDocumentUploadPolicy);
  yield takeEvery(ADD_NEW_DOCUMENTUPLOADPOLICY, onAddNewDocumentUploadPolicy);
}

export default documentUploadPolicySaga;
