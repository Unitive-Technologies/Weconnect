import {
  RESPONSE_HEADER_CURRENT_PAGE,
  RESPONSE_HEADER_PAGE_COUNT,
  RESPONSE_HEADER_TOTAL_COUNT,
  RESPONSE_HEADER_PER_PAGE,
} from "../../constants/strings";

import {
  GET_PACKAGELIST,
  GET_PACKAGELIST_SUCCESS,
  GET_PACKAGELIST_FAIL,
  GET_PACKAGE_TYPE,
  GET_PACKAGE_TYPE_SUCCESS,
  GET_PACKAGE_TYPE_FAIL,
  GET_PACKAGE_BOXTYPE,
  GET_PACKAGE_BOXTYPE_SUCCESS,
  GET_PACKAGE_BOXTYPE_FAIL,
  GET_PACKAGE_STATUS,
  GET_PACKAGE_STATUS_SUCCESS,
  GET_PACKAGE_STATUS_FAIL,
  GET_PACKAGE_CASCODE,
  GET_PACKAGE_CASCODE_SUCCESS,
  GET_PACKAGE_CASCODE_FAIL,
  ADD_NEW_PACKAGELIST,
  ADD_PACKAGELIST_SUCCESS,
  ADD_PACKAGELIST_FAIL,
  UPDATE_PACKAGELIST_CURRENT_PAGE,
  UPDATE_PACKAGE,
  UPDATE_PACKAGE_SUCCESS,
  UPDATE_PACKAGE_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  packageList: [],
  packagetype: [],
  packageboxtype: [],
  packagestatus: [],
  packageCascode: [],
  pagination: {},
  error: {},
  loading: false,
  currentPage: 1,
  perPage: 10,
  totalCount: 0,
  totalPages: 0,
};

const PackageList = (state = INIT_STATE, action) => {
  switch (action.type) {
    case UPDATE_PACKAGELIST_CURRENT_PAGE:
      return Number(action.payload) <= state.totalPages
        ? {
          ...state,
          currentPage: action.payload,
        }
        : state;

    case GET_PACKAGELIST:
      return {
        ...state,
        loading: true,
      };
    case GET_PACKAGELIST_SUCCESS:
      console.log("PackageList data in reducer:", action.payload);
      return {
        ...state,
        packageList: action.payload.data.data,
        currentPage: action.payload.headers[RESPONSE_HEADER_CURRENT_PAGE],
        perPage: action.payload.headers[RESPONSE_HEADER_PER_PAGE],
        totalCount: action.payload.headers[RESPONSE_HEADER_TOTAL_COUNT],
        totalPages: action.payload.headers[RESPONSE_HEADER_PAGE_COUNT],
        loading: false,
      };

    case GET_PACKAGELIST_FAIL:
      return {
        ...state,
        error: action.payload,
        pagination: {},
        loading: false,
      };

    case GET_PACKAGE_TYPE_SUCCESS:
      console.log("PackageType in reducer:", action.payload);
      return {
        ...state,
        packagetype: action.payload,
        loading: false,
      };

    case GET_PACKAGE_TYPE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_PACKAGE_BOXTYPE_SUCCESS:
      console.log("PackageBoxType in reducer:", action.payload);
      return {
        ...state,
        packageboxtype: action.payload,
        loading: false,
      };

    case GET_PACKAGE_BOXTYPE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_PACKAGE_STATUS_SUCCESS:
      console.log("PackageStatus in reducer:", action.payload);
      return {
        ...state,
        packagestatus: action.payload,
        loading: false,
      };

    case GET_PACKAGE_STATUS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_PACKAGE_CASCODE:
      return {
        ...state,
        loading: true,
      };

    case GET_PACKAGE_CASCODE_SUCCESS:
      // console.log("Tax status data success in reducer:", action.payload);
      return {
        ...state,
        packageCascode: action.payload,
        loading: false,
      };

    case GET_PACKAGE_CASCODE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case ADD_NEW_PACKAGELIST:
      return {
        ...state,
        loading: true,
      };

    case ADD_PACKAGELIST_SUCCESS:
      return {
        ...state,
        packageList: [...state.packageList, action.payload],
        loading: false,
      };

    case ADD_PACKAGELIST_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case UPDATE_PACKAGE:
      return {
        ...state,
        loading: true,
      };
    case UPDATE_PACKAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        packageList: state.packageList.map((packlist) =>
          packlist.id === action.payload.id
            ? { ...packlist, ...action.payload }
            : packlist
        ),
      };
    case UPDATE_PACKAGE_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default PackageList;
