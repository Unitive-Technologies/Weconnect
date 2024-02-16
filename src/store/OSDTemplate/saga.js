import { call, put, select, takeEvery } from "redux-saga/effects";

import { GET_OSDTEMPLATE, UPDATE_OSDTEMPLATE, GET_OSDTEMPLATE_STATUS, GET_OSDTEMPLATE_OSD, GET_OSDTEMPLATE_TEMPLATEFOR, ADD_NEW_OSDTEMPLATE } from "./actionTypes";

import {
  getOSDTemplate as fetchOSDTemplates,
  getOSDTemplateSuccess, getOSDTemplateFail,
  addOSDTemplateSuccess,
  addOSDTemplateFail,
  getOSDTemplateStatusSuccess, getOSDTemplateStatusFail, getOSDTemplateOSDSuccess, getOSDTemplateOSDFail, getOSDTemplateTemplateForSuccess, getOSDTemplateTemplateForFail,
  updateOSDTemplateSuccess, updateOSDTemplateFail,
} from "./actions";

//Include Both Helper File with needed methods
import { getOSDTemplate, getOSDTemplateStatus, getOSDTemplateOSD, getOSDTemplateTemplateFor, addNewOSDTemplate, updateOSDTemplate } from "../../helpers/fakebackend_helper";

// const convertOSDTemplateListObject = (osdTemplate) => {
//   return osdTemplate.map((osdTemp) => {
//     return {
//       ...osdTemp,
//       id: osdTemp.id,
//       name: osdTemp.name,
//       title: osdTemp.title,
//       template_for: osdTemp.template_for,
//       template_message: osdTemp.template_message,
//       showcontent: osdTemp.showcontent,
//       casconfig: osdTemp.casconfig,
//       bmailtitle: osdTemp.bmailtitle,
//       content: osdTemp.content,
//       status: osdTemp.status,
//       template_config_id: osdTemp.template_config_id,
//       template_for_lbl: osdTemp.template_for_lbl,
//       status_lbl:
//         osdTemp.status_lbl === 1
//           ? "ACTIVE"
//           : osdTemp.status_lbl === 0
//             ? "INACTIVE"
//             : "BLOCKED",
//       operator_count: osdTemp.operator_count,
//       created_at: osdTemp.created_at,
//       created_by_lbl: osdTemp.created_by_lbl,
//     };
//   });
// };

export const getOSDTemplateStore = (state) => state.osdTemplate;


function* fetchOSDTemplate() {
  try {
    let OSDTemplateStore = yield select(getOSDTemplateStore);

    const pageSize = OSDTemplateStore.pageSize;
    const currentPage = OSDTemplateStore.currentPage;

    const response = yield call(getOSDTemplate, currentPage, pageSize);
    console.log("Response from API -", response);
    // debugger;
    yield put(getOSDTemplateSuccess(response));
  } catch (error) {
    console.error("Error fetching OSD Template list:", error);
    yield put(getOSDTemplateFail(error));
  }
}


function* onUpdateOSDTemplate({ payload: OSDTemplate }) {
  console.log("OSDTemplate in onUpdate:" + JSON.stringify(OSDTemplate));
  try {
    const response = yield call(
      updateOSDTemplate,
      OSDTemplate.id,
      OSDTemplate,
    );
    yield put(updateOSDTemplateSuccess(response));
    console.log("update response:" + JSON.stringify(response));
    yield put(fetchOSDTemplates());
  } catch (error) {
    yield put(updateOSDTemplateFail(error));
  }
}

function* fetchOSDTemplateStatus() {
  try {
    const response = yield call(getOSDTemplateStatus);
    console.log("OSD Template status response:" + JSON.stringify(response));
    yield put(getOSDTemplateStatusSuccess(response.data));
  } catch (error) {
    yield put(getOSDTemplateStatusFail(error));
  }
}

function* fetchOSDTemplateOSD() {
  try {
    const response = yield call(getOSDTemplateOSD);
    console.log("OSD Template OSD response:" + JSON.stringify(response));
    yield put(getOSDTemplateOSDSuccess(response.data));
  } catch (error) {
    yield put(getOSDTemplateOSDFail(error));
  }
}

function* fetchOSDTemplateTemplateFor() {
  try {
    const response = yield call(getOSDTemplateTemplateFor);
    console.log("OSD Template For response:" + JSON.stringify(response));
    yield put(getOSDTemplateTemplateForSuccess(response.data));
  } catch (error) {
    yield put(getOSDTemplateTemplateForFail(error));
  }
}

function* onAddNewOSDTemplate({ payload: OSDTemplate }) {
  try {
    const response = yield call(addNewOSDTemplate, OSDTemplate);

    yield put(addOSDTemplateSuccess(response.data));
    // toast.success("OSDTemplate Added Successfully", { autoClose: 2000 });
    yield put(fetchOSDTemplates());
  } catch (error) {
    yield put(addOSDTemplateFail(error));
    // toast.error("OSDTemplate Added Failed", { autoClose: 2000 });
  }
}

function* osdTemplateSaga() {
  yield takeEvery(GET_OSDTEMPLATE, fetchOSDTemplate);
  yield takeEvery(GET_OSDTEMPLATE_STATUS, fetchOSDTemplateStatus);
  yield takeEvery(GET_OSDTEMPLATE_OSD, fetchOSDTemplateOSD);
  yield takeEvery(GET_OSDTEMPLATE_TEMPLATEFOR, fetchOSDTemplateTemplateFor);
  yield takeEvery(ADD_NEW_OSDTEMPLATE, onAddNewOSDTemplate);
  yield takeEvery(UPDATE_OSDTEMPLATE, onUpdateOSDTemplate);
}

export default osdTemplateSaga;
