import {
  GET_USER_PROFILE,
  GET_USER_PROFILE_FAIL,
  GET_USER_PROFILE_SUCCESS,
  GET_USERS,
  GET_USERS_FAIL,
  GET_USERS_SUCCESS,
  ADD_NEW_USER,
  ADD_USER_SUCCESS,
  ADD_USER_FAIL,
  UPDATE_USER,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  DELETE_USER,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  GET_USER_TYPE,
  GET_USER_TYPE_FAIL,
  GET_USER_TYPE_SUCCESS,
  GET_USER_STATUS,
  GET_USER_STATUS_FAIL,
  GET_USER_STATUS_SUCCESS,
  GET_USER_ROLE,
  GET_USER_ROLE_FAIL,
  GET_USER_ROLE_SUCCESS,
  GET_USER_DESIGNATION,
  GET_USER_DESIGNATION_FAIL,
  GET_USER_DESIGNATION_SUCCESS,
  GET_USER_MSO_POLICY,
  GET_USER_MSO_POLICY_FAIL,
  GET_USER_MSO_POLICY_SUCCESS,
  GET_USER_REGIONALOFFICE,
  GET_USER_REGIONALOFFICE_SUCCESS,
  GET_USER_REGIONALOFFICE_FAIL,
  GET_USER_MSO_DETAILS,
  GET_USER_MSO_DETAILS_SUCCESS,
  GET_USER_MSO_DETAILS_FAIL,
  GET_USER_DISTRIBUTOR,
  GET_USER_DISTRIBUTOR_FAIL,
  GET_USER_DISTRIBUTOR_SUCCESS,
} from "./actionTypes";

export const getUsers = () => ({
  type: GET_USERS,
});

export const getUsersSuccess = (users) => {
  console.log("Received users:", users);
  return {
    type: GET_USERS_SUCCESS,
    payload: users,
  };
};

export const addNewUser = (users) => ({
  type: ADD_NEW_USER,
  payload: users,
});

export const addUserSuccess = (users) => ({
  type: ADD_USER_SUCCESS,
  payload: users,
});

export const addUserFail = (error) => ({
  type: ADD_USER_FAIL,
  payload: error,
});

export const getUsersFail = (error) => ({
  type: GET_USERS_FAIL,
  payload: error,
});

export const getUserProfile = () => ({
  type: GET_USER_PROFILE,
});

export const getUserProfileSuccess = (userProfile) => ({
  type: GET_USER_PROFILE_SUCCESS,
  payload: userProfile,
});

export const getUserProfileFail = (error) => ({
  type: GET_USER_PROFILE_FAIL,
  payload: error,
});

export const updateUser = (user) => ({
  type: UPDATE_USER,
  payload: user,
});

export const updateUserSuccess = (user) => ({
  type: UPDATE_USER_SUCCESS,
  payload: user,
});

export const updateUserFail = (error) => ({
  type: UPDATE_USER_FAIL,
  payload: error,
});

export const deleteUser = (user) => ({
  type: DELETE_USER,
  payload: user,
});

export const deleteUserSuccess = (user) => ({
  type: DELETE_USER_SUCCESS,
  payload: user,
});

export const deleteUserFail = (error) => ({
  type: DELETE_USER_FAIL,
  payload: error,
});

export const getUserType = () => ({
  type: GET_USER_TYPE,
});

export const getUserTypeSuccess = (userType) => ({
  type: GET_USER_TYPE_SUCCESS,
  payload: userType,
});

export const getUserTypeFail = (error) => ({
  type: GET_USER_TYPE_FAIL,
  payload: error,
});

export const getUserStatus = () => ({
  type: GET_USER_STATUS,
});

export const getUserStatusSuccess = (userStatus) => ({
  type: GET_USER_STATUS_SUCCESS,
  payload: userStatus,
});

export const getUserStatusFail = (error) => ({
  type: GET_USER_STATUS_FAIL,
  payload: error,
});

export const getUserRole = () => ({
  type: GET_USER_ROLE,
});

export const getUserRoleSuccess = (userRole) => ({
  type: GET_USER_ROLE_SUCCESS,
  payload: userRole,
});

export const getUserRoleFail = (error) => ({
  type: GET_USER_ROLE_FAIL,
  payload: error,
});

export const getUserDesignation = () => ({
  type: GET_USER_DESIGNATION,
});

export const getUserDesignationSuccess = (userDesignation) => ({
  type: GET_USER_DESIGNATION_SUCCESS,
  payload: userDesignation,
});

export const getUserDesignationFail = (error) => ({
  type: GET_USER_DESIGNATION_FAIL,
  payload: error,
});

export const getUserMsoPolicy = () => ({
  type: GET_USER_MSO_POLICY,
});

export const getUserMsoPolicySuccess = (msoPolicy) => ({
  type: GET_USER_MSO_POLICY_SUCCESS,
  payload: msoPolicy,
});

export const getUserMsoPolicyFail = (error) => ({
  type: GET_USER_MSO_POLICY_FAIL,
  payload: error,
});

export const getUserRegionalOffice = () => ({
  type: GET_USER_REGIONALOFFICE,
});

export const getUserRegionalOfficeSuccess = (regional) => ({
  type: GET_USER_REGIONALOFFICE_SUCCESS,
  payload: regional,
});

export const getUserRegionalOfficeFail = (error) => ({
  type: GET_USER_REGIONALOFFICE_FAIL,
  payload: error,
});

export const getUserMsoDetails = () => ({
  type: GET_USER_MSO_DETAILS,
});

export const getUserMsoDetailsSuccess = (userMsoDetails) => ({
  type: GET_USER_MSO_DETAILS_SUCCESS,
  payload: userMsoDetails,
});

export const getUserMsoDetailsFail = (error) => ({
  type: GET_USER_MSO_DETAILS_FAIL,
  payload: error,
});

export const getUserDistributor = () => ({
  type: GET_USER_DISTRIBUTOR,
});

export const getUserDistributorSuccess = (userDistributor) => ({
  type: GET_USER_DISTRIBUTOR_SUCCESS,
  payload: userDistributor,
});

export const getUserDistributorFail = (error) => ({
  type: GET_USER_DISTRIBUTOR_FAIL,
  payload: error,
});
