import {
    FETCH_POSITIONS_REQUEST,
    FETCH_POSITIONS_FAILURE,
    FETCH_POSITIONS_SUCCESS
  } from "./actionTypes";

  import {
    FetchPositionsRequest,
    FetchPositionsSuccess,
    FetchPositionsSuccessPayload,
    FetchPositionsFailure,
    FetchPositionsFailurePayload
  } from "./types";
  
  export const fetchPositionsRequest = () : FetchPositionsRequest => ({
    type: FETCH_POSITIONS_REQUEST,
  });
  
  export const fetchPositionsSuccess = (
    payload: FetchPositionsSuccessPayload
  ): FetchPositionsSuccess => ({
    type: FETCH_POSITIONS_SUCCESS,
    payload,
  });
  
  export const fetchPositionsFailure = (
    payload: FetchPositionsFailurePayload
  ): FetchPositionsFailure => ({
    type: FETCH_POSITIONS_FAILURE,
    payload,
  });