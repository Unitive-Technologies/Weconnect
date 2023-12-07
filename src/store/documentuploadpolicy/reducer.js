import {
  GET_DOCUMENTUPLOADPOLICY_SUCCESS,
  GET_DOCUMENTUPLOADPOLICY_FAIL,
  ADD_DOCUMENTUPLOADPOLICY_SUCCESS,
  ADD_DOCUMENTUPLOADPOLICY_FAIL,
} from "./actionTypes";

const INIT_STATE = {
  documentUploadPolicy: [],
  error: {},
  loading: true,
};

const DocumentUploadPolicy = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_DOCUMENTUPLOADPOLICY_SUCCESS:
      console.log("Document Upload data in reducer:", action.payload);
      return {
        ...state,
        documentUploadPolicy: action.payload,
        loading: false,
      };

    case GET_DOCUMENTUPLOADPOLICY_FAIL:
      return {
        ...state,
        error: action.payload,
      };

    case ADD_DOCUMENTUPLOADPOLICY_SUCCESS:
      return {
        ...state,
        documentUploadPolicy: [
          ...state.documentUploadPolicy,
          action.payload,
        ],
      };

    case ADD_DOCUMENTUPLOADPOLICY_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default DocumentUploadPolicy;
