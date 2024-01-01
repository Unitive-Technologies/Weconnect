import {
  GET_SCHEDULECUSTOMERNOTIFICATION_SUCCESS,
  GET_SCHEDULECUSTOMERNOTIFICATION_FAIL,
  GET_SCHEDULECUSTOMERNOTIFICATION_STATUS_FAIL,
  GET_SCHEDULECUSTOMERNOTIFICATION_STATUS_SUCCESS,
  GET_SCHEDULECUSTOMERNOTIFICATION_TYPE_FAIL,
  GET_SCHEDULECUSTOMERNOTIFICATION_TYPE_SUCCESS,
  GET_SCHEDULECUSTOMERNOTIFICATION_BMAIL_FAIL,
  GET_SCHEDULECUSTOMERNOTIFICATION_BMAIL_SUCCESS,
  GET_SCHEDULECUSTOMERNOTIFICATION_SMS_FAIL,
  GET_SCHEDULECUSTOMERNOTIFICATION_SMS_SUCCESS,
  GET_SCHEDULECUSTOMERNOTIFICATION_OSD_FAIL,
  GET_SCHEDULECUSTOMERNOTIFICATION_OSD_SUCCESS,
  ADD_SCHEDULECUSTOMERNOTIFICATION_SUCCESS,
  ADD_SCHEDULECUSTOMERNOTIFICATION_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  scheduleCustomerNotification: [],
  SchCusNotType: [],
  SchCusNotStatus: [],
  SchCusNotSMS: [],
  SchCusNotOSD: [],
  SchCusNotBmail: [],
  error: {},
  loading: true,
};

const ScheduleCustomerNotification = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_SCHEDULECUSTOMERNOTIFICATION_SUCCESS:
      console.log(
        "Schedule Customer Notification data in reducer:",
        action.payload
      );
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


    case GET_SCHEDULECUSTOMERNOTIFICATION_STATUS_SUCCESS:
      console.log("Schedule Customer Notification data in reducer:", action.payload);
      return {
        ...state,
        SchCusNotStatus: action.payload,
        loading: false,
      };

    case GET_SCHEDULECUSTOMERNOTIFICATION_STATUS_FAIL:
      return {
        ...state,
        error: action.payload,
      };


    case GET_SCHEDULECUSTOMERNOTIFICATION_TYPE_SUCCESS:
      console.log("Schedule Customer Notification Data in reducer:", action.payload);
      return {
        ...state,
        SchCusNotType: action.payload,
        loading: false,
      };

    case GET_SCHEDULECUSTOMERNOTIFICATION_TYPE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_SCHEDULECUSTOMERNOTIFICATION_SMS_SUCCESS:
      console.log("Schedule Customer Notification Data in reducer:", action.payload);
      return {
        ...state,
        SchCusNotSMS: action.payload,
        loading: false,
      };

    case GET_SCHEDULECUSTOMERNOTIFICATION_SMS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_SCHEDULECUSTOMERNOTIFICATION_BMAIL_SUCCESS:
      console.log("Schedule Customer Notification Data in reducer:", action.payload);
      return {
        ...state,
        SchCusNotBmail: action.payload,
        loading: false,
      };

    case GET_SCHEDULECUSTOMERNOTIFICATION_BMAIL_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_SCHEDULECUSTOMERNOTIFICATION_OSD_SUCCESS:
      console.log("Schedule Customer Notification Data in reducer:", action.payload);
      return {
        ...state,
        SchCusNotOSD: action.payload,
        loading: false,
      };

    case GET_SCHEDULECUSTOMERNOTIFICATION_OSD_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case ADD_SCHEDULECUSTOMERNOTIFICATION_SUCCESS:
      return {
        ...state,
        scheduleCustomerNotification: [
          ...state.scheduleCustomerNotification,
          action.payload,
        ],
      };

    case ADD_SCHEDULECUSTOMERNOTIFICATION_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default ScheduleCustomerNotification;
