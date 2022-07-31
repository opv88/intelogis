import {
    FETCH_REQUESTS_REQUEST,
    FETCH_REQUESTS_SUCCESS,
    FETCH_REQUESTS_FAILURE,
    SELECT_REQUEST_QUERY,
    SELECT_REQUEST_SUCCESS,
    EDIT_REQUEST_COMMAND,
    EDIT_REQUEST_SUCCESS,
    EDIT_POINT_COMMAND,
    EDIT_POINT_SUCCESS,
    EDIT_REQUESTS_COMMAND,
    EDIT_REQUESTS_SUCCESS
  } from "./actionTypes";
  
export interface ICoord {
    Id: number,
    Lat: number,
    Lng: number,
    Name: string
}

export interface IPoint {
    id: number,
    fromCoords: ICoord,
    toCoords: ICoord
}

  export interface IRequest {
    id: number,
    name: string,
    points: IPoint[],
    isExpandable: boolean
}
  
  export interface RequestsState {
    pendingRequests: boolean;
    requests: IRequest[];
    selectedRequest: IRequest | null;
    editingRequest: IRequest | null;
    editingPoint: IPoint | null;
    error: string | null;
  }
  
  export interface FetchRequestsSuccessPayload {
    requests: IRequest[];
  }
  
  export interface FetchRequestsFailurePayload {
    error: string;
  }

  export interface SelectRequestPayload {
    selectedRequest: IRequest;
  }
  
  export interface FetchRequestsRequest {
    type: typeof FETCH_REQUESTS_REQUEST;
  }
  
  export type FetchRequestsSuccess = {
    type: typeof FETCH_REQUESTS_SUCCESS;
    payload: FetchRequestsSuccessPayload;
  };
  
  export type FetchRequestsFailure = {
    type: typeof FETCH_REQUESTS_FAILURE;
    payload: FetchRequestsFailurePayload;
  };

  export type SelectRequest = {
    type: typeof SELECT_REQUEST_QUERY;
    payload: SelectRequestPayload;
  };

  export type SelectRequestSuccess = {
    type: typeof SELECT_REQUEST_SUCCESS;
  };

  export type EditRequest = {
    type: typeof EDIT_REQUEST_COMMAND;
    payload: EditRequestPayload;
  };

  export type EditRequestSuccess = {
    type: typeof EDIT_REQUEST_SUCCESS;
  };

  export interface EditRequestPayload {
    editingRequest: IRequest | null;
  }

  export type EditPoint = {
    type: typeof EDIT_POINT_COMMAND;
    payload: EditPointPayload;
  };

  export type EditPointSuccess = {
    type: typeof EDIT_POINT_SUCCESS;
  };

  export interface EditPointPayload {
    editingPoint: IPoint | null;
  }

  export type EditRequests = {
    type: typeof EDIT_REQUESTS_COMMAND;
    payload: EditRequestsPayload;
  };

  export type EditRequestsSuccess = {
    type: typeof EDIT_REQUESTS_SUCCESS;
  };

  export interface EditRequestsPayload {
    editingRequests: IRequest[];
  }  
  
  export type RequestsActions =
    | FetchRequestsRequest
    | FetchRequestsSuccess
    | FetchRequestsFailure
    | SelectRequest
    | SelectRequestSuccess
    | EditRequest
    | EditRequestSuccess
    | EditPoint
    | EditPointSuccess
    | EditRequests
    | EditRequestsSuccess;