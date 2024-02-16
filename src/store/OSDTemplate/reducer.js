import {
  RESPONSE_HEADER_CURRENT_PAGE,
  RESPONSE_HEADER_PAGE_COUNT,
  RESPONSE_HEADER_TOTAL_COUNT,
  RESPONSE_HEADER_PER_PAGE,
} from "../../constants/strings";

import {
  GET_OSDTEMPLATE,
  GET_OSDTEMPLATE_SUCCESS,
  GET_OSDTEMPLATE_FAIL,
  GET_OSDTEMPLATE_STATUS_FAIL,
  GET_OSDTEMPLATE_STATUS_SUCCESS,
  GET_OSDTEMPLATE_OSD_FAIL,
  GET_OSDTEMPLATE_OSD_SUCCESS,
  GET_OSDTEMPLATE_TEMPLATEFOR_FAIL,
  GET_OSDTEMPLATE_TEMPLATEFOR_SUCCESS,
  ADD_NEW_OSDTEMPLATE,
  ADD_OSDTEMPLATE_SUCCESS,
  ADD_OSDTEMPLATE_FAIL,
  UPDATE_OSDTEMPLATE,
  UPDATE_OSDTEMPLATE_SUCCESS,
  UPDATE_OSDTEMPLATE_FAIL,
  UPDATE_OSDTEMPLATE_CURRENT_PAGE,
} from "./actionTypes";

const INIT_STATE = {
  osdTemplate: [],
  osdTemplateStatus: [],
  osdTemplateTemplateFor: [],
  osdTemplateOSD: [],
  pagination: {},
  error: {},
  loading: false,
  currentPage: 1,
  perPage: 10,
  totalCount: 0,
  totalPages: 0,
};

const OSDTemplate = (state = INIT_STATE, action) => {
  switch (action.type) {
    case UPDATE_OSDTEMPLATE_CURRENT_PAGE:
      return Number(action.payload) <= state.totalPages
        ? {
          ...state,
          currentPage: action.payload,
        }
        : state;
    case GET_OSDTEMPLATE:
      return {
        ...state,
        loading: true,
      };

    case GET_OSDTEMPLATE_SUCCESS:
      console.log("OSD Template data in reducer:", action.payload);
      return {
        ...state,
        osdTemplate: action.payload.data.data,
        currentPage: action.payload.headers[RESPONSE_HEADER_CURRENT_PAGE],
        perPage: action.payload.headers[RESPONSE_HEADER_PER_PAGE],
        totalCount: action.payload.headers[RESPONSE_HEADER_TOTAL_COUNT],
        totalPages: action.payload.headers[RESPONSE_HEADER_PAGE_COUNT],
        loading: false,
      };

    case GET_OSDTEMPLATE_FAIL:
      return {
        ...state,
        error: action.payload,
        pagination: {},
        loading: false,
      };

    case UPDATE_OSDTEMPLATE:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_OSDTEMPLATE_SUCCESS:
      return {
        ...state,
        loading: false,
        osdTemplate: state.osdTemplate.map((osdTemplate) =>
          osdTemplate.id === action.payload.id ? { ...osdTemplate, ...action.payload } : osdTemplate
        ),
      };

    case UPDATE_OSDTEMPLATE_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case GET_OSDTEMPLATE_STATUS_SUCCESS:
      console.log("Osd Template Status data in reducer:", action.payload);
      return {
        ...state,
        osdTemplateStatus: action.payload,
        loading: false,
      };

    case GET_OSDTEMPLATE_STATUS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_OSDTEMPLATE_OSD_SUCCESS:
      console.log("Osd Template OSD data in reducer:", action.payload);
      return {
        ...state,
        osdTemplateOSD: action.payload,
        loading: false,
      };

    case GET_OSDTEMPLATE_OSD_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_OSDTEMPLATE_TEMPLATEFOR_SUCCESS:
      console.log("Osd Template Template For data in reducer:", action.payload);
      return {
        ...state,
        osdTemplateTemplateFor: action.payload,
        loading: false,
      };

    case GET_OSDTEMPLATE_TEMPLATEFOR_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case ADD_NEW_OSDTEMPLATE:
      return {
        ...state,
        loading: true,
      };

    case ADD_OSDTEMPLATE_SUCCESS:
      return {
        ...state,
        osdTemplate: [
          ...state.osdTemplate,
          action.payload,
        ],
        loading: false,
      };

    case ADD_OSDTEMPLATE_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default OSDTemplate;
