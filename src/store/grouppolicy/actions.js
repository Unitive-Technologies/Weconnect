import {
  GET_GROUPPOLICY,
  GET_GROUPPOLICY_FAIL,
  GET_GROUPPOLICY_SUCCESS,
  ADD_NEW_GROUPPOLICY,
  ADD_GROUPPOLICY_SUCCESS,
  ADD_GROUPPOLICY_FAIL,
  GET_POLICY_TYPE,
  GET_POLICY_TYPE_FAIL,
  GET_POLICY_TYPE_SUCCESS,
  GET_POLICY_ROLE,
  GET_POLICY_ROLE_FAIL,
  GET_POLICY_ROLE_SUCCESS,
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

export const getPolicyType = () => ({
  type: GET_POLICY_TYPE,
});

export const getPolicyTypeSuccess = (policyType) => ({
  type: GET_POLICY_TYPE_SUCCESS,
  payload: policyType,
});

export const getPolicyTypeFail = (error) => ({
  type: GET_POLICY_TYPE_FAIL,
  payload: error,
});

export const getPolicyRole = () => ({
  type: GET_POLICY_ROLE,
});

export const getPolicyRoleSuccess = (policyRole) => ({
  type: GET_POLICY_ROLE_SUCCESS,
  payload: policyRole,
});

export const getPolicyRoleFail = (error) => ({
  type: GET_POLICY_ROLE_FAIL,
  payload: error,
});
