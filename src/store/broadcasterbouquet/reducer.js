import {
  RESPONSE_HEADER_CURRENT_PAGE,
  RESPONSE_HEADER_PAGE_COUNT,
  RESPONSE_HEADER_TOTAL_COUNT,
  RESPONSE_HEADER_PER_PAGE,
} from "../../constants/strings";

import {
  GET_BROADCASTERBOUQUETLIST,
  GET_BROADCASTERBOUQUETLIST_SUCCESS,
  GET_BROADCASTERBOUQUETLIST_FAIL,
  GET_BROADCASTERBOUQUETLIST_DEFINITION_SUCCESS,
  GET_BROADCASTERBOUQUETLIST_DEFINITION_FAIL,
  GET_BROADCASTERBOUQUETLIST_TYPE_SUCCESS,
  GET_BROADCASTERBOUQUETLIST_TYPE_FAIL,
  GET_BROADCASTERBOUQUETLIST_ADDCHANNELS_SUCCESS,
  GET_BROADCASTERBOUQUETLIST_ADDCHANNELS_FAIL,
  GET_BROADCASTERBOUQUETLIST_STATUS_SUCCESS,
  GET_BROADCASTERBOUQUETLIST_STATUS_FAIL,
  GET_BROADCASTERBOUQUETLIST_BROADCASTER_SUCCESS,
  GET_BROADCASTERBOUQUETLIST_BROADCASTER_FAIL,
  UPDATE_BROADCASTERBOUQUETLIST,
  UPDATE_BROADCASTERBOUQUETLIST_SUCCESS,
  UPDATE_BROADCASTERBOUQUETLIST_FAIL,
  ADD_NEW_BROADCASTERBOUQUETLIST,
  ADD_BROADCASTERBOUQUETLIST_SUCCESS,
  ADD_BROADCASTERBOUQUETLIST_FAIL,
  UPDATE_BROADCASTERBOUQUETLIST_CURRENT_PAGE,
} from "./actionTypes";

const INIT_STATE = {
  broadcasterBouquetList: [],
  broadbouquetStatus: [],
  broadbouquetStatus: [],
  broadbouquetBroadcaster: [],
  broadbouquetAddchannels: [],
  broadbouquetDefinition: [],
  pagination: {},
  error: {},
  loading: false,
  currentPage: 1,
  perPage: 10,
  totalCount: 0,
  totalPages: 0,
};

const BroadcasterBouquetList = (state = INIT_STATE, action) => {
  switch (action.type) {
    case UPDATE_BROADCASTERBOUQUETLIST_CURRENT_PAGE:
      return Number(action.payload) <= state.totalPages
        ? {
          ...state,
          currentPage: action.payload,
        }
        : state;

    case GET_BROADCASTERBOUQUETLIST:
      return {
        ...state,
        loading: true,
      };

    case GET_BROADCASTERBOUQUETLIST_SUCCESS:
      console.log("BroadcasterBouquetList data in reducer:", action.payload);
      return {
        ...state,
        broadcasterBouquetList: action.payload.data.data,
        currentPage: action.payload.headers[RESPONSE_HEADER_CURRENT_PAGE],
        perPage: action.payload.headers[RESPONSE_HEADER_PER_PAGE],
        totalCount: action.payload.headers[RESPONSE_HEADER_TOTAL_COUNT],
        totalPages: action.payload.headers[RESPONSE_HEADER_PAGE_COUNT],
        loading: false,
      };

    case GET_BROADCASTERBOUQUETLIST_FAIL:
      return {
        ...state,
        error: action.payload,
        pagination: {},
        loading: false,
      };

    case GET_BROADCASTERBOUQUETLIST_STATUS_SUCCESS:
      // console.log("Tax status data success in reducer:", action.payload);
      return {
        ...state,
        broadbouquetStatus: action.payload,
        loading: false,
      };

    case GET_BROADCASTERBOUQUETLIST_STATUS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_BROADCASTERBOUQUETLIST_TYPE_SUCCESS:
      // console.log("Tax status data success in reducer:", action.payload);
      return {
        ...state,
        broadbouquetType: action.payload,
        loading: false,
      };

    case GET_BROADCASTERBOUQUETLIST_TYPE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_BROADCASTERBOUQUETLIST_DEFINITION_SUCCESS:
      // console.log("Tax status data success in reducer:", action.payload);
      return {
        ...state,
        broadbouquetDefinition: action.payload,
        loading: false,
      };

    case GET_BROADCASTERBOUQUETLIST_DEFINITION_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_BROADCASTERBOUQUETLIST_ADDCHANNELS_SUCCESS:
      // console.log("Tax status data success in reducer:", action.payload);
      return {
        ...state,
        broadbouquetAddchannels: action.payload,
        loading: false,
      };

    case GET_BROADCASTERBOUQUETLIST_ADDCHANNELS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_BROADCASTERBOUQUETLIST_BROADCASTER_SUCCESS:
      // console.log("Tax status data success in reducer:", action.payload);
      return {
        ...state,
        broadbouquetBroadcaster: action.payload,
        loading: false,
      };

    case GET_BROADCASTERBOUQUETLIST_BROADCASTER_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case ADD_NEW_BROADCASTERBOUQUETLIST:
      return {
        ...state,
        loading: true,
      };

    case ADD_BROADCASTERBOUQUETLIST_SUCCESS:
      return {
        ...state,
        broadcasterBouquetList: [
          ...state.broadcasterBouquetList,
          action.payload,
        ],
      };

    case ADD_BROADCASTERBOUQUETLIST_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case UPDATE_BROADCASTERBOUQUETLIST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_BROADCASTERBOUQUETLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        broadcasterBouquetList: state.broadcasterBouquetList.map((broadcasterBouquetList) =>
          broadcasterBouquetList.id === action.payload.id
            ? { ...broadcasterBouquetList, ...action.payload }
            : broadcasterBouquetList
        ),
      };

    case UPDATE_BROADCASTERBOUQUETLIST_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default BroadcasterBouquetList;
