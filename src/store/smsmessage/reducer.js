import {
  GET_SMSMESSAGETEMPLIST_SUCCESS,
  GET_SMSMESSAGETEMPLIST_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  smsmessagetemp: [],
  error: {},
  loading: true,
};

const SMSMessageTemplate = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_SMSMESSAGETEMPLIST_SUCCESS:
      console.log("SMS MsgTemp data in reducer:", action.payload);
      return {
        ...state,
        smsmessagetemp: action.payload,
        loading: false,
      };

    case GET_SMSMESSAGETEMPLIST_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};

export default SMSMessageTemplate;
