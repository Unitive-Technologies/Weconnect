import {
  GET_DOCUMENTUPLOADPOLICY,
  GET_DOCUMENTUPLOADPOLICY_FAIL,
  GET_DOCUMENTUPLOADPOLICY_SUCCESS,
  ADD_NEW_DOCUMENTUPLOADPOLICY,
  ADD_DOCUMENTUPLOADPOLICY_SUCCESS,
  ADD_DOCUMENTUPLOADPOLICY_FAIL,
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

export const addNewDocumentUploadPolicy = (
  documentUploadPolicy
) => ({
  type: ADD_NEW_DOCUMENTUPLOADPOLICY,
  payload: documentUploadPolicy,
});

export const addDocumentUploadPolicySuccess = (
  documentUploadPolicy
) => ({
  type: ADD_DOCUMENTUPLOADPOLICY_SUCCESS,
  payload: documentUploadPolicy,
});

export const addDocumentUploadPolicyFail = (error) => ({
  type: ADD_DOCUMENTUPLOADPOLICY_FAIL,
  payload: error,
});