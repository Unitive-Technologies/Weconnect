import {
  RESPONSE_HEADER_CURRENT_PAGE,
  RESPONSE_HEADER_PAGE_COUNT,
  RESPONSE_HEADER_TOTAL_COUNT,
  RESPONSE_HEADER_PER_PAGE,
} from "../../constants/strings";

import {
  GET_SMSMESSAGETEMPLIST,
  GET_SMSMESSAGETEMPLIST_SUCCESS,
  GET_SMSMESSAGETEMPLIST_FAIL,
  UPDATE_SMSMESSAGETEMPLIST,
  UPDATE_SMSMESSAGETEMPLIST_SUCCESS,
  UPDATE_SMSMESSAGETEMPLIST_FAIL,
  GET_SMSMESSAGETEMPLIST_STATUS_FAIL,
  GET_SMSMESSAGETEMPLIST_STATUS_SUCCESS,
  GET_SMSMESSAGETEMPLIST_SENDER_FAIL,
  GET_SMSMESSAGETEMPLIST_SENDER_SUCCESS,
  GET_SMSMESSAGETEMPLIST_SUBCATEGORY_FAIL,
  GET_SMSMESSAGETEMPLIST_SUBCATEGORY_SUCCESS,
  GET_SMSMESSAGETEMPLIST_CATEGORY_FAIL,
  GET_SMSMESSAGETEMPLIST_CATEGORY_SUCCESS,
  ADD_NEW_SMSMESSAGETEMPLIST,
  ADD_SMSMESSAGETEMPLIST_SUCCESS,
  ADD_SMSMESSAGETEMPLIST_FAIL,
  UPDATE_SMSMESSAGETEMPLIST_CURRENT_PAGE,
} from "./actionTypes";

const INIT_STATE = {
  smsmessagetemp: [],
  smsmessagetempStatus: [],
  smsmessagetempSubcategory: [],
  smsmessagetempCategory: [],
  smsmessagetempSender: [],
  pagination: {},
  error: {},
  loading: false,
  currentPage: 1,
  perPage: 10,
  totalCount: 0,
  totalPages: 0,
};

const SMSMessageTemplate = (state = INIT_STATE, action) => {
  switch (action.type) {

    case UPDATE_SMSMESSAGETEMPLIST_CURRENT_PAGE:
      return Number(action.payload) <= state.totalPages
        ? {
          ...state,
          currentPage: action.payload,
        }
        : state;

    case GET_SMSMESSAGETEMPLIST:
      return {
        ...state,
        loading: true,
      };

    case GET_SMSMESSAGETEMPLIST_SUCCESS:
      console.log("SMS MsgTemp data in reducer:", action.payload);
      return {
        ...state,
        smsmessagetemp: action.payload.data.data,
        currentPage: action.payload.headers[RESPONSE_HEADER_CURRENT_PAGE],
        perPage: action.payload.headers[RESPONSE_HEADER_PER_PAGE],
        totalCount: action.payload.headers[RESPONSE_HEADER_TOTAL_COUNT],
        totalPages: action.payload.headers[RESPONSE_HEADER_PAGE_COUNT],
        loading: false,
      };

    case GET_SMSMESSAGETEMPLIST_FAIL:
      return {
        ...state,
        error: action.payload,
        pagination: {},
        loading: false,
      };

    case UPDATE_SMSMESSAGETEMPLIST:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_SMSMESSAGETEMPLIST_SUCCESS:
      return {
        ...state,
        loading: false,
        smsmessagetemp: state.smsmessagetemp.map((smsmessagetemp) =>
          smsmessagetemp.id === action.payload.id ? { ...smsmessagetemp, ...action.payload } : smsmessagetemp
        ),
      };

    case UPDATE_SMSMESSAGETEMPLIST_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case GET_SMSMESSAGETEMPLIST_STATUS_SUCCESS:
      console.log("Tax status data success in reducer:", action.payload);
      return {
        ...state,
        smsmessagetempStatus: action.payload,
        loading: false,
      };

    case GET_SMSMESSAGETEMPLIST_STATUS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_SMSMESSAGETEMPLIST_SENDER_SUCCESS:
      console.log("Tax status data success in reducer:", action.payload);
      return {
        ...state,
        smsmessagetempSender: action.payload,
        loading: false,
      };

    case GET_SMSMESSAGETEMPLIST_SENDER_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_SMSMESSAGETEMPLIST_SUBCATEGORY_SUCCESS:
      console.log("SMS Message Temp List SubCategory data success in reducer:", action.payload);
      return {
        ...state,
        smsmessagetempSubcategory: action.payload,
        loading: false,
      };

    case GET_SMSMESSAGETEMPLIST_SUBCATEGORY_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_SMSMESSAGETEMPLIST_CATEGORY_SUCCESS:
      console.log("SMS Message Temp List Category data success in reducer:", action.payload);
      return {
        ...state,
        smsmessagetempCategory: action.payload,
        loading: false,
      };

    case GET_SMSMESSAGETEMPLIST_CATEGORY_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case ADD_NEW_SMSMESSAGETEMPLIST:
      return {
        ...state,
        loading: true,
      };

    case ADD_SMSMESSAGETEMPLIST_SUCCESS:
      return {
        ...state,
        smsmessagetemp: [
          ...state.smsmessagetemp,
          action.payload,
        ],
        loading: false,
      };

    case ADD_SMSMESSAGETEMPLIST_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default SMSMessageTemplate;
