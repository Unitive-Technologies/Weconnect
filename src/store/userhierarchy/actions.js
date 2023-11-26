import {
  GET_USERHIERARCHY,
  GET_USERHIERARCHY_FAIL,
  GET_USERHIERARCHY_SUCCESS,
} from "./actionTypes";

export const getUserHierarchy = () => ({
  type: GET_USERHIERARCHY,
});

export const getUserHierarchySuccess = (userHierarchy) => {
  console.log("Received User Hierarchy:", userHierarchy);
  return {
    type: GET_USERHIERARCHY_SUCCESS,
    payload: userHierarchy,
  };
};

export const getUserHierarchyFail = (error) => ({
  type: GET_USERHIERARCHY_FAIL,
  payload: error,
});