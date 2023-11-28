import { call, put, takeEvery } from "redux-saga/effects";

import { GET_BROADCASTERBOUQUETLIST } from "./actionTypes";

import {
  getBroadcasterBouquetListSuccess,
  getBroadcasterBouquetListFail,
} from "./actions";

//Include Both Helper File with needed methods
import { getBroadcasterBouquetList } from "../../helpers/fakebackend_helper";

const convertBroadcasterBouquetListObject = (broadcasterBouquetList) => {
  // customer user list has more data than what we need, we need to convert each of the customer user object in the list with needed colums of the table
  return broadcasterBouquetList.map((brodcastbouquet) => {
    return {
      ...brodcastbouquet,
      id: brodcastbouquet.id,
      name: brodcastbouquet.name,
      code: brodcastbouquet.code,
      broadcaster: brodcastbouquet.broadcaster_lbl,
      type: brodcastbouquet.channel_type_lbl,
      FTA: brodcastbouquet.isFta_lbl,
      channels: brodcastbouquet.channels
        .map((channel) => channel.broadcaster_lbl)
        .join(", "),

      status:
        brodcastbouquet.status === 1
          ? "ACTIVE"
          : brodcastbouquet.status === 0
          ? "INACTIVE"
          : "BLOCKED",
      rate: brodcastbouquet.broadcasterRate,
      created_at: brodcastbouquet.created_at,
      created_by: brodcastbouquet.created_by_lbl,
    };
  });
};

function* fetchBroadcasterBouquetList() {
  try {
    const response = yield call(getBroadcasterBouquetList);
    console.log("response:" + JSON.stringify(response));
    const broadcasterBouquetList =
      convertBroadcasterBouquetListObject(response);
    yield put(getBroadcasterBouquetListSuccess(broadcasterBouquetList));
  } catch (error) {
    yield put(getBroadcasterBouquetListFail(error));
  }
}

function* broadcasterBouquetListSaga() {
  yield takeEvery(GET_BROADCASTERBOUQUETLIST, fetchBroadcasterBouquetList);
}

export default broadcasterBouquetListSaga;
