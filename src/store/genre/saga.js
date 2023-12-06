import { call, put, takeEvery } from "redux-saga/effects";

import { GET_GENRELIST, ADD_NEW_GENRELIST } from "./actionTypes";

import { getGenreListSuccess, getGenreListFail, addGenreListSuccess, addGenreListFail } from "./actions";

//Include Both Helper File with needed methods
import { getGenreList, addNewGenreList } from "../../helpers/fakebackend_helper";

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


function* onAddNewGenreList({ payload: GenreList }) {
  try {
    const response = yield call(addNewGenreList, GenreList);

    yield put(addGenreListSuccess(response));
    toast.success("GenreList Added Successfully", { autoClose: 2000 });
  } catch (error) {
    yield put(addGenreListFail(error));
    toast.error("GenreList Added Failed", { autoClose: 2000 });
  }
}

function* genreListSaga() {
  yield takeEvery(GET_GENRELIST, fetchGenreList);
  yield takeEvery(ADD_NEW_GENRELIST, onAddNewGenreList);
}

export default genreListSaga;
