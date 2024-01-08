import {
  GET_BOUQUET,
  GET_BOUQUET_FAIL,
  GET_BOUQUET_SUCCESS,
  ADD_BOUQUET,
  ADD_BOUQUET_SUCCESS,
  ADD_BOUQUET_FAIL,
  GET_BOUQUETTYPE,
  GET_BOUQUETTYPE_SUCCESS,
  GET_BOUQUETTYPE_FAIL,
  GET_BOUQUET_BOXTYPE,
  GET_BOUQUET_BOXTYPE_SUCCESS,
  GET_BOUQUET_BOXTYPE_FAIL,
  GET_BOUQUEX,
  GET_BOUQUEX_SUCCESS,
  GET_BOUQUEX_FAIL,
  GET_RECHARGEPERIOD,
  GET_RECHARGEPERIOD_SUCCESS,
  GET_RECHARGEPERIOD_FAIL,
  GET_BOUQUET_TAXLIST,
  GET_BOUQUET_TAXLIST_SUCCESS,
  GET_BOUQUET_TAXLIST_FAIL,
  GET_ALACARTECHANNALS,
  GET_ALACARTECHANNALS_SUCCESS,
  GET_ALACARTECHANNALS_FAIL,
  GET_BOUQUET_PACKAGES,
  GET_BOUQUET_PACKAGES_SUCCESS,
  GET_BOUQUET_PACKAGES_FAIL,
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

export const getBouquetType = () => ({
  type: GET_BOUQUETTYPE,
});

export const getBouquetTypeSuccess = (bouquettype) => ({
  type: GET_BOUQUETTYPE_SUCCESS,
  payload: bouquettype,
});

export const getBouquetTypeFail = (error) => ({
  type: GET_BOUQUETTYPE_FAIL,
  payload: error,
});
