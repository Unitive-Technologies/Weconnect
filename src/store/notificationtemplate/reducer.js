import {
  GET_NOTIFICATIONTEMPLATE_SUCCESS,
  GET_NOTIFICATIONTEMPLATE_FAIL,
  GET_NOTIFICATIONTEMPLATE_STATUS_SUCCESS,
  GET_NOTIFICATIONTEMPLATE_STATUS_FAIL,
  GET_NOTIFICATIONTEMPLATE_TYPE_SUCCESS,
  GET_NOTIFICATIONTEMPLATE_TYPE_FAIL,
  ADD_NOTIFICATIONTEMPLATE_SUCCESS,
  ADD_NOTIFICATIONTEMPLATE_FAIL,
  UPDATE_NOTIFICATIONTEMPLATE_FAIL,
  UPDATE_NOTIFICATIONTEMPLATE_SUCCESS,
} from "./actionTypes";

const INIT_STATE = {
  notificationTemplate: [],
  noTemplateStatus: [],
  noTemplateType: [],
  error: {},
  loading: true,
};

const NotificationTemplate = (state = INIT_STATE, action) => {
  switch (action.type) {
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

    case ADD_NOTIFICATIONTEMPLATE_SUCCESS:
      return {
        ...state,
        notificationTemplate: [...state.notificationTemplate, action.payload],
      };

    case ADD_NOTIFICATIONTEMPLATE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case UPDATE_NOTIFICATIONTEMPLATE_SUCCESS:
      return {
        ...state,
        notificationTemplate: state.notificationTemplate.map((notiTemp) =>
          notiTemp.id.toString() === action.payload.id.toString()
            ? { notiTemp, ...action.payload }
            : notiTemp
        ),
      };

    case UPDATE_NOTIFICATIONTEMPLATE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default NotificationTemplate;
