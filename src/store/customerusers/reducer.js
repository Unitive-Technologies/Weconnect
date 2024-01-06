import {
  GET_CUSTOMERUSERS_SUCCESS,
  GET_CUSTOMERUSERS_FAIL,
  UPDATE_CUSTOMERUSER_SUCCESS,
  UPDATE_CUSTOMERUSER_FAIL,
  GET_CUSTOMERUSERS_SETTINGS_SUCCESS,
  GET_CUSTOMERUSERS_SETTINGS_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  customerUsers: [],
  customerUsersSettings: [],
  error: {},
  loading: true,
};

const CustomerUsers = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_CUSTOMERUSERS_SUCCESS:
      console.log("CustomerUsers data in reducer:", action.payload);
      return {
        ...state,
        customerUsers: action.payload,
        loading: false,
      };

    case GET_CUSTOMERUSERS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case UPDATE_CUSTOMERUSER_SUCCESS:
      return {
        ...state,
        customerUsers: state.customerUsers.map((customerUser) =>
          customerUser.id.toString() === action.payload.id.toString()
            ? { customerUser, ...action.payload }
            : customerUser
        ),
      };

    case UPDATE_CUSTOMERUSER_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_CUSTOMERUSERS_SETTINGS_SUCCESS:
      console.log("CustomerUsersSettings data in reducer:", action.payload);
      return {
        ...state,
        customerUsersSettings: action.payload,
        loading: false,
      };

    case GET_CUSTOMERUSERS_SETTINGS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default CustomerUsers;
