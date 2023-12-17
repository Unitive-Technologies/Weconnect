import {
  GET_COMPLAINTSUBCATEGORY,
  GET_COMPLAINTSUBCATEGORY_FAIL,
  GET_COMPLAINTSUBCATEGORY_SUCCESS,
  ADD_NEW_COMPLAINTSUBCATEGORY,
  ADD_COMPLAINTSUBCATEGORY_SUCCESS,
  ADD_COMPLAINTSUBCATEGORY_FAIL,
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

export const addNewComplaintSubCategory = (
  complaintsubcategory
) => ({
  type: ADD_NEW_COMPLAINTSUBCATEGORY,
  payload: complaintsubcategory,
});

export const addComplaintSubCategorySuccess = (
  complaintsubcategory
) => ({
  type: ADD_COMPLAINTSUBCATEGORY_SUCCESS,
  payload: complaintsubcategory,
});

export const addComplaintSubCategoryFail = (error) => ({
  type: ADD_COMPLAINTSUBCATEGORY_FAIL,
  payload: error,
});