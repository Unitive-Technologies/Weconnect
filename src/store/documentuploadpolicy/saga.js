import { call, put, takeEvery } from "redux-saga/effects";

import { GET_DOCUMENTUPLOADPOLICY, ADD_NEW_DOCUMENTUPLOADPOLICY } from "./actionTypes";

import {
  getDocumentUploadPolicySuccess,
  getDocumentUploadPolicyFail,
  addDocumentUploadPolicySuccess, addDocumentUploadPolicyFail
} from "./actions";

//Include Both Helper File with needed methods
import { getDocumentUploadPolicy, addNewDocumentUploadPolicy } from "../../helpers/fakebackend_helper";

const convertDocumentUploadPolicyListObject = (documentUploadPolicyList) => {
  // customer user list has more data than what we need, we need to convert each of the customer user object in the list with needed colums of the table
  // return localChannelNumberList.map((localChannelNumber) => {
  return documentUploadPolicyList.map((documentUploadPolicy) => {
    console.log("lcno. :" + JSON.stringify(documentUploadPolicy));
    return {
      ...documentUploadPolicy,
      id: documentUploadPolicy.id,
      name: documentUploadPolicy.name,
      code: documentUploadPolicy.code,
      policystartdate: documentUploadPolicy.policystartdate,
      policyuploaddate: documentUploadPolicy.policyuploaddate,
      initiatedby: documentUploadPolicy.initiatedby,
      approvedby: documentUploadPolicy.approvedby,
      financialyear: documentUploadPolicy.financialyear,
      remark: documentUploadPolicy.remark,
      createdat: documentUploadPolicy.createdat,
      status: documentUploadPolicy.status,
      createdat: documentUploadPolicy.createdat,
      createdby: documentUploadPolicy.createdby,
    };
  });
};

function* fetchDocumentUploadPolicy() {
  try {
    const response = yield call(getDocumentUploadPolicy);
    console.log("response:" + JSON.stringify(response));
    const documentUploadPolicyList =
      convertDocumentUploadPolicyListObject(response);
    yield put(getDocumentUploadPolicySuccess(documentUploadPolicyList));
  } catch (error) {
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
