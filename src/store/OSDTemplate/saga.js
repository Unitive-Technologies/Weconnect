import { call, put, takeEvery } from "redux-saga/effects";

import { GET_OSDTEMPLATE, ADD_NEW_OSDTEMPLATE } from "./actionTypes";

import { getOSDTemplateSuccess, getOSDTemplateFail, addOSDTemplateSuccess, addOSDTemplateFail } from "./actions";

//Include Both Helper File with needed methods
import { getOSDTemplate, addNewOSDTemplate } from "../../helpers/fakebackend_helper";

const convertOSDTemplateListObject = (osdTemplate) => {
  return osdTemplate.map((osdTemp) => {
    return {
      ...osdTemp,
      id: osdTemp.id,
      name: osdTemp.name,
      template_for_lbl: osdTemp.template_for_lbl,
      status_lbl:
        osdTemp.status_lbl === 1
          ? "ACTIVE"
          : osdTemp.status_lbl === 0
            ? "INACTIVE"
            : "BLOCKED",
      operator_count: osdTemp.operator_count,
      created_at: osdTemp.created_at,
      created_by_lbl: osdTemp.created_by_lbl,
    };
  });
};

function* fetchOSDTemplate() {
  try {
    const response = yield call(getOSDTemplate);
    console.log("response:" + JSON.stringify(response));
    // const osdTemplateList = convertOSDTemplateListObject(response);
    yield put(getOSDTemplateSuccess(response.data));
  } catch (error) {
    yield put(getOSDTemplateFail(error));
  }
}

function* onAddNewOSDTemplate({ payload: OSDTemplate }) {
  try {
    const response = yield call(addNewOSDTemplate, OSDTemplate);

    yield put(addOSDTemplateSuccess(response));
    toast.success("OSDTemplate Added Successfully", { autoClose: 2000 });
  } catch (error) {
    yield put(addOSDTemplateFail(error));
    toast.error("OSDTemplate Added Failed", { autoClose: 2000 });
  }
}

function* osdTemplateSaga() {
  yield takeEvery(GET_OSDTEMPLATE, fetchOSDTemplate);
  yield takeEvery(ADD_NEW_OSDTEMPLATE, onAddNewOSDTemplate);
}

export default osdTemplateSaga;
