import {
  GET_GROUPPOLICY,
  GET_GROUPPOLICY_FAIL,
  GET_GROUPPOLICY_SUCCESS,
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
