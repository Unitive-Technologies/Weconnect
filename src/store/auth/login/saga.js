import { call, put, takeEvery, takeLatest } from "redux-saga/effects";

// Login Redux States
import { LOGIN_USER, LOGOUT_USER } from "./actionTypes";
import { apiError, loginSuccess, logoutUserSuccess } from "./actions";

//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper";
import { postFakeLogin, postJwtLogin } from "../../../helpers/backend_helper";

const fireBaseBackend = getFirebaseBackend();

function* loginUser({ payload: { logindata, history } }) {
  const currentTime = new Date();
  try {
    let response;

    if (import.meta.env.VITE_APP_DEFAULTAUTH === "jwt") {
      console.log("jwt login...");
      console.log(logindata);
      response = yield call(postJwtLogin, {
        LoginForm: {
          username: logindata.username,
          password: logindata.password,
        },
      });
    }

    // Include loginTime in the response before saving to localStorage
    if (response.status == 200) {
      let responseData = response.data;
      responseData.loginTime = currentTime.toISOString();

      localStorage.setItem("authUser", JSON.stringify(responseData));
      localStorage.setItem("temptoken", responseData.access_token);
      yield put(loginSuccess(responseData));

      history("/dashboard");
    }
  } catch (error) {
    yield put(apiError(error));
  }
}

function* logoutUser({ payload: { history } }) {
  try {
    localStorage.removeItem("authUser");

    if (import.meta.env.VITE_APP_DEFAULTAUTH === "firebase") {
      const response = yield call(fireBaseBackend.logout);
      yield put(logoutUserSuccess(response));
    }
    history("/login");
  } catch (error) {
    yield put(apiError(error));
  }
}

function* authSaga() {
  yield takeEvery(LOGIN_USER, loginUser);
  yield takeEvery(LOGOUT_USER, logoutUser);
}

export default authSaga;
