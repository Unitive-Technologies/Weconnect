import { call, put, takeEvery } from "redux-saga/effects";

import { GET_OSDTEMPLATE } from "./actionTypes";

import { getOSDTemplateSuccess, getOSDTemplateFail } from "./actions";

//Include Both Helper File with needed methods
import { getOSDTemplate } from "../../helpers/fakebackend_helper";

const convertOSDTemplateListObject = (osdTemplateList) => {
  return osdTemplateList.map((osdTemplate) => {
    return {
      ...osdTemplate,
      id: osdTemplate.id,
      name: osdTemplate.name,
      template_for_lbl: osdTemplate.template_for_lbl,
      status_lbl:
        osdTemplate.status_lbl === 1
          ? "ACTIVE"
          : osdTemplate.status_lbl === 0
            ? "INACTIVE"
            : "BLOCKED",
      operator_count: osdTemplate.operator_count,
      created_at: osdTemplate.created_at,
      created_by_lbl: osdTemplate.created_by_lbl,
    };
  });
};

function* fetchOSDTemplate() {
  try {
    const response = yield call(getOSDTemplate);
    console.log("response:" + JSON.stringify(response));
    const osdTemplateList = convertOSDTemplateListObject(response);
    yield put(getOSDTemplateSuccess(osdTemplateList));
  } catch (error) {
    yield put(getOSDTemplateFail(error));
  }
}

function* osdTemplateSaga() {
  yield takeEvery(GET_OSDTEMPLATE, fetchOSDTemplate);
}

export default osdTemplateSaga;
