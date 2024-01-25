import {
  RESPONSE_HEADER_CURRENT_PAGE,
  RESPONSE_HEADER_PAGE_COUNT,
  RESPONSE_HEADER_TOTAL_COUNT,
  RESPONSE_HEADER_PER_PAGE,
} from "../../constants/strings";

import {
  GET_CHANNELLIST,
  GET_CHANNELLIST_SUCCESS,
  GET_CHANNELLIST_FAIL,
  GET_CHANNELLIST_DEFINITION,
  GET_CHANNELLIST_DEFINITION_SUCCESS,
  GET_CHANNELLIST_DEFINITION_FAIL,
  GET_CHANNELLIST_TYPE,
  GET_CHANNELLIST_TYPE_SUCCESS,
  GET_CHANNELLIST_TYPE_FAIL,
  GET_CHANNELLIST_STATUS,
  GET_CHANNELLIST_STATUS_SUCCESS,
  GET_CHANNELLIST_STATUS_FAIL,
  GET_CHANNELLIST_CASCODE,
  GET_CHANNELLIST_CASCODE_SUCCESS,
  GET_CHANNELLIST_CASCODE_FAIL,
  GET_CHANNELLIST_GENRE,
  GET_CHANNELLIST_GENRE_SUCCESS,
  GET_CHANNELLIST_GENRE_FAIL,
  GET_CHANNELLIST_BROADCASTER,
  GET_CHANNELLIST_BROADCASTER_SUCCESS,
  GET_CHANNELLIST_BROADCASTER_FAIL,
  GET_CHANNELLIST_LANGUAGE,
  GET_CHANNELLIST_LANGUAGE_SUCCESS,
  GET_CHANNELLIST_LANGUAGE_FAIL,
  ADD_NEW_CHANNELLIST,
  ADD_CHANNELLIST_SUCCESS,
  ADD_CHANNELLIST_FAIL,
  UPDATE_CHANNELLIST,
  UPDATE_CHANNELLIST_SUCCESS,
  UPDATE_CHANNELLIST_FAIL,
  UPDATE_CHANNELLIST_CURRENT_PAGE,
  // GET_CAS_SOURCE,
  // GET_CAS_SOURCE_SUCCESS,
  // GET_CAS_SOURCE_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  channelList: [],
  channellistStatus: [],
  channellistDefinition: [],
  channellistLanguage: [],
  channellistBroadcaster: [],
  channellistType: [],
  channellistCascode: [],
  channellistGenre: [],
  pagination: {},
  casSource: [],
  error: {},
  loading: false,
  currentPage: 1,
  perPage: 10,
  totalCount: 0,
  totalPages: 0,
};

const ChannelList = (state = INIT_STATE, action) => {
  switch (action.type) {
    case UPDATE_CHANNELLIST_CURRENT_PAGE:
      return Number(action.payload) <= state.totalPages
        ? {
          ...state,
          currentPage: action.payload,
        }
        : state;


    // case GET_CAS_SOURCE:
    //   return {
    //     ...state,
    //     loading: true,
    //   };
    // case GET_CAS_SOURCE_SUCCESS:
    //   return {
    //     ...state,
    //     casSource: action.payload.data,
    //     loading: false,
    //   };
    // case GET_CAS_SOURCE_FAIL:
    //   return {
    //     ...state,
    //     error: action.payload,
    //     loading: false,
    //   };

    case GET_CHANNELLIST:
      return {
        ...state,
        loading: true,
      };

    case GET_CHANNELLIST_SUCCESS:
      console.log("ChannelList data in reducer:", action.payload);
      return {
        ...state,
        channelList: action.payload.data.data,
        currentPage: action.payload.headers[RESPONSE_HEADER_CURRENT_PAGE],
        perPage: action.payload.headers[RESPONSE_HEADER_PER_PAGE],
        totalCount: action.payload.headers[RESPONSE_HEADER_TOTAL_COUNT],
        totalPages: action.payload.headers[RESPONSE_HEADER_PAGE_COUNT],
        loading: false,
      };

    case GET_CHANNELLIST_FAIL:
      return {
        ...state,
        error: action.payload,
        pagination: {},
        loading: false,
      };

    case GET_CHANNELLIST_STATUS_SUCCESS:
      console.log("Tax status data success in reducer:", action.payload);
      return {
        ...state,
        channellistStatus: action.payload,
        loading: false,
      };

    case GET_CHANNELLIST_STATUS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_CHANNELLIST_DEFINITION_SUCCESS:
      console.log("Tax status data success in reducer:", action.payload);
      return {
        ...state,
        channellistDefinition: action.payload,
        loading: false,
      };

    case GET_CHANNELLIST_DEFINITION_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_CHANNELLIST_TYPE_SUCCESS:
      // console.log("Tax status data success in reducer:", action.payload);
      return {
        ...state,
        channellistType: action.payload,
        loading: false,
      };

    case GET_CHANNELLIST_TYPE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_CHANNELLIST_CASCODE:
      return {
        ...state,
        loading: true,
      };

    case GET_CHANNELLIST_CASCODE_SUCCESS:
      // console.log("Tax status data success in reducer:", action.payload);
      return {
        ...state,
        channellistCascode: action.payload,
        loading: false,
      };

    case GET_CHANNELLIST_CASCODE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_CHANNELLIST_GENRE_SUCCESS:
      // console.log("Tax status data success in reducer:", action.payload);
      return {
        ...state,
        channellistGenre: action.payload,
        loading: false,
      };

    case GET_CHANNELLIST_GENRE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_CHANNELLIST_BROADCASTER_SUCCESS:
      // console.log("Tax status data success in reducer:", action.payload);
      return {
        ...state,
        channellistBroadcaster: action.payload,
        loading: false,
      };

    case GET_CHANNELLIST_BROADCASTER_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_CHANNELLIST_LANGUAGE_SUCCESS:
      // console.log("Tax status data success in reducer:", action.payload);
      return {
        ...state,
        channellistLanguage: action.payload,
        loading: false,
      };

    case GET_CHANNELLIST_LANGUAGE_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case ADD_NEW_CHANNELLIST:
      return {
        ...state,
        loading: true,
      };

    case ADD_CHANNELLIST_SUCCESS:
      return {
        ...state,
        channelList: [...state.channelList, action.payload],
      };

    case ADD_CHANNELLIST_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case UPDATE_CHANNELLIST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_CHANNELLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        channelList: state.channelList.map((channelList) =>
          channelList.id === action.payload.id ? { ...channelList, ...action.payload } : channelList
        ),
        // tax: state.tax.map((tax) =>
        //   tax.id.toString() === action.payload.id.toString()
        //     ? { tax, ...action.payload }
        //     : tax
        // ),
      };

    case UPDATE_CHANNELLIST_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }


};

export default ChannelList;
