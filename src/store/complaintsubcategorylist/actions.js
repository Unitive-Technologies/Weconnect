import {
  GET_COMPLAINTSUBCATEGORY,
  GET_COMPLAINTSUBCATEGORY_FAIL,
  GET_COMPLAINTSUBCATEGORY_SUCCESS,
  GET_COMPLAINTSUBCATEGORY_STATUS,
  GET_COMPLAINTSUBCATEGORY_STATUS_FAIL,
  GET_COMPLAINTSUBCATEGORY_STATUS_SUCCESS,
  GET_COMPLAINTSUBCATEGORY_CATEGORY,
  GET_COMPLAINTSUBCATEGORY_CATEGORY_FAIL,
  GET_COMPLAINTSUBCATEGORY_CATEGORY_SUCCESS,
  GET_COMPLAINTSUBCATEGORY_DESIGNATION,
  GET_COMPLAINTSUBCATEGORY_DESIGNATION_FAIL,
  GET_COMPLAINTSUBCATEGORY_DESIGNATION_SUCCESS,
  ADD_NEW_COMPLAINTSUBCATEGORY,
  ADD_COMPLAINTSUBCATEGORY_SUCCESS,
  ADD_COMPLAINTSUBCATEGORY_FAIL,
  UPDATE_COMPLAINTSUBCATEGORY,
  UPDATE_COMPLAINTSUBCATEGORY_FAIL,
  UPDATE_COMPLAINTSUBCATEGORY_SUCCESS,
} from "./actionTypes";

export const getComplaintSubCategory = () => ({
  type: GET_COMPLAINTSUBCATEGORY,
});

export const getComplaintSubCategorySuccess = (complaintsubcategory) => {
  console.log("Received Complaint sub Category list:", complaintsubcategory);
  return {
    type: GET_COMPLAINTSUBCATEGORY_SUCCESS,
    payload: complaintsubcategory,
  };
};

export const getComplaintSubCategoryFail = (error) => ({
  type: GET_COMPLAINTSUBCATEGORY_FAIL,
  payload: error,
});

export const getComplaintSubCategoryStatus = () => ({
  type: GET_COMPLAINTSUBCATEGORY_STATUS,
});

export const getComplaintSubCategoryStatusSuccess = (
  complaintsubcategoryStatus
) => {
  return {
    type: GET_COMPLAINTSUBCATEGORY_STATUS_SUCCESS,
    payload: complaintsubcategoryStatus,
  };
};

export const getComplaintSubCategoryStatusFail = (error) => ({
  type: GET_COMPLAINTSUBCATEGORY_STATUS_FAIL,
  payload: error,
});

export const getComplaintSubCategoryDesignation = () => ({
  type: GET_COMPLAINTSUBCATEGORY_DESIGNATION,
});

export const getComplaintSubCategoryDesignationSuccess = (
  complaintsubcategoryDesignation
) => {
  return {
    type: GET_COMPLAINTSUBCATEGORY_DESIGNATION_SUCCESS,
    payload: complaintsubcategoryDesignation,
  };
};

export const getComplaintSubCategoryDesignationFail = (error) => ({
  type: GET_COMPLAINTSUBCATEGORY_DESIGNATION_FAIL,
  payload: error,
});

export const getComplaintSubCategoryCategory = () => ({
  type: GET_COMPLAINTSUBCATEGORY_CATEGORY,
});

export const getComplaintSubCategoryCategorySuccess = (
  complaintsubcategoryCategory
) => {
  return {
    type: GET_COMPLAINTSUBCATEGORY_CATEGORY_SUCCESS,
    payload: complaintsubcategoryCategory,
  };
};

export const getComplaintSubCategoryCategoryFail = (error) => ({
  type: GET_COMPLAINTSUBCATEGORY_CATEGORY_FAIL,
  payload: error,
});

export const addNewComplaintSubCategory = (complaintsubcategory) => ({
  type: ADD_NEW_COMPLAINTSUBCATEGORY,
  payload: complaintsubcategory,
});

export const addComplaintSubCategorySuccess = (complaintsubcategory) => ({
  type: ADD_COMPLAINTSUBCATEGORY_SUCCESS,
  payload: complaintsubcategory,
});

export const addComplaintSubCategoryFail = (error) => ({
  type: ADD_COMPLAINTSUBCATEGORY_FAIL,
  payload: error,
});

export const updateComplaintSubCategory = (complaintcategory) => ({
  type: UPDATE_COMPLAINTSUBCATEGORY,
  payload: complaintcategory,
});

export const updateComplaintSubCategorySuccess = (complaintcategory) => ({
  type: UPDATE_COMPLAINTSUBCATEGORY_SUCCESS,
  payload: complaintcategory,
});

export const updateComplaintSubCategoryFail = (error) => ({
  type: UPDATE_COMPLAINTSUBCATEGORY_FAIL,
  payload: error,
});
