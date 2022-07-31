import { createSelector } from "reselect";

import { AppState } from "../rootReducer";

const getPendingMap = (state: AppState) => state.map.pendingMap;

const getPositions = (state: AppState) => state.map.positions;

const getPointsCenter = (state: AppState) => state.map.pointsCenter;

const getError = (state: AppState) => state.map.error;

export const getPositionsSelector = createSelector(getPositions, (positions) => positions);

export const getPendingMapSelector = createSelector(
  getPendingMap,
  (pending) => pending
);

export const getPointsCenterSelector = createSelector(getPointsCenter, (pointsCenter) => pointsCenter);

export const getErrorSelector = createSelector(getError, (error) => error);
