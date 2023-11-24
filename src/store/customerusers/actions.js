import {
  GET_CUSTOMERUSERS,
  GET_CUSTOMERUSERS_FAIL,
  GET_CUSTOMERUSERS_SUCCESS,
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