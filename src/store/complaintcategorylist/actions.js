import {
  GET_COMPLAINTCATEGORY,
  GET_COMPLAINTCATEGORY_FAIL,
  GET_COMPLAINTCATEGORY_SUCCESS,
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
