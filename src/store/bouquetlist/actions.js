import {
  GET_BOUQUET,
  GET_BOUQUET_FAIL,
  GET_BOUQUET_SUCCESS,
  ADD_BOUQUET,
  ADD_BOUQUET_SUCCESS,
  ADD_BOUQUET_FAIL,
} from "./actionTypes";

export const getBouquet = () => ({
  type: GET_BOUQUET,
});

export const getBouquetSuccess = (bouquet) => {
  console.log("Received Bouquet list:", bouquet);
  return {
    type: GET_BOUQUET_SUCCESS,
    payload: bouquet,
  };
};

export const getBouquetFail = (error) => ({
  type: GET_BOUQUET_FAIL,
  payload: error,
});

export const addBouquet = (bouquet) => ({
  type: ADD_BOUQUET,
  payload: bouquet,
});

export const addBouquetSuccess = (bouquet) => ({
  type: ADD_BOUQUET_SUCCESS,
  payload: bouquet,
});

export const addBouquetFail = (error) => ({
  type: ADD_BOUQUET_FAIL,
  payload: error,
});
