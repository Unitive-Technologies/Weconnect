import {
  GET_CONFIGURATIONUPLOADLOGS,
  GET_CONFIGURATIONUPLOADLOGS_FAIL,
  GET_CONFIGURATIONUPLOADLOGS_SUCCESS,
} from "./actionTypes";

export const getConfigurationUploadLogs = () => ({
  type: GET_CONFIGURATIONUPLOADLOGS,
});

export const getConfigurationUploadLogsSuccess = (configurationuploadlogs) => {
  console.log("Received Configuration upload logs:", configurationuploadlogs);
  return {
    type: GET_CONFIGURATIONUPLOADLOGS_SUCCESS,
    payload: configurationuploadlogs,
  };
};

export const getConfigurationUploadLogsFail = (error) => ({
  type: GET_CONFIGURATIONUPLOADLOGS_FAIL,
  payload: error,
});
