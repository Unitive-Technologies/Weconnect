import {
  GET_COMPLAINTSUBCATEGORY,
  GET_COMPLAINTSUBCATEGORY_FAIL,
  GET_COMPLAINTSUBCATEGORY_SUCCESS,
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
