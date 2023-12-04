import {
  GET_USERHIERARCHY,
  GET_USERHIERARCHY_FAIL,
  GET_USERHIERARCHY_SUCCESS,
  ADD_USERHIERARCHY,
  ADD_USERHIERARCHY_SUCCESS,
  ADD_USERHIERARCHY_FAIL,
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

export const addUserHierarchy = (userHierarchy) => ({
  type: ADD_USERHIERARCHY,
  payload: userHierarchy,
});

export const addUserHierarchySuccess = (userHierarchy) => ({
  type: ADD_USERHIERARCHY_SUCCESS,
  payload: userHierarchy,
});

export const addUserHierarchyFail = (error) => ({
  type: ADD_USERHIERARCHY_FAIL,
  payload: error,
});
