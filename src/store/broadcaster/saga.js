import { call, put, select, takeEvery } from "redux-saga/effects";

import { GET_BROADCASTER, UPDATE_BROADCASTER, GET_BROADCASTER_STATUS, ADD_NEW_BROADCASTER } from "./actionTypes";

import {
  getBroadCaster as fetchbroadcasters,
  getBroadCasterSuccess,
  getBroadCasterFail,
  updateBroadCasterSuccess,
  updateBroadCasterFail,
  getBroadCasterStatusSuccess,
  getBroadCasterStatusFail,
  addBroadCasterSuccess,
  addBroadCasterFail,
} from "./actions";

//Include Both Helper File with needed methods
import {
  getBroadCaster,
  updateBroadCasters,
  getBroadCastersStatus,
  addNewBroadCaster,
} from "../../helpers/fakebackend_helper";
import { toast } from "react-toastify";

// const convertBroadCasterListObject = (broadCasterList) => {
//   // customer user list has more data than what we need, we need to convert each of the customer user object in the list with needed colums of the table
//   return broadCasterList.map((broadCaster) => {
//     return {
//       ...broadCaster,
//       id: broadCaster.id,
//       name: broadCaster.name,
//       fullname: broadCaster.fullname,
//       addr: broadCaster.addr,
//       contact_person: broadCaster.contact_person,
//       phone_no: broadCaster.phone_no,
//       mobile_no: broadCaster.mobile_no,
//       email: broadCaster.email,
//       status:
//         broadCaster.status === 1
//           ? "ACTIVE"
//           : broadCaster.status === 0
//             ? "INACTIVE"
//             : "BLOCKED",
//       description: broadCaster.description,
//       created_at: broadCaster.created_at,
//       created_by: broadCaster.created_by,
//     };
//   });
// };

// function* fetchBroadCasters() {
//   try {
//     const response = yield call(getBroadCasters);
//     console.log("response:" + JSON.stringify(response));
//     const broadCasterList = convertBroadCasterListObject(response.data);
//     yield put(getBroadCasterSuccess(broadCasterList));
//   } catch (error) {
//     yield put(getBroadCasterFail(error));
//   }
// }

export const getBroadCasterStore = (state) => state.broadCasters;

function* fetchBroadCasters() {
  try {
    let broadCasterStore = yield select(getBroadCasterStore);

    const pageSize = broadCasterStore.pageSize;
    const currentPage = broadCasterStore.currentPage;

    const response = yield call(getBroadCaster, currentPage, pageSize);
    console.log("Response from API -", response);
    // debugger;
    yield put(getBroadCasterSuccess(response));
  } catch (error) {
    console.error("Error fetching broadcaster list:", error);
    yield put(getBroadCasterFail(error));
  }
}

function* onUpdateBroadCasters({ payload: broadCasters }) {
  console.log("broad Casters in onUpdate:" + JSON.stringify(broadCasters));
  try {
    const response = yield call(
      updateBroadCasters,
      broadCasters,
      broadCasters.id
    );
    yield put(updateBroadCasterSuccess(response));
    console.log("update response:" + JSON.stringify(response));
    // toast.success("CustomerUser Updated Successfully", { autoClose: 2000 });
  } catch (error) {
    yield put(updateBroadCasterFail(error));
    toast.error("Broad Caster Updated Failed", { autoClose: 2000 });
  }
}

function* fetchBroadCastersStatus() {
  try {
    const response = yield call(getBroadCastersStatus);
    console.log("BroadCasters status response:" + JSON.stringify(response));
    yield put(getBroadCasterStatusSuccess(response.data));
  } catch (error) {
    yield put(getBroadCasterStatusFail(error));
  }
}

function* onAddNewBroadCaster({ payload: broadCaster }) {
  try {
    const response = yield call(addNewBroadCaster, broadCaster);
    yield put(addBroadCasterSuccess(response));
    yield put(fetchbroadcasters());
  } catch (error) {
    yield put(addBroadCasterFail(error));
  }
}

function* broadCasterSaga() {
  yield takeEvery(GET_BROADCASTER, fetchBroadCasters);
  yield takeEvery(GET_BROADCASTER_STATUS, fetchBroadCastersStatus);
  yield takeEvery(ADD_NEW_BROADCASTER, onAddNewBroadCaster);
  yield takeEvery(UPDATE_BROADCASTER, onUpdateBroadCasters);
}

export default broadCasterSaga;
