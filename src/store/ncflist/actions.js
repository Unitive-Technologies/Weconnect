import {
  GET_NCF,
  GET_NCF_FAIL,
  GET_NCF_SUCCESS,
  ADD_NCF,
  ADD_NCF_SUCCESS,
  ADD_NCF_FAIL,
  GET_OPERATOR_FORBULKASSIGN,
  GET_OPERATOR_FORBULKASSIGN_SUCCESS,
  GET_OPERATOR_FORBULKASSIGN_FAIL,
  ADD_BULKASSIGN_NCF,
  ADD_BULKASSIGN_NCF_SUCCESS,
  ADD_BULKASSIGN_NCF_FAIL,
} from "./actionTypes";

export const getNcf = () => ({
  type: GET_NCF,
});

export const getNcfSuccess = (ncf) => {
  return {
    type: GET_NCF_SUCCESS,
    payload: ncf,
  };
};

export const getNcfFail = (error) => ({
  type: GET_NCF_FAIL,
  payload: error,
});

export const addNcf = (ncf) => ({
  type: ADD_NCF,
  payload: ncf,
});

export const addNcfSuccess = (ncf) => ({
  type: ADD_NCF_SUCCESS,
  payload: ncf,
});

export const addNcfFail = (error) => ({
  type: ADD_NCF_FAIL,
  payload: error,
});

export const getOperatorForBulkAssign = (id) => ({
  type: GET_OPERATOR_FORBULKASSIGN,
  payload: id,
});

export const getOperatorForBulkAssignSuccess = (operatorforassign) => ({
  type: GET_OPERATOR_FORBULKASSIGN_SUCCESS,
  payload: operatorforassign,
});

export const getOperatorForBulkAssignFail = (error) => ({
  type: GET_OPERATOR_FORBULKASSIGN_FAIL,
  payload: error,
});

export const addBulkAssignNcf = (bulkassign) => ({
  type: ADD_BULKASSIGN_NCF,
  payload: bulkassign,
});

export const addBulkAssignNcfSuccess = (bulkassign) => ({
  type: ADD_BULKASSIGN_NCF_SUCCESS,
  payload: bulkassign,
});

export const addBulkAssignNcfFail = (error) => ({
  type: ADD_BULKASSIGN_NCF_FAIL,
  payload: error,
});
