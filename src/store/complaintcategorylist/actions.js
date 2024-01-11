import {
  GET_COMPLAINTCATEGORY,
  GET_COMPLAINTCATEGORY_FAIL,
  GET_COMPLAINTCATEGORY_SUCCESS,
  GET_COMPLAINTCATEGORY_STATUS,
  GET_COMPLAINTCATEGORY_STATUS_FAIL,
  GET_COMPLAINTCATEGORY_STATUS_SUCCESS,
  ADD_NEW_COMPLAINTCATEGORY,
  ADD_COMPLAINTCATEGORY_SUCCESS,
  ADD_COMPLAINTCATEGORY_FAIL,
  UPDATE_COMPLAINTCATEGORY,
  UPDATE_COMPLAINTCATEGORY_FAIL,
  UPDATE_COMPLAINTCATEGORY_SUCCESS,
} from "./actionTypes";

export const getComplaintCategory = () => ({
  type: GET_COMPLAINTCATEGORY,
});

export const getComplaintCategorySuccess = (complaintcategory) => {
  console.log("Received Complaint Category list:", complaintcategory);
  return {
    type: GET_COMPLAINTCATEGORY_SUCCESS,
    payload: complaintcategory,
  };
};

export const getComplaintCategoryFail = (error) => ({
  type: GET_COMPLAINTCATEGORY_FAIL,
  payload: error,
});

export const updateComplaintCategory = (complaintcategory) => ({
  type: UPDATE_COMPLAINTCATEGORY,
  payload: complaintcategory,
});

export const updateComplaintCategorySuccess = (complaintcategory) => ({
  type: UPDATE_COMPLAINTCATEGORY_SUCCESS,
  payload: complaintcategory,
});

export const updateComplaintCategoryFail = (error) => ({
  type: UPDATE_COMPLAINTCATEGORY_FAIL,
  payload: error,
});


export const getComplaintCategoryStatus = () => ({
  type: GET_COMPLAINTCATEGORY_STATUS,
});

export const getComplaintCategoryStatusSuccess = (complaintcategoryStatus) => {
  return {
    type: GET_COMPLAINTCATEGORY_STATUS_SUCCESS,
    payload: complaintcategoryStatus,
  };
};

export const getComplaintCategoryStatusFail = (error) => ({
  type: GET_COMPLAINTCATEGORY_STATUS_FAIL,
  payload: error,
});


export const addNewComplaintCategory = (
  complaintcategory
) => ({
  type: ADD_NEW_COMPLAINTCATEGORY,
  payload: complaintcategory,
});

export const addComplaintCategorySuccess = (
  complaintcategory
) => ({
  type: ADD_COMPLAINTCATEGORY_SUCCESS,
  payload: complaintcategory,
});

export const addComplaintCategoryFail = (error) => ({
  type: ADD_COMPLAINTCATEGORY_FAIL,
  payload: error,
});