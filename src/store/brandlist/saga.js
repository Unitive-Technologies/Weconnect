import { call, put, takeEvery } from "redux-saga/effects";
import { GET_BRANDLIST, ADD_BRANDLIST } from "./actionTypes";
import {
  getBrandListSuccess,
  getBrandListFail,
  addBrandListSuccess,
  addBrandListFail,
} from "./actions";
import { getBrandList, addBrandList } from "../../helpers/fakebackend_helper";
import { toast } from "react-toastify";

const convertBrandListObject = (brandlist) => {
  return brandlist.map((brand) => {
    return {
      ...brand,
      id: brand.id,
      name: brand.name,
      code: brand.code,
      box_type_lbl: brand.box_type_lbl,
      brand_type_lbl: brand.brand_type_lbl,
      length: brand.length,
      significant_length: brand.significant_length,
      char_allowed_lbl: brand.char_allowed_lbl,
      cas_lbl: brand.cas_lbl,
      status: brand.status_lbl,
      created_at: brand.created_at,
      created_by: brand.created_by_lbl,
    };
  });
};

function* fetchBrandList() {
  try {
    const response = yield call(getBrandList);
    console.log("response:" + JSON.stringify(response));
    const brandList = convertBrandListObject(response);
    yield put(getBrandListSuccess(brandList));
  } catch (error) {
    yield put(getBrandListFail(error));
  }
}

function* onAddBrandList({ payload: brandlist }) {
  try {
    const response = yield call(addBrandList, brandlist);
    yield put(addBrandListSuccess(response));
    // toast.success("Brand list Added Successfully", { autoClose: 2000 });
  } catch (error) {
    yield put(addBrandListFail(error));
    // toast.error("Brand list Added Failed", { autoClose: 2000 });
  }
}

function* brandListSaga() {
  yield takeEvery(GET_BRANDLIST, fetchBrandList);
  yield takeEvery(ADD_BRANDLIST, onAddBrandList);
}

export default brandListSaga;
