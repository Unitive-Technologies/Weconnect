import {
  GET_USERS_SUCCESS,
  GET_USERS_FAIL,
  ADD_USER_SUCCESS,
  ADD_USER_FAIL,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAIL,
  GET_USER_TYPE_SUCCESS,
  GET_USER_TYPE_FAIL,
  GET_USER_STATUS_SUCCESS,
  GET_USER_STATUS_FAIL,
  GET_USER_ROLE_SUCCESS,
  GET_USER_ROLE_FAIL,
  GET_USER_DESIGNATION_SUCCESS,
  GET_USER_DESIGNATION_FAIL,
  GET_USER_MSO_POLICY_FAIL,
  GET_USER_MSO_POLICY_SUCCESS,
  GET_USER_REGIONALOFFICE_SUCCESS,
  GET_USER_REGIONALOFFICE_FAIL,
  GET_USER_MSO_DETAILS_FAIL,
  GET_USER_MSO_DETAILS_SUCCESS,
  GET_USER_DISTRIBUTOR_FAIL,
  GET_USER_DISTRIBUTOR_SUCCESS,
  GET_USER_LCO_FAIL,
  GET_USER_LCO_SUCCESS,
  GET_USER_BULKSETTINGS_FAIL,
  GET_USER_BULKSETTINGS_SUCCESS,
} from "./actionTypes";

const INIT_STATE = {
  users: [],
  userProfile: {},
  userType: [],
  userStatus: [],
  userRole: [],
  userDesignation: [],
  userMsoPolicy: [],
  userRegional: [],
  userMsoDetails: [],
  userDistributor: [],
  userLco: [],
  userBulkSettings: [],
  error: {},
  loading: true,
};

const contacts = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_USERS_SUCCESS:
      console.log("Users data in reducer:", action.payload);
      return {
        ...state,
        users: action.payload,
        loading: false,
      };

    case GET_USERS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_USER_TYPE_SUCCESS:
      return {
        ...state,
        userType: action.payload,
        loading: false,
      };

    case GET_USER_TYPE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_USER_STATUS_SUCCESS:
      return {
        ...state,
        userStatus: action.payload,
        loading: false,
      };

    case GET_USER_STATUS_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_USER_ROLE_SUCCESS:
      return {
        ...state,
        userRole: action.payload,
        loading: false,
      };

    case GET_USER_ROLE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_USER_DESIGNATION_SUCCESS:
      return {
        ...state,
        userDesignation: action.payload,
        loading: false,
      };

    case GET_USER_DESIGNATION_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_USER_MSO_POLICY_SUCCESS:
      return {
        ...state,
        userMsoPolicy: action.payload,
        loading: false,
      };

    case GET_USER_MSO_POLICY_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_USER_MSO_DETAILS_SUCCESS:
      return {
        ...state,
        userMsoDetails: action.payload,
        loading: false,
      };

    case GET_USER_MSO_DETAILS_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case GET_USER_REGIONALOFFICE_SUCCESS:
      return {
        ...state,
        userRegional: action.payload,
        loading: false,
      };

    case GET_USER_REGIONALOFFICE_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case GET_USER_DISTRIBUTOR_SUCCESS:
      return {
        ...state,
        userDistributor: action.payload,
        loading: false,
      };

    case GET_USER_DISTRIBUTOR_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_USER_LCO_SUCCESS:
      return {
        ...state,
        userLco: action.payload,
        loading: false,
      };

    case GET_USER_LCO_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case GET_USER_BULKSETTINGS_SUCCESS:
      return {
        ...state,
        userBulkSettings: action.payload,
        loading: false,
      };

    case GET_USER_BULKSETTINGS_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    case ADD_USER_SUCCESS:
      return {
        ...state,
        users: [...state.users, action.payload],
      };

    case ADD_USER_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_USER_PROFILE_SUCCESS:
      return {
        ...state,
        userProfile: action.payload,
      };

    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.map((user) =>
          user.id.toString() === action.payload.id.toString()
            ? { user, ...action.payload }
            : user
        ),
      };

    case UPDATE_USER_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case DELETE_USER_SUCCESS:
      return {
        ...state,
        users: state.users.filter(
          (user) => user.id.toString() !== action.payload.toString()
        ),
      };

    case DELETE_USER_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case GET_USER_PROFILE_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default contacts;
