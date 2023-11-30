import {
  GET_DOCUMENTUPLOADPOLICY,
  GET_DOCUMENTUPLOADPOLICY_FAIL,
  GET_DOCUMENTUPLOADPOLICY_SUCCESS,
} from "./actionTypes";

export const getdocumentUploadpolicy = () => ({
  type: GET_DOCUMENTUPLOADPOLICY,
});

export const getDocumentUploadPolicySuccess = (documentUploadPolicy) => {
  console.log("Received Document Upload Policy:", documentUploadPolicy);
  return {
    type: GET_DOCUMENTUPLOADPOLICY_SUCCESS,
    payload: documentUploadPolicy,
  };
};

export const getDocumentUploadPolicyFail = (error) => ({
  type: GET_DOCUMENTUPLOADPOLICY_FAIL,
  payload: error,
});
