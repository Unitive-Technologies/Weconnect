import { call, put, select, takeEvery } from "redux-saga/effects";

import { GET_GENRELIST, UPDATE_GENRELIST, GET_GENRELIST_STATUS, ADD_NEW_GENRELIST } from "./actionTypes";

import {
  getGenreListSuccess,
  getGenreListFail,
  updateGenreListSuccess,
  updateGenreListFail,
  getGenreListStatusSuccess,
  getGenreListStatusFail,
  addGenreListSuccess,
  addGenreListFail,
} from "./actions";

//Include Both Helper File with needed methods
import {
  getGenreList,
  updateGenreList,
  getGenreListStatus,
  addNewGenreList,
} from "../../helpers/fakebackend_helper";

// const convertGenreListObject = (genreList) => {
//   // customer user list has more data than what we need, we need to convert each of the customer user object in the list with needed colums of the table
//   return genreList.map((genre) => {
//     return {
//       ...genre,
//       id: genre.id,
//       name: genre.name,
//       code: genre.code,
//       description: genre.description,
//       status:
//         genre.status === 1
//           ? "ACTIVE"
//           : genre.status === 0
//             ? "INACTIVE"
//             : "BLOCKED",
//       created_at: genre.created_at,
//       created_by: genre.created_at,
//     };
//   });
// };

export const getGenreListStore = (state) => state.genreList;

function* fetchGenreList() {
  try {
    let genreListStore = yield select(getGenreListStore);

    const pageSize = genreListStore.pageSize;
    const currentPage = genreListStore.currentPage;

    const response = yield call(getGenreList, currentPage, pageSize);
    console.log("Response from API -", response);
    // debugger;
    yield put(getGenreListSuccess(response));
  } catch (error) {
    console.error("Error fetching Genre list:", error);
    yield put(getGenreListFail(error));
  }
}

function* onUpdateGenreList({ payload: genreList }) {
  console.log("Genre List in onUpdate:" + JSON.stringify(genreList));
  try {
    const response = yield call(
      updateGenreList,
      genreList,
      genreList.id
    );
    yield put(updateGenreListSuccess(response));
    console.log("update response:" + JSON.stringify(response));
  } catch (error) {
    yield put(updateGenreListFail(error));
  }
}

function* fetchGenreListStatus() {
  try {
    const response = yield call(getGenreListStatus);
    console.log("Genre List status response:" + JSON.stringify(response));
    yield put(getGenreListStatusSuccess(response.data));
  } catch (error) {
    yield put(getGenreListStatusFail(error));
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
  yield takeEvery(GET_GENRELIST_STATUS, fetchGenreListStatus);
  yield takeEvery(ADD_NEW_GENRELIST, onAddNewGenreList);
  yield takeEvery(UPDATE_GENRELIST, onUpdateGenreList);
}

export default genreListSaga;
