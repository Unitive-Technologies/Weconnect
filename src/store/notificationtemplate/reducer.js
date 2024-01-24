import {
  RESPONSE_HEADER_CURRENT_PAGE,
  RESPONSE_HEADER_PAGE_COUNT,
  RESPONSE_HEADER_TOTAL_COUNT,
  RESPONSE_HEADER_PER_PAGE,
} from "../../constants/strings";
import {
  GET_NOTIFICATIONTEMPLATE,
  GET_NOTIFICATIONTEMPLATE_SUCCESS,
  GET_NOTIFICATIONTEMPLATE_FAIL,
  GET_NOTIFICATIONTEMPLATE_STATUS_SUCCESS,
  GET_NOTIFICATIONTEMPLATE_STATUS_FAIL,
  GET_NOTIFICATIONTEMPLATE_TYPE_SUCCESS,
  GET_NOTIFICATIONTEMPLATE_TYPE_FAIL,
  ADD_NEW_NOTIFICATIONTEMPLATE,
  ADD_NOTIFICATIONTEMPLATE_SUCCESS,
  ADD_NOTIFICATIONTEMPLATE_FAIL,
  UPDATE_NOTIFICATIONTEMPLATE,
  UPDATE_NOTIFICATIONTEMPLATE_FAIL,
  UPDATE_NOTIFICATIONTEMPLATE_SUCCESS,
  GET_NOTIFICATIONTEMPLATE_ADDUSER_SUCCESS,
  GET_NOTIFICATIONTEMPLATE_ADDUSER_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  notificationTemplate: [],
  addUser: [],
  noTemplateStatus: [],
  noTemplateType: [],
  error: {},
  loading: true,
};

const NotificationTemplate = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_NOTIFICATIONTEMPLATE:
      return {
        ...state,
        loading: true,
      };

    case GET_NOTIFICATIONTEMPLATE_SUCCESS:
      console.log("Notification Template data in reducer:", action.payload);
      return {
        ...state,
        notificationTemplate: action.payload,
        loading: false,
      };

    case GET_NOTIFICATIONTEMPLATE_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case GET_NOTIFICATIONTEMPLATE_TYPE_SUCCESS:
      console.log("Notification Template data in reducer:", action.payload);
      return {
        ...state,
        noTemplateType: action.payload,
        loading: false,
      };

    case GET_NOTIFICATIONTEMPLATE_TYPE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_NOTIFICATIONTEMPLATE_STATUS_SUCCESS:
      console.log("Notification Template data in reducer:", action.payload);
      return {
        ...state,
        noTemplateStatus: action.payload,
        loading: false,
      };

    case GET_NOTIFICATIONTEMPLATE_STATUS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case ADD_NEW_NOTIFICATIONTEMPLATE:
      return {
        ...state,
        loading: true,
      };

    case ADD_NOTIFICATIONTEMPLATE_SUCCESS:
      return {
        ...state,
        notificationTemplate: [...state.notificationTemplate, action.payload],
        loading: false,
      };

    case ADD_NOTIFICATIONTEMPLATE_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case UPDATE_NOTIFICATIONTEMPLATE:
      return {
        ...state,
        loading: true,
      };

    case UPDATE_NOTIFICATIONTEMPLATE_SUCCESS:
      return {
        ...state,
        loading: false,
        notificationTemplate: state.notificationTemplate.map((notiTemp) =>
          notiTemp.id === action.payload.id
            ? { ...notiTemp, ...action.payload }
            : notiTemp
        ),
      };

    case UPDATE_NOTIFICATIONTEMPLATE_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    case GET_NOTIFICATIONTEMPLATE_ADDUSER_SUCCESS:
      console.log("Notification adduser data in reducer:", action.payload);
      return {
        ...state,
        addUser: action.payload,
        loading: false,
      };

    case GET_NOTIFICATIONTEMPLATE_ADDUSER_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default NotificationTemplate;
