import {
  GET_INVENTORYTRACK,
  GET_INVENTORYTRACK_SUCCESS,
  GET_INVENTORYTRACK_FAIL,
  UPDATE_INVENTORYTRACK_CURRENT_PAGE,
  GET_INVENTORYTRACK_ACTION,
  GET_INVENTORYTRACK_ACTION_SUCCESS,
  GET_INVENTORYTRACK_ACTION_FAIL,
} from "./actionTypes";

export const goToPage = (toPage) => ({
  type: UPDATE_INVENTORYTRACK_CURRENT_PAGE,
  payload: Number(toPage),
});

export const getInventoryTrack = () => ({
  type: GET_INVENTORYTRACK,
});

export const getInventoryTrackSuccess = (inventorytrack) => ({
  type: GET_INVENTORYTRACK_SUCCESS,
  payload: inventorytrack,
});

export const getInventoryTrackFail = (error) => ({
  type: GET_INVENTORYTRACK_FAIL,
  payload: error,
});

export const getInventoryTrackAction = () => ({
  type: GET_INVENTORYTRACK_ACTION,
});

export const getInventoryTrackActionSuccess = (inventorytrackaction) => ({
  type: GET_INVENTORYTRACK_ACTION_SUCCESS,
  payload: inventorytrackaction,
});

export const getInventoryTrackActionFail = (error) => ({
  type: GET_INVENTORYTRACK_ACTION_FAIL,
  payload: error,
});
