import {
  GET_ADMINDETAILS,
  GET_ADMINDETAILS_FAIL,
  GET_ADMINDETAILS_SUCCESS,
} from "./actionTypes";

export const getAdmindetails = () => ({
  type: GET_ADMINDETAILS,
});

export const getAdmindetailsSuccess = (admindetails) => {
  console.log("Received Admin Details:", admindetails);
  return {
    type: GET_ADMINDETAILS_SUCCESS,
    payload: admindetails,
  };
};

export const getAdmindetailsFail = (error) => ({
  type: GET_ADMINDETAILS_FAIL,
  payload: error,
});
