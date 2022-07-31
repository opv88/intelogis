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
    EDIT_REQUESTS_SUCCESS,
  } from "./actionTypes";
  
  import { RequestsActions, RequestsState } from "./types";
  
  const initialState: RequestsState = {
    pendingRequests: false,
    requests: [],
    selectedRequest: null,
    editingRequest: null,
    editingPoint: null,
    error: null,
  };
  
  export default (state = initialState, action: RequestsActions) => {
    switch (action.type) {
        case FETCH_REQUESTS_REQUEST:
            return {
            ...state,
            pending: true,
            };
        case FETCH_REQUESTS_SUCCESS:
            return {
                ...state,
                pendingRequests: false,
                requests: action.payload.requests,
                selectedRequest: null,
                error: null,
                };
        case FETCH_REQUESTS_FAILURE:
            return {
                ...state,
                pendingRequests: false,
                requests: [],
                selectedRequest: null,
                error: action.payload.error,
            };
        case SELECT_REQUEST_QUERY:
            return {
                ...state,
                pendingRequests: false,
                selectedRequest: action.payload.selectedRequest,
                error: null,
            };
        case SELECT_REQUEST_SUCCESS: 
            return {
                ...state,
                pendingRequests: false,
                error: null,
            };
        case EDIT_REQUEST_COMMAND:
            return {
                ...state,
                pendingRequests: false,
                editingRequest: action.payload.editingRequest,
                error: null,
            };
        case EDIT_REQUEST_SUCCESS: 
            return {
                ...state,
                pendingRequests: false,
                error: null,
            };
        case EDIT_POINT_COMMAND:
            return {
                ...state,
                pendingRequests: false,
                editingPoint: action.payload.editingPoint,
                error: null,
            };
        case EDIT_POINT_SUCCESS: 
            return {
                ...state,
                pendingRequests: false,
                error: null,
            };
        case EDIT_REQUESTS_COMMAND:
            return {
                ...state,
                pendingRequests: false,
                requests: action.payload.editingRequests,
                error: null,
            };
        case EDIT_REQUESTS_SUCCESS: 
            return {
                ...state,
                pendingRequests: false,
                editingRequest: null,
                editingPoint: null,
                error: null,
            };            
        default:
            return {
            ...state,
            };
    }
  };