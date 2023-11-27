import { call, put, takeEvery } from "redux-saga/effects";

import { GET_GENRELIST } from "./actionTypes";

import { getGenreListSuccess, getGenreListFail } from "./actions";

//Include Both Helper File with needed methods
import { getGenreList } from "../../helpers/fakebackend_helper";

const convertGenreListObject = (genreList) => {
  // customer user list has more data than what we need, we need to convert each of the customer user object in the list with needed colums of the table
  return genreList.map((genre) => {
    return {
      ...genre,
      id: genre.id,
      name: genre.name,
      code: genre.code,
      description: genre.description,
      status:
        genre.status === 1
          ? "ACTIVE"
          : genre.status === 0
          ? "INACTIVE"
          : "BLOCKED",
      created_at: genre.created_at,
      created_by: genre.created_at,
    };
  });
};

function* fetchGenreList() {
  try {
    const response = yield call(getGenreList);
    console.log("response:" + JSON.stringify(response));
    const genreList = convertGenreListObject(response);
    yield put(getGenreListSuccess(genreList));
  } catch (error) {
    yield put(getGenreListFail(error));
  }
}

function* genreListSaga() {
  yield takeEvery(GET_GENRELIST, fetchGenreList);
}

export default genreListSaga;
