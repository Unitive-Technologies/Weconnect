import {
  GET_GENRELIST,
  GET_GENRELIST_FAIL,
  GET_GENRELIST_SUCCESS,
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
