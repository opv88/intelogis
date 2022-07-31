import { createSelector } from "reselect";

import { AppState } from "../rootReducer";

const getPendingDeliveryPoints = (state: AppState) => state.deliveryPoints.pendingDeliveryPoints;

const getDeliveryPoints = (state: AppState) => state.deliveryPoints.deliveryPoints;

const getSelectedDeliveryPoint = (state: AppState) => state.deliveryPoints.selectedDeliveryPoint;

const getError = (state: AppState) => state.deliveryPoints.error;

export const getDeliveryPointsSelector = createSelector(getDeliveryPoints, (deliveryPoints) => deliveryPoints);

export const getSelectedDeliveryPointSelector = createSelector(getSelectedDeliveryPoint, (deliveryPoint) => deliveryPoint);

export const getPendingDeliveryPointsSelector = createSelector(
  getPendingDeliveryPoints,
  (pending) => pending
);

export const getErrorSelector = createSelector(getError, (error) => error);