import { call, put, takeEvery } from "redux-saga/effects";

import { GET_COMPANYLIST } from "./actionTypes";

import { getCompanyListSuccess, getCompanyListFail } from "./actions";

//Include Both Helper File with needed methods
import { getCompanyList } from "../../helpers/fakebackend_helper";

const convertCompanyListObject = (companylist) => {
  // customer user list has more data than what we need, we need to convert each of the customer user object in the list with needed colums of the table
  return companylist.map((company) => {
    return {
      ...company,
      id: company.id,
      name: company.name,
      code: company.code,
      contact: company.contact,
      mobile: company.mobile,
      phone: company.phone,
      email: company.email,
      address: company.address,
      description: company.description,
      gst_no: company.gst_no,
      tan_no: company.tan_no,
      pan_no: company.pan_no,
      status: company.status,
      created_at: company.created_at,
      created_by: company.created_at,
    };
  });
};

function* fetchCompanyList() {
  try {
    const response = yield call(getCompanyList);
    console.log("response:" + JSON.stringify(response));
    const companyList = convertCompanyListObject(response);
    yield put(getCompanyListSuccess(companyList));
  } catch (error) {
    yield put(getCompanyListFail(error));
  }
}

function* companyListSaga() {
  yield takeEvery(GET_COMPANYLIST, fetchCompanyList);
}

export default companyListSaga;
