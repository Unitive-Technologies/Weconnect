import {
  GET_BROADCASTERBOUQUETLIST_SUCCESS,
  GET_BROADCASTERBOUQUETLIST_FAIL,
  ADD_BROADCASTERBOUQUETLIST_SUCCESS,
  ADD_BROADCASTERBOUQUETLIST_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  broadcasterBouquetList: [],
  error: {},
  loading: true,
};

const BroadcasterBouquetList = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_BROADCASTERBOUQUETLIST_SUCCESS:
      console.log("BroadcasterBouquetList data in reducer:", action.payload);
      return {
        ...state,
        broadcasterBouquetList: action.payload,
        loading: false,
      };

    case GET_BROADCASTERBOUQUETLIST_FAIL:
      return {
        ...state,
        error: action.payload,
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

    default:
      return state;
  }
};

export default BroadcasterBouquetList;
