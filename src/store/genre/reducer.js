import {
  GET_GENRELIST_SUCCESS, GET_GENRELIST_FAIL,
  ADD_GENRELIST_SUCCESS,
  ADD_GENRELIST_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  genreList: [],
  error: {},
  loading: true,
};

const GenreList = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_GENRELIST_SUCCESS:
      console.log("GenreList data in reducer:", action.payload);
      return {
        ...state,
        genreList: action.payload,
        loading: false,
      };

    case GET_GENRELIST_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case ADD_GENRELIST_SUCCESS:
      return {
        ...state,
        genreList: [
          ...state.genreList,
          action.payload,
        ],
      };

    case ADD_GENRELIST_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default GenreList;
