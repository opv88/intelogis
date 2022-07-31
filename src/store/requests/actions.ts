import {
    FETCH_REQUESTS_REQUEST,
    FETCH_REQUESTS_FAILURE,
    FETCH_REQUESTS_SUCCESS,
    SELECT_REQUEST_QUERY,
    SELECT_REQUEST_SUCCESS,
    EDIT_REQUEST_COMMAND,
    EDIT_REQUEST_SUCCESS,
    EDIT_POINT_COMMAND,
    EDIT_POINT_SUCCESS,
    EDIT_REQUESTS_COMMAND,
    EDIT_REQUESTS_SUCCESS
  } from "./actionTypes";

  import {
    FetchRequestsRequest,
    FetchRequestsSuccess,
    FetchRequestsSuccessPayload,
    FetchRequestsFailure,
    FetchRequestsFailurePayload,
    SelectRequestPayload,
    SelectRequest,
    SelectRequestSuccess,
    EditRequest,
    EditRequestSuccess,
    EditRequestPayload,
    EditPoint,
    EditPointPayload,
    EditPointSuccess,
    EditRequestsPayload,
    EditRequests,
    EditRequestsSuccess,
  } from "./types";
  
  export const fetchRequestsRequest = (): FetchRequestsRequest => ({
    type: FETCH_REQUESTS_REQUEST,
  });
  
  export const fetchRequestsSuccess = (
    payload: FetchRequestsSuccessPayload
  ): FetchRequestsSuccess => ({
    type: FETCH_REQUESTS_SUCCESS,
    payload,
  });
  
  export const fetchRequestsFailure = (
    payload: FetchRequestsFailurePayload
  ): FetchRequestsFailure => ({
    type: FETCH_REQUESTS_FAILURE,
    payload,
  });

  export const selectRequest = (
    payload: SelectRequestPayload
  ): SelectRequest => ({
    type: SELECT_REQUEST_QUERY,
    payload,
  });

  export const selectRequestSuccess = (): SelectRequestSuccess => ({
    type: SELECT_REQUEST_SUCCESS
  });

  export const editRequest = (
    payload: EditRequestPayload
  ): EditRequest => ({
    type: EDIT_REQUEST_COMMAND,
    payload,
  });

  export const editRequestSuccess = (): EditRequestSuccess => ({
    type: EDIT_REQUEST_SUCCESS
  });

  export const editPoint = (
    payload: EditPointPayload
  ): EditPoint => ({
    type: EDIT_POINT_COMMAND,
    payload,
  });

  export const editPointSuccess = (): EditPointSuccess => ({
    type: EDIT_POINT_SUCCESS
  });

  export const editRequests = (
    payload: EditRequestsPayload
  ): EditRequests => ({
    type: EDIT_REQUESTS_COMMAND,
    payload,
  });

  export const editRequestsSuccess = (): EditRequestsSuccess => ({
    type: EDIT_REQUESTS_SUCCESS
  });  