import {
  GET_GROUPPOLICY,
  GET_GROUPPOLICY_FAIL,
  GET_GROUPPOLICY_SUCCESS,
  ADD_NEW_GROUPPOLICY,
  ADD_GROUPPOLICY_SUCCESS,
  ADD_GROUPPOLICY_FAIL,
} from "./actionTypes";

export const getGroupPolicy = () => ({
  type: GET_GROUPPOLICY,
});

export const getGroupPolicySuccess = (groupPolicy) => {
  console.log("Received Group Policy:", groupPolicy);
  return {
    type: GET_GROUPPOLICY_SUCCESS,
    payload: groupPolicy,
  };
};

export const getGroupPolicyFail = (error) => ({
  type: GET_GROUPPOLICY_FAIL,
  payload: error,
});

export const addNewGroupPolicy = (groupPolicy) => ({
  type: ADD_NEW_GROUPPOLICY,
  payload: groupPolicy,
});

export const addGroupPolicySuccess = (groupPolicy) => ({
  type: ADD_GROUPPOLICY_SUCCESS,
  payload: groupPolicy,
});

export const addGroupPolicyFail = (error) => ({
  type: ADD_GROUPPOLICY_FAIL,
  payload: error,
});
