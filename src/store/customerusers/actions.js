import {
  GET_CUSTOMERUSERS,
  GET_CUSTOMERUSERS_FAIL,
  GET_CUSTOMERUSERS_SUCCESS,
  UPDATE_CUSTOMERUSER,
  UPDATE_CUSTOMERUSER_SUCCESS,
  UPDATE_CUSTOMERUSER_FAIL,
  GET_CUSTOMERUSERS_SETTINGS,
  GET_CUSTOMERUSERS_SETTINGS_FAIL,
  GET_CUSTOMERUSERS_SETTINGS_SUCCESS,
} from "./actionTypes";

export const getCustomerUsers = () => ({
  type: GET_CUSTOMERUSERS,
});

export const getCustomerUsersSuccess = (customerUsers) => {
  console.log("Received Customer Users:", customerUsers);
  return {
    type: GET_CUSTOMERUSERS_SUCCESS,
    payload: customerUsers,
  };
};

export const getCustomerUsersFail = (error) => ({
  type: GET_CUSTOMERUSERS_FAIL,
  payload: error,
});

export const updateCustomerUser = (customerUser) => ({
  type: UPDATE_CUSTOMERUSER,
  payload: customerUser,
});

export const updateCustomerUserSuccess = (customerUser) => ({
  type: UPDATE_CUSTOMERUSER_SUCCESS,
  payload: customerUser,
});

export const updateCustomerUserFail = (error) => ({
  type: UPDATE_CUSTOMERUSER_FAIL,
  payload: error,
});

export const getCustomerUsersSettings = () => ({
  type: GET_CUSTOMERUSERS_SETTINGS,
});

export const getCustomerUsersSettingsSuccess = (customerUsersSettings) => {
  console.log("Received Customer Users Settings:", customerUsersSettings);
  return {
    type: GET_CUSTOMERUSERS_SETTINGS_SUCCESS,
    payload: customerUsersSettings,
  };
};

export const getCustomerUsersSettingsFail = (error) => ({
  type: GET_CUSTOMERUSERS_SETTINGS_FAIL,
  payload: error,
});
