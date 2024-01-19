import {
  GET_BROADCASTERBOUQUETLIST,
  GET_BROADCASTERBOUQUETLIST_FAIL,
  GET_BROADCASTERBOUQUETLIST_SUCCESS,
  ADD_NEW_BROADCASTERBOUQUETLIST,
  ADD_BROADCASTERBOUQUETLIST_SUCCESS,
  ADD_BROADCASTERBOUQUETLIST_FAIL,
  UPDATE_BROADCASTERBOUQUETLIST_CURRENT_PAGE,
} from "./actionTypes";

export const goToPage = (toPage) => ({
  type: UPDATE_BROADCASTERBOUQUETLIST_CURRENT_PAGE,
  payload: Number(toPage),
});

export const getBroadcasterBouquetList = () => ({
  type: GET_BROADCASTERBOUQUETLIST,
});

export const getBroadcasterBouquetListSuccess = (broadbouquet) => {
  console.log("Received BroadcasterBouquet List:", broadbouquet);
  return {
    type: GET_BROADCASTERBOUQUETLIST_SUCCESS,
    payload: broadbouquet,
  };
};

export const getBroadcasterBouquetListFail = (error) => ({
  type: GET_BROADCASTERBOUQUETLIST_FAIL,
  payload: error,
});

export const addNewBroadcasterBouquetList = (
  broadbouquet
) => ({
  type: ADD_NEW_BROADCASTERBOUQUETLIST,
  payload: broadbouquet,
});

export const addBroadcasterBouquetListSuccess = (
  broadbouquet
) => ({
  type: ADD_BROADCASTERBOUQUETLIST_SUCCESS,
  payload: broadbouquet,
});

export const addBroadcasterBouquetListFail = (error) => ({
  type: ADD_BROADCASTERBOUQUETLIST_FAIL,
  payload: error,
});