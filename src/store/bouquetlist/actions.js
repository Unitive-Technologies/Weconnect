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

export const getBouquetBoxtype = () => ({
  type: GET_BOUQUET_BOXTYPE,
});

export const getBouquetBoxtypeSuccess = (boxtype) => ({
  type: GET_BOUQUET_BOXTYPE_SUCCESS,
  payload: boxtype,
});

export const getBouquetBoxtypeFail = (error) => ({
  type: GET_BOUQUET_BOXTYPE_FAIL,
  payload: error,
});

export const getBouquex = () => ({
  type: GET_BOUQUEX,
});

export const getBouquexSuccess = (bouquex) => ({
  type: GET_BOUQUEX_SUCCESS,
  payload: bouquex,
});

export const getBouquexFail = (error) => ({
  type: GET_BOUQUEX_FAIL,
  payload: error,
});

export const getRechargePeriod = () => ({
  type: GET_RECHARGEPERIOD,
});

export const getRechargePeriodSuccess = (rechargeperiod) => ({
  type: GET_RECHARGEPERIOD_SUCCESS,
  payload: rechargeperiod,
});

export const getRechargePeriodFail = (error) => ({
  type: GET_RECHARGEPERIOD_FAIL,
  payload: error,
});

export const getBouquetTaxlist = () => ({
  type: GET_BOUQUET_TAXLIST,
});

export const getBouquetTaxlistSuccess = (bouquettaxlist) => ({
  type: GET_BOUQUET_TAXLIST_SUCCESS,
  payload: bouquettaxlist,
});

export const getBouquetTaxlistFail = (error) => ({
  type: GET_BOUQUET_TAXLIST_FAIL,
  payload: error,
});

export const getAlacarteChannals = () => ({
  type: GET_ALACARTECHANNALS,
});

export const getAlacarteChannalsSuccess = (alacartechannals) => ({
  type: GET_ALACARTECHANNALS_SUCCESS,
  payload: alacartechannals,
});

export const getAlacarteChannalsFail = (error) => ({
  type: GET_ALACARTECHANNALS_FAIL,
  payload: error,
});

export const getBouquetPackages = () => ({
  type: GET_BOUQUET_PACKAGES,
});

export const getBouquetPackagesSuccess = (bouquetpackages) => ({
  type: GET_BOUQUET_PACKAGES_SUCCESS,
  payload: bouquetpackages,
});

export const getBouquetPackagesFail = (error) => ({
  type: GET_BOUQUET_PACKAGES_FAIL,
  payload: error,
});
