import {
  GET_CONFIGURATIONUPLOADLOGS_SUCCESS,
  GET_CONFIGURATIONUPLOADLOGS_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  configurationuploadlogs: [],
  error: {},
  loading: true,
};

const ConfigurationUploadLogs = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_CONFIGURATIONUPLOADLOGS_SUCCESS:
      console.log("Configuration Upload logs data in reducer:", action.payload);
      return {
        ...state,
        configurationuploadlogs: action.payload,
        loading: false,
      };

    case GET_CONFIGURATIONUPLOADLOGS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default ConfigurationUploadLogs;
