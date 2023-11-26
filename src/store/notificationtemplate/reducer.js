import {
  GET_NOTIFICATIONTEMPLATE_SUCCESS,
  GET_NOTIFICATIONTEMPLATE_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  notificationTemplate: [],
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

    default:
      return state;
  }
};

export default NotificationTemplate;
