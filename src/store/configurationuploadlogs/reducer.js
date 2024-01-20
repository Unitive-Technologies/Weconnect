import {
  RESPONSE_HEADER_CURRENT_PAGE,
  RESPONSE_HEADER_PAGE_COUNT,
  RESPONSE_HEADER_TOTAL_COUNT,
  RESPONSE_HEADER_PER_PAGE,
} from "../../constants/strings";

import {
  GET_CONFIGURATIONUPLOADLOGS,
  GET_CONFIGURATIONUPLOADLOGS_SUCCESS,
  GET_CONFIGURATIONUPLOADLOGS_FAIL,
  UPDATE_CONFIGURATIONUPLOADLOGS_CURRENT_PAGE,
} from "./actionTypes";

const INIT_STATE = {
  configurationuploadlogs: [],
  pagination: {},
  error: {},
  loading: false,
  currentPage: 1,
  perPage: 10,
  totalCount: 0,
  totalPages: 0,
};

const ConfigurationUploadLogs = (state = INIT_STATE, action) => {
  switch (action.type) {

    case UPDATE_CONFIGURATIONUPLOADLOGS_CURRENT_PAGE:
      return Number(action.payload) <= state.totalPages
        ? {
          ...state,
          currentPage: action.payload,
        }
        : state;
    case GET_CONFIGURATIONUPLOADLOGS:
      return {
        ...state,
        loading: true,
      };
    case GET_CONFIGURATIONUPLOADLOGS_SUCCESS:
      console.log("Configuration Upload logs data in reducer:", action.payload);
      return {
        ...state,
        configurationuploadlogs: action.payload.data.data,
        currentPage: action.payload.headers[RESPONSE_HEADER_CURRENT_PAGE],
        perPage: action.payload.headers[RESPONSE_HEADER_PER_PAGE],
        totalCount: action.payload.headers[RESPONSE_HEADER_TOTAL_COUNT],
        totalPages: action.payload.headers[RESPONSE_HEADER_PAGE_COUNT],
        loading: false,
      };

    case GET_CONFIGURATIONUPLOADLOGS_FAIL:
      return {
        ...state,
        error: action.payload,
        pagination: {},
        loading: false,
      };

    default:
      return state;
  }
};

export default ConfigurationUploadLogs;
