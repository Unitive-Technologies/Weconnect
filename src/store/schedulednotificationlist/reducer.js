import {
  GET_SCHEDULEDNOTIFICATION,
  GET_SCHEDULEDNOTIFICATION_SUCCESS,
  GET_SCHEDULEDNOTIFICATION_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  schedulednotification: [],
  error: {},
  loading: false,
};

const ScheduledNotification = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_SCHEDULEDNOTIFICATION:
      return {
        ...state,
        loading: true,
      };

    case GET_SCHEDULEDNOTIFICATION_SUCCESS:
      console.log("Scheduled notification data in reducer:", action.payload);
      return {
        ...state,
        schedulednotification: action.payload,
        loading: false,
      };

    case GET_SCHEDULEDNOTIFICATION_FAIL:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };

    default:
      return state;
  }
};

export default ScheduledNotification;
