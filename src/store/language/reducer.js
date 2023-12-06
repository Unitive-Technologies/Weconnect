import {
  GET_LANGUAGELIST_SUCCESS, GET_LANGUAGELIST_FAIL, ADD_LANGUAGELIST_SUCCESS,
  ADD_LANGUAGELIST_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  languageList: [],
  error: {},
  loading: true,
};

const LanguageList = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_LANGUAGELIST_SUCCESS:
      console.log("LanguageList data in reducer:", action.payload);
      return {
        ...state,
        languageList: action.payload,
        loading: false,
      };

    case GET_LANGUAGELIST_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case ADD_LANGUAGELIST_SUCCESS:
      return {
        ...state,
        languageList: [
          ...state.languageList,
          action.payload,
        ],
      };

    case ADD_LANGUAGELIST_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default LanguageList;
