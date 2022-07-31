import { ICoord } from "../requests/types";

import {
    FETCH_DELIVERYPOINTS_REQUEST,
    FETCH_DELIVERYPOINTS_SUCCESS,
    FETCH_DELIVERYPOINTS_FAILURE,
  } from "./actionTypes";
  
  export interface DeliveryPointsState {
    pendingDeliveryPoints: boolean;
    deliveryPoints: ICoord[];
    selectedDeliveryPoint: ICoord | null;
    error: string | null;
  }
  
  export interface FetchDeliveryPointsSuccessPayload {
    deliveryPoints: ICoord[];
  }
  
  export interface FetchDeliveryPointsFailurePayload {
    error: string;
  }

  export interface SelectDeliveryPointPayload {
    selectedDeliveryPoint: ICoord;
  }
  
  export interface FetchDeliveryPointsRequest {
    type: typeof FETCH_DELIVERYPOINTS_REQUEST;
  }
  
  export type FetchDeliveryPointsSuccess = {
    type: typeof FETCH_DELIVERYPOINTS_SUCCESS;
    payload: FetchDeliveryPointsSuccessPayload;
  };
  
  export type FetchDeliveryPointsFailure = {
    type: typeof FETCH_DELIVERYPOINTS_FAILURE;
    payload: FetchDeliveryPointsFailurePayload;
  };
  
  export type DeliveryPointsActions =
    | FetchDeliveryPointsRequest
    | FetchDeliveryPointsSuccess
    | FetchDeliveryPointsFailure;