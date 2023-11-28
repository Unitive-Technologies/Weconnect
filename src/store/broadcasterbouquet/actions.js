import {
  GET_BROADCASTERBOUQUETLIST,
  GET_BROADCASTERBOUQUETLIST_FAIL,
  GET_BROADCASTERBOUQUETLIST_SUCCESS,
} from "./actionTypes";

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
