import {
  GET_GENRELIST,
  GET_GENRELIST_FAIL,
  GET_GENRELIST_SUCCESS,
  GET_GENRELIST_STATUS,
  GET_GENRELIST_STATUS_FAIL,
  GET_GENRELIST_STATUS_SUCCESS,
  ADD_NEW_GENRELIST,
  ADD_GENRELIST_SUCCESS,
  ADD_GENRELIST_FAIL,
  UPDATE_GENRELIST,
  UPDATE_GENRELIST_SUCCESS,
  UPDATE_GENRELIST_FAIL,
} from "./actionTypes";

export const getGenreList = () => ({
  type: GET_GENRELIST,
});

export const getGenreListSuccess = (genrelist) => {
  console.log("Received Genre List:", genrelist);
  return {
    type: GET_GENRELIST_SUCCESS,
    payload: genrelist,
  };
};

export const getGenreListFail = (error) => ({
  type: GET_GENRELIST_FAIL,
  payload: error,
});

export const updateGenreList = (genrelist) => ({
  type: UPDATE_GENRELIST,
  payload: genrelist,
});

export const updateGenreListSuccess = (genrelist) => ({
  type: UPDATE_GENRELIST_SUCCESS,
  payload: genrelist,
});

export const updateGenreListFail = (error) => ({
  type: UPDATE_GENRELIST_FAIL,
  payload: error,
});

export const addNewGenreList = (
  genrelist
) => ({
  type: ADD_NEW_GENRELIST,
  payload: genrelist,
});

export const addGenreListSuccess = (
  genrelist
) => ({
  type: ADD_GENRELIST_SUCCESS,
  payload: genrelist,
});

export const addGenreListFail = (error) => ({
  type: ADD_GENRELIST_FAIL,
  payload: error,
});

export const getGenreListStatus = () => ({
  type: GET_GENRELIST_STATUS,
});

export const getGenreListStatusSuccess = (genrelistStatus) => {

  return {
    type: GET_GENRELIST_STATUS_SUCCESS,
    payload: genrelistStatus,
  };
};

export const getGenreListStatusFail = (error) => ({
  type: GET_GENRELIST_STATUS_FAIL,
  payload: error,
});