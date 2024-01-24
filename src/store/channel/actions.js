import {
  GET_CHANNELLIST,
  GET_CHANNELLIST_FAIL,
  GET_CHANNELLIST_SUCCESS,
  GET_CHANNELLIST_DEFINITION,
  GET_CHANNELLIST_DEFINITION_FAIL,
  GET_CHANNELLIST_DEFINITION_SUCCESS,
  GET_CHANNELLIST_TYPE,
  GET_CHANNELLIST_TYPE_FAIL,
  GET_CHANNELLIST_TYPE_SUCCESS,
  GET_CHANNELLIST_STATUS,
  GET_CHANNELLIST_STATUS_FAIL,
  GET_CHANNELLIST_STATUS_SUCCESS,
  GET_CHANNELLIST_CASCODE,
  GET_CHANNELLIST_CASCODE_FAIL,
  GET_CHANNELLIST_CASCODE_SUCCESS,
  GET_CHANNELLIST_GENRE,
  GET_CHANNELLIST_GENRE_FAIL,
  GET_CHANNELLIST_GENRE_SUCCESS,
  GET_CHANNELLIST_BROADCASTER,
  GET_CHANNELLIST_BROADCASTER_FAIL,
  GET_CHANNELLIST_BROADCASTER_SUCCESS,
  GET_CHANNELLIST_LANGUAGE,
  GET_CHANNELLIST_LANGUAGE_FAIL,
  GET_CHANNELLIST_LANGUAGE_SUCCESS,
  GET_CAS_SOURCE,
  GET_CAS_SOURCE_SUCCESS,
  GET_CAS_SOURCE_FAIL,
  ADD_NEW_CHANNELLIST,
  ADD_CHANNELLIST_SUCCESS,
  ADD_CHANNELLIST_FAIL,
  UPDATE_CHANNELLIST,
  UPDATE_CHANNELLIST_FAIL, UPDATE_CHANNELLIST_SUCCESS,
  UPDATE_CHANNELLIST_CURRENT_PAGE,
} from "./actionTypes";

export const goToPage = (toPage) => ({
  type: UPDATE_CHANNELLIST_CURRENT_PAGE,
  payload: Number(toPage),
});

export const getChannelList = () => ({
  type: GET_CHANNELLIST,
});

export const getCASSource = () => ({
  type: GET_CAS_SOURCE,
});

export const getCASSourceSuccess = (casSource) => ({
  type: GET_CAS_SOURCE_SUCCESS,
  payload: casSource,
});

export const getCASSourceFail = (error) => ({
  type: GET_CAS_SOURCE_FAIL,
  payload: error,
});

export const getChannelListSuccess = (channellist) => {
  console.log("Received Channel List:", channellist);
  return {
    type: GET_CHANNELLIST_SUCCESS,
    payload: channellist,
  };
};

export const getChannelListFail = (error) => ({
  type: GET_CHANNELLIST_FAIL,
  payload: error,
});

export const getChannelListStatus = () => ({
  type: GET_CHANNELLIST_STATUS,
});

export const getChannelListStatusSuccess = (channellistStatus) => {
  console.log("Received Channel List Status:", channellistStatus);
  return {
    type: GET_CHANNELLIST_STATUS_SUCCESS,
    payload: channellistStatus,
  };
};

export const getChannelListStatusFail = (error) => ({
  type: GET_CHANNELLIST_STATUS_FAIL,
  payload: error,
});

export const getChannelListDefinition = () => ({
  type: GET_CHANNELLIST_DEFINITION,
});

export const getChannelListDefinitionSuccess = (channellistDefinition) => {
  console.log("Received Channel List Definition:", channellistDefinition);
  return {
    type: GET_CHANNELLIST_DEFINITION_SUCCESS,
    payload: channellistDefinition,
  };
};

export const getChannelDefinitionStatusFail = (error) => ({
  type: GET_CHANNELLIST_DEFINITION_FAIL,
  payload: error,
});

export const getChannelListLanguage = () => ({
  type: GET_CHANNELLIST_LANGUAGE,
});

export const getChannelListLanguageSuccess = (channellistLanguage) => {
  console.log("Received Channel List Language:", channellistLanguage);
  return {
    type: GET_CHANNELLIST_LANGUAGE_SUCCESS,
    payload: channellistLanguage,
  };
};

export const getChannelDefinitionLanguageFail = (error) => ({
  type: GET_CHANNELLIST_LANGUAGE_FAIL,
  payload: error,
});

export const getChannelListBroadcaster = () => ({
  type: GET_CHANNELLIST_BROADCASTER,
});

export const getChannelListBroadcasterSuccess = (channellistBroadcaster) => {
  console.log("Received Channel List broadcaster:", channellistBroadcaster);
  return {
    type: GET_CHANNELLIST_BROADCASTER_SUCCESS,
    payload: channellistBroadcaster,
  };
};

export const getChannelDefinitionBroadcasterFail = (error) => ({
  type: GET_CHANNELLIST_BROADCASTER_FAIL,
  payload: error,
});

export const getChannelListType = () => ({
  type: GET_CHANNELLIST_TYPE,
});

export const getChannelListTypeSuccess = (channellistType) => {
  console.log("Received Channel List Type:", channellistType);
  return {
    type: GET_CHANNELLIST_TYPE_SUCCESS,
    payload: channellistType,
  };
};

export const getChannelDefinitionTypeFail = (error) => ({
  type: GET_CHANNELLIST_TYPE_FAIL,
  payload: error,
});

export const getChannelListCascode = () => ({
  type: GET_CHANNELLIST_CASCODE,
});

export const getChannelListCascodeSuccess = (channellistCascode) => {
  console.log("Received Channel List Cascode:", channellistCascode);
  return {
    type: GET_CHANNELLIST_CASCODE_SUCCESS,
    payload: channellistCascode,
  };
};

export const getChannelListCascodeFail = (error) => ({
  type: GET_CHANNELLIST_CASCODE_FAIL,
  payload: error,
});

export const getChannelListGenre = () => ({
  type: GET_CHANNELLIST_GENRE,
});

export const getChannelListGenreSuccess = (channellistGenre) => {
  console.log("Received Channel List Genre:", channellistGenre);
  return {
    type: GET_CHANNELLIST_GENRE_SUCCESS,
    payload: channellistGenre,
  };
};

export const getChannelListGenreFail = (error) => ({
  type: GET_CHANNELLIST_GENRE_FAIL,
  payload: error,
});

export const updateChannelList = (channellist) => ({
  type: UPDATE_CHANNELLIST,
  payload: channellist,
});

export const updateChannelListSuccess = (channellist) => ({
  type: UPDATE_CHANNELLIST_SUCCESS,
  payload: channellist,
});

export const updateChannelListFail = (error) => ({
  type: UPDATE_CHANNELLIST_FAIL,
  payload: error,
});

export const addNewChannelList = (channellist) => ({
  type: ADD_NEW_CHANNELLIST,
  payload: channellist,
});

export const addChannelListSuccess = (channellist) => ({
  type: ADD_CHANNELLIST_SUCCESS,
  payload: channellist,
});

export const addChannelListFail = (error) => ({
  type: ADD_CHANNELLIST_FAIL,
  payload: error,
});
