import { call, put, select, takeEvery } from "redux-saga/effects";
import {
  GET_BOUQUET,
  ADD_BOUQUET,
  UPDATE_BOUQUET,
  GET_BOUQUETTYPE,
  GET_BOUQUET_STATUS,
  GET_BOUQUET_BOXTYPE,
  GET_BOUQUEX,
  GET_ALACARTECHANNELS,
  GET_BOUQUET_PACKAGES,
  GET_BOUQUET_TAXLIST,
  GET_RECHARGEPERIOD,
  GET_OPERATOR_FORBOUQUET,
} from "./actionTypes";
import {
  getBouquet as fetchAllBouquets,
  getBouquetSuccess,
  getBouquetFail,
  addBouquetSuccess,
  addBouquetFail,
  updateBouquetFail,
  updateBouquetSuccess,
  getAlacarteChannelsSuccess,
  getAlacarteChannelsFail,
  getBouquetBoxtypeSuccess,
  getBouquetBoxtypeFail,
  getBouquetPackagesSuccess,
  getBouquetPackagesFail,
  getBouquetTaxlistSuccess,
  getBouquetTaxlistFail,
  getBouquetTypeSuccess,
  getBouquetTypeFail,
  getRechargePeriodSuccess,
  getRechargePeriodFail,
  getBouquexSuccess,
  getBouquexFail,
  getOperatorForBouquetSuccess,
  getOperatorForBouquetFail,
  getBouquetStatusSuccess,
  getBouquetStatusFail,
} from "./actions";
import {
  getBouquet,
  addBouquet,
  updateBouquet,
  getAlacarteChannels,
  getBouquetBoxtype,
  getBouquetPackages,
  getBouquetTaxlist,
  getBouquetType,
  getBouquetStatus,
  getBouquex,
  getRechargePeriod,
  getOperatorForBouquet,
} from "../../helpers/backend_helper";

export const getBouquetStore = (state) => state.bouquet;

function* fetchBouquet() {
  try {
    let BouquetStore = yield select(getBouquetStore);

    const pageSize = BouquetStore.pageSize;
    const currentPage = BouquetStore.currentPage;

    const response = yield call(getBouquet, currentPage, pageSize);
    console.log("Response from API -", response);
    yield put(getBouquetSuccess(response));
  } catch (error) {
    console.error("Error fetching Bouquet list:", error);
    yield put(getBouquetFail(error));
  }
}

// function* fetchBouquet() {
//   try {
//     const response = yield call(getBouquet);
//     const bouquetList = convertBouquetListObject(response.data);
//     yield put(getBouquetSuccess(bouquetList));
//   } catch (error) {
//     console.error("Error fetching bouquet list:", error);
//     yield put(getBouquetFail(error));
//   }
// }

function* onAddBouquet({ payload: bouquet }) {
  try {
    const response = yield call(addBouquet, bouquet);
    yield put(addBouquetSuccess(response));
    yield put(fetchAllBouquets());
  } catch (error) {
    yield put(addBouquetFail(error));
  }
}

function* fetchBouquetType() {
  try {
    const response = yield call(getBouquetType);
    yield put(getBouquetTypeSuccess(response.data));
  } catch (error) {
    console.error("Error fetching bouquet type list: ", error);
    yield put(getBouquetTypeFail(error));
  }
}

function* fetchBouquetStatus() {
  try {
    const response = yield call(getBouquetStatus);
    yield put(getBouquetStatusSuccess(response.data));
  } catch (error) {
    console.error("Error fetching bouquet status list: ", error);
    yield put(getBouquetStatusFail(error));
  }
}

function* fetchBouquetBoxtype() {
  try {
    const response = yield call(getBouquetBoxtype);
    yield put(getBouquetBoxtypeSuccess(response.data));
  } catch (error) {
    console.error("Error fetching bouquet boxtype list: ", error);
    yield put(getBouquetBoxtypeFail(error));
  }
}

function* fetchBouquetTaxlist() {
  try {
    const response = yield call(getBouquetTaxlist);
    yield put(getBouquetTaxlistSuccess(response.data));
  } catch (error) {
    console.error("Error fetching bouquet tax list: ", error);
    yield put(getBouquetTaxlistFail(error));
  }
}

function* fetchBouquetPackages() {
  try {
    const response = yield call(getBouquetPackages);
    yield put(getBouquetPackagesSuccess(response.data));
  } catch (error) {
    console.error("Error fetching bouquet Packages list: ", error);
    yield put(getBouquetPackagesFail(error));
  }
}

function* fetchRechargePeriod() {
  try {
    const response = yield call(getRechargePeriod);
    yield put(getRechargePeriodSuccess(response.data));
  } catch (error) {
    console.error("Error fetching Recharge period: ", error);
    yield put(getRechargePeriodFail(error));
  }
}

function* fetchBouquex() {
  try {
    const response = yield call(getBouquex);
    yield put(getBouquexSuccess(response.data));
  } catch (error) {
    console.error("Error fetching bouquex : ", error);
    yield put(getBouquexFail(error));
  }
}

function* fetchAlacarteChannels() {
  try {
    const response = yield call(getAlacarteChannels);
    yield put(getAlacarteChannelsSuccess(response.data));
  } catch (error) {
    console.error("Error fetching alacarte channels:", error);
    yield put(getAlacarteChannelsFail(error));
  }
}

function* fetchOperatorForBouquet({ payload: id }) {
  try {
    const response = yield call(getOperatorForBouquet(id));
    yield put(getOperatorForBouquetSuccess(response.data));
  } catch (error) {
    console.error("Error fetching Operator in bouquet: ", error);
    yield put(getOperatorForBouquetFail(error));
  }
}

function* onUpdateBouquet({ payload: bouquet }) {
  try {
    const response = yield call(updateBouquet, bouquet, bouquet.id);
    yield put(updateBouquetSuccess(response));
    yield put(fetchAllBouquets());
  } catch (error) {
    yield put(updateBouquetFail(error));
  }
}

function* bouquetSaga() {
  yield takeEvery(GET_BOUQUET, fetchBouquet);
  yield takeEvery(ADD_BOUQUET, onAddBouquet);
  yield takeEvery(GET_BOUQUETTYPE, fetchBouquetType);
  yield takeEvery(GET_BOUQUET_BOXTYPE, fetchBouquetBoxtype);
  yield takeEvery(GET_BOUQUET_TAXLIST, fetchBouquetTaxlist);
  yield takeEvery(GET_BOUQUET_PACKAGES, fetchBouquetPackages);
  yield takeEvery(GET_RECHARGEPERIOD, fetchRechargePeriod);
  yield takeEvery(GET_BOUQUEX, fetchBouquex);
  yield takeEvery(GET_ALACARTECHANNELS, fetchAlacarteChannels);
  yield takeEvery(GET_OPERATOR_FORBOUQUET, fetchOperatorForBouquet);
  yield takeEvery(GET_BOUQUET_STATUS, fetchBouquetStatus);
  yield takeEvery(UPDATE_BOUQUET, onUpdateBouquet);
}

export default bouquetSaga;
