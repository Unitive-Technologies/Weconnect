import {
  GET_BOUQUET,
  GET_BOUQUET_FAIL,
  GET_BOUQUET_SUCCESS,
} from "./actionTypes";

export const getBouquet = () => ({
  type: GET_BOUQUET,
});

export const getBouquetSuccess = (bouquet) => {
  console.log("Received Notification Template:", bouquet);
  return {
    type: GET_BOUQUET_SUCCESS,
    payload: bouquet,
  };
};

export const getBouquetFail = (error) => ({
  type: GET_BOUQUET_FAIL,
  payload: error,
});
