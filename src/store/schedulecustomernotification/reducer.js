import {
  GET_SCHEDULECUSTOMERNOTIFICATION_SUCCESS,
  GET_SCHEDULECUSTOMERNOTIFICATION_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  scheduleCustomerNotification: [],
  error: {},
  loading: true,
};

const ScheduleCustomerNotification = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_SCHEDULECUSTOMERNOTIFICATION_SUCCESS:
      console.log("Schedule Customer Notification data in reducer:", action.payload);
      return {
        ...state,
        scheduleCustomerNotification: action.payload,
        loading: false,
      };

    case GET_SCHEDULECUSTOMERNOTIFICATION_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default ScheduleCustomerNotification;
