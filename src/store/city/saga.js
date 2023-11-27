import { call, put, takeEvery } from "redux-saga/effects";

import { GET_CITY } from "./actionTypes";

import { getCitySuccess, getCityFail } from "./actions";

//Include Both Helper File with needed methods
import { getCity } from "../../helpers/fakebackend_helper";

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
      status:
        city.status === 1
          ? "ACTIVE"
          : city.status === 0
            ? "INACTIVE"
            : "BLOCKED",

      // status_lbl:
      //   city.status_lbl === 1
      //     ? "ACTIVE"
      //     : city.status_lbl === 0
      //       ? "INACTIVE"
      //       : "BLOCKED",
      created_at: city.created_at,
      created_by_lbl: city.created_by_lbl,
    };
  });
};

function* fetchCity() {
  try {
    const response = yield call(getCity);
    console.log("response:" + JSON.stringify(response));
    const cityList = convertCityListObject(response);
    yield put(getCitySuccess(cityList));
  } catch (error) {
    yield put(getCityFail(error));
  }
}

function* citySaga() {
  yield takeEvery(GET_CITY, fetchCity);
}

export default citySaga;
