import { call, put, takeEvery } from "redux-saga/effects";

import { GET_CITY, ADD_CITY, GET_DISTRICT_BYSTATEID } from "./actionTypes";

import {
  getCitySuccess,
  getCityFail,
  addCitySuccess,
  addCityFail,
  getDistrictByStateidSuccess,
  getDistrictByStateidFail,
} from "./actions";

//Include Both Helper File with needed methods
import {
  getCity,
  addCity,
  getDistrictByStateid,
} from "../../helpers/fakebackend_helper";
import { toast } from "react-toastify";

const convertCityListObject = (cityList) => {
  // customer city list has more data than what we need, we need to convert each of the city user object in the list with needed colums of the table
  return cityList.map((city) => {
    return {
      ...city,
      id: city.id,
      name: city.name,
      code: city.code,
      state_lbl: city.state_lbl,
      state_code_lbl: city.state_code_lbl,
      district_lbl: city.district_lbl,
      district_code_lbl: city.district_code_lbl,
      description: city.description,
      status: city.status,
      created_at: city.created_at,
      created_by_lbl: city.created_by_lbl,
      type: city.type,
      state_id: city.state_id,
      district_id: city.district_id,
    };
  });
};

function* fetchCity() {
  try {
    const response = yield call(getCity);
    const cityList = convertCityListObject(response.data);
    yield put(getCitySuccess(cityList));
  } catch (error) {
    yield put(getCityFail(error));
  }
}

function* fetchDistrictByStateId() {
  try {
    const response = yield call(getDistrictByStateid);
    yield put(getDistrictByStateidSuccess(response.data));
  } catch (error) {
    console.log("Error getting district list by state id: ", error);
    yield put(getDistrictByStateidFail(error));
  }
}

function* onAddCity({ payload: city }) {
  try {
    const response = yield call(addCity, city);
    console.log("Response data in add city: ", response);
    yield put(addCitySuccess(response));
  } catch (error) {
    console.log("Error in add city saga: ", error);
    yield put(addCityFail(error));
  }
}

function* citySaga() {
  yield takeEvery(GET_CITY, fetchCity);
  yield takeEvery(ADD_CITY, onAddCity);
  yield takeEvery(GET_DISTRICT_BYSTATEID, fetchDistrictByStateId);
}

export default citySaga;
