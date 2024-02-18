import { call, put, select, takeEvery } from "redux-saga/effects";

import {
  GET_CITY,
  ADD_CITY,
  GET_DISTRICT_BYSTATEID,
  UPDATE_CITY,
} from "./actionTypes";

import {
  getCitySuccess,
  getCityFail,
  addCitySuccess,
  addCityFail,
  getDistrictByStateidSuccess,
  getDistrictByStateidFail,
  updateCitySuccess,
  updateCityFail,
  getCity as fetchCities,
} from "./actions";

//Include Both Helper File with needed methods
import {
  getCity,
  addCity,
  getDistrictByStateid,
  updateCity,
} from "../../helpers/backend_helper";
import { toast } from "react-toastify";

export const getCityStore = (state) => state.city;
// const convertCityListObject = (cityList) => {
//   // customer city list has more data than what we need, we need to convert each of the city user object in the list with needed colums of the table
//   return cityList.map((city) => {
//     return {
//       ...city,
//       id: city.id,
//       name: city.name,
//       code: city.code,
//       state_lbl: city.state_lbl,
//       state_code_lbl: city.state_code_lbl,
//       district_lbl: city.district_lbl,
//       district_code_lbl: city.district_code_lbl,
//       description: city.description,
//       status: city.status,
//       created_at: city.created_at,
//       created_by_lbl: city.created_by_lbl,
//       type: city.type,
//       state_id: city.state_id,
//       district_id: city.district_id,
//     };
//   });
// };

function* fetchCity() {
  try {
    let CityStore = yield select(getCityStore);
    console.log("City store in saga: ", CityStore);
    const pageSize = CityStore.pageSize;
    const currentPage = CityStore.currentPage;

    const response = yield call(getCity, currentPage, pageSize);
    console.log("Response from API -", response);
    // debugger;
    yield put(getCitySuccess(response));
  } catch (error) {
    console.error("Error fetching City list:", error);
    yield put(getCityFail(error));
  }
}
// function* fetchCity() {
//   try {
//     const response = yield call(getCity);
//     const cityList = convertCityListObject(response.data);
//     yield put(getCitySuccess(cityList));
//   } catch (error) {
//     yield put(getCityFail(error));
//   }
// }

function* fetchDistrictByStateId({ payload: state_id }) {
  console.log("Selected state id: ", state_id);
  try {
    const response = yield call(getDistrictByStateid, state_id);
    console.log("Fetch district by state id in saga: ", response);
    yield put(getDistrictByStateidSuccess(response.data));
  } catch (error) {
    console.log("Error getting district list by state id: ", error);
    yield put(getDistrictByStateidFail(error));
  }
}

function* onUpdateCity({ payload: city }) {
  try {
    const response = yield call(updateCity, city.id, city);
    console.log("Response data in saga: ", response);
    yield put(updateCitySuccess(response.data));
    yield put(fetchCities());
  } catch (error) {
    console.log("Error in update city: ", error);
    yield put(updateCityFail(error));
  }
}

function* onAddCity({ payload: city }) {
  try {
    const response = yield call(addCity, city);
    console.log("Response data in add city: ", response);
    yield put(addCitySuccess(response));
    yield put(fetchCities());
  } catch (error) {
    console.log("Error in add city saga: ", error);
    yield put(addCityFail(error));
  }
}

function* citySaga() {
  yield takeEvery(GET_CITY, fetchCity);
  yield takeEvery(ADD_CITY, onAddCity);
  yield takeEvery(GET_DISTRICT_BYSTATEID, fetchDistrictByStateId);
  yield takeEvery(UPDATE_CITY, onUpdateCity);
}

export default citySaga;
