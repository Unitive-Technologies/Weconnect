import {
  GET_STATEUSERS,
  GET_STATEUSERS_FAIL,
  GET_STATEUSERS_SUCCESS,
  UPDATE_STATEUSERS_CURRENT_PAGE,
} from "./actionTypes";

export const goToPage = (toPage) => ({
  type: UPDATE_STATEUSERS_CURRENT_PAGE,
  payload: Number(toPage),
});

export const getStateUsers = () => ({
  type: GET_STATEUSERS,
});

export const getStateUsersSuccess = (stateUsers) => {
  console.log("Received State Users:", stateUsers);
  return {
    type: GET_STATEUSERS_SUCCESS,
    payload: stateUsers,
  };
};

export const getStateUsersFail = (error) => ({
  type: GET_STATEUSERS_FAIL,
  payload: error,
});