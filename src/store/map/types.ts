import { LatLngExpression } from "leaflet";
import {
    FETCH_POSITIONS_REQUEST,
    FETCH_POSITIONS_SUCCESS,
    FETCH_POSITIONS_FAILURE,
  } from "./actionTypes";

  
  export interface PositionsState {
    pendingMap: boolean;
    positions: LatLngExpression[][];
    pointsCenter: LatLngExpression | undefined;
    error: string | null;
  }

  export interface FetchPositionsSuccessPayload {
    positions: LatLngExpression[][];
    pointsCenter: LatLngExpression | undefined;
  }
  
  export interface FetchPositionsFailurePayload {
    error: string;
  }
  
  export interface FetchPositionsRequest {
    type: typeof FETCH_POSITIONS_REQUEST;
  }
  
  export type FetchPositionsSuccess = {
    type: typeof FETCH_POSITIONS_SUCCESS;
    payload: FetchPositionsSuccessPayload;
  };
  
  export type FetchPositionsFailure = {
    type: typeof FETCH_POSITIONS_FAILURE;
    payload: FetchPositionsFailurePayload;
  };

  export interface SetCenterSuccessPayload {
    pointsCenter: LatLngExpression | undefined;
  }
  
  export interface SetCenterFailurePayload {
    error: string;
  }
  
  export type PositionsActions =
    | FetchPositionsRequest
    | FetchPositionsSuccess
    | FetchPositionsFailure;