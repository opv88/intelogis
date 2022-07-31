import {
    FETCH_POSITIONS_REQUEST,
    FETCH_POSITIONS_SUCCESS,
    FETCH_POSITIONS_FAILURE
  } from "./actionTypes";
  
  import { PositionsActions, PositionsState } from "./types";
  
  const initialState: PositionsState = {
    pendingMap: false,
    positions: [],
    pointsCenter: {
      lat: 55.75426400,
      lng: 37.62019000,
    },
    error: null,
  };
  
  export default (state = initialState, action: PositionsActions) => {
    switch (action.type) {
        case FETCH_POSITIONS_REQUEST:
            return {
                ...state,
                pendingMap: true,
                positions: [],
                pointsCenter: undefined,
                error: null
            };
        case FETCH_POSITIONS_SUCCESS:
            return {
                ...state,
                pendingMap: false,
                positions: action.payload.positions,
                pointsCenter: action.payload.pointsCenter,
                error: null,
            };
        case FETCH_POSITIONS_FAILURE:
            return {
                ...state,
                pendingMap: false,
                positions: [],
                pointsCenter: undefined,
                error: action.payload.error,
            };
      default:
        return {
          ...state,
        };
    }
  };