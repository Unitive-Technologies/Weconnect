import {
  GET_INVENTORYTRACK,
  GET_INVENTORYTRACK_SUCCESS,
  GET_INVENTORYTRACK_FAIL,
  UPDATE_INVENTORYTRACK_CURRENT_PAGE,
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
