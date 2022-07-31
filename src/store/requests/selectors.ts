import { createSelector } from "reselect";

import { AppState } from "../rootReducer";

const getPendingRequests = (state: AppState) => state.requests.pendingRequests;

const getRequests = (state: AppState) => state.requests.requests;

const getSelectedRequest = (state: AppState) => state.requests.selectedRequest;

const getEditingRequest = (state: AppState) => state.requests.editingRequest;

const getEditingPoint = (state: AppState) => state.requests.editingPoint;

const getError = (state: AppState) => state.requests.error;

export const getRequestsSelector = createSelector(getRequests, (requests) => requests);

export const getSelectedRequestSelector = createSelector(getSelectedRequest, (request) => request);

export const getEditingRequestSelector = createSelector(getEditingRequest, (request) => request);

export const getEditingPointSelector = createSelector(getEditingPoint, (point) => point);

export const getPendingRequestsSelector = createSelector(
  getPendingRequests,
  (pending) => pending
);

export const getErrorSelector = createSelector(getError, (error) => error);