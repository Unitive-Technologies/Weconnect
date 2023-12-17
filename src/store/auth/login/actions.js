import {
  LOGIN_USER,
  LOGIN_SUCCESS,
  LOGOUT_USER,
  LOGOUT_USER_SUCCESS,
  API_ERROR,
} from "./actionTypes"

export const loginUser = (logindata, history) => {
  console.log("Actions: LoginUser - ", logindata)
  return {
    type: LOGIN_USER,
    payload: { logindata, history },
  }
}

export const loginSuccess = user => {
  return {
    type: LOGIN_SUCCESS,
    payload: user,
  }
}

export const logoutUser = history => {
  return {
    type: LOGOUT_USER,
    payload: { history },
  }
}

export const logoutUserSuccess = () => {
  return {
    type: LOGOUT_USER_SUCCESS,
    payload: {},
  }
}

export const apiError = error => {
  return {
    type: API_ERROR,
    payload: error,
  }
}
