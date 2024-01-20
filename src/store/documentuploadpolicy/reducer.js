import {
  RESPONSE_HEADER_CURRENT_PAGE,
  RESPONSE_HEADER_PAGE_COUNT,
  RESPONSE_HEADER_TOTAL_COUNT,
  RESPONSE_HEADER_PER_PAGE,
} from "../../constants/strings";

import {
  GET_DOCUMENTUPLOADPOLICY,
  GET_DOCUMENTUPLOADPOLICY_SUCCESS,
  GET_DOCUMENTUPLOADPOLICY_FAIL,
  ADD_DOCUMENTUPLOADPOLICY_SUCCESS,
  ADD_DOCUMENTUPLOADPOLICY_FAIL,
  UPDATE_DOCUMENTUPLOADPOLICY_CURRENT_PAGE,
} from "./actionTypes";

const INIT_STATE = {
  documentUploadPolicy: [],
  pagination: {},
  error: {},
  loading: false,
  currentPage: 1,
  perPage: 10,
  totalCount: 0,
  totalPages: 0,
};

const DocumentUploadPolicy = (state = INIT_STATE, action) => {
  switch (action.type) {

    case UPDATE_DOCUMENTUPLOADPOLICY_CURRENT_PAGE:
      return Number(action.payload) <= state.totalPages
        ? {
          ...state,
          currentPage: action.payload,
        }
        : state;
    case GET_DOCUMENTUPLOADPOLICY:
      return {
        ...state,
        loading: true,
      };

    case GET_DOCUMENTUPLOADPOLICY_SUCCESS:
      console.log("Document Upload data in reducer:", action.payload);
      return {
        ...state,
        documentUploadPolicy: action.payload.data.data,
        currentPage: action.payload.headers[RESPONSE_HEADER_CURRENT_PAGE],
        perPage: action.payload.headers[RESPONSE_HEADER_PER_PAGE],
        totalCount: action.payload.headers[RESPONSE_HEADER_TOTAL_COUNT],
        totalPages: action.payload.headers[RESPONSE_HEADER_PAGE_COUNT],
        loading: false,
      };

    case GET_DOCUMENTUPLOADPOLICY_FAIL:
      return {
        ...state,
        error: action.payload,
        pagination: {},
        loading: false,
      };

    case ADD_DOCUMENTUPLOADPOLICY_SUCCESS:
      return {
        ...state,
        documentUploadPolicy: [
          ...state.documentUploadPolicy,
          action.payload,
        ],
      };

    case ADD_DOCUMENTUPLOADPOLICY_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default DocumentUploadPolicy;
