import {
    FETCH_DELIVERYPOINTS_REQUEST,
    FETCH_DELIVERYPOINTS_FAILURE,
    FETCH_DELIVERYPOINTS_SUCCESS
  } from "./actionTypes";

  import {
    FetchDeliveryPointsRequest,
    FetchDeliveryPointsSuccess,
    FetchDeliveryPointsSuccessPayload,
    FetchDeliveryPointsFailure,
    FetchDeliveryPointsFailurePayload,
  } from "./types";
  
  export const fetchDeliveryPointsRequest = (): FetchDeliveryPointsRequest => ({
    type: FETCH_DELIVERYPOINTS_REQUEST,
  });
  
  export const fetchDeliveryPointsSuccess = (
    payload: FetchDeliveryPointsSuccessPayload
  ): FetchDeliveryPointsSuccess => ({
    type: FETCH_DELIVERYPOINTS_SUCCESS,
    payload: payload,
  });
  
  export const fetchDeliveryPointsFailure = (
    payload: FetchDeliveryPointsFailurePayload
  ): FetchDeliveryPointsFailure => ({
    type: FETCH_DELIVERYPOINTS_FAILURE,
    payload,
  });