import {
    FETCH_DELIVERYPOINTS_REQUEST,
    FETCH_DELIVERYPOINTS_SUCCESS,
    FETCH_DELIVERYPOINTS_FAILURE
  } from "./actionTypes";
  
  import { DeliveryPointsActions, DeliveryPointsState } from "./types";
  
  const initialState: DeliveryPointsState = {
    pendingDeliveryPoints: false,
    deliveryPoints: [],
    selectedDeliveryPoint: null,
    error: null,
  };
  
  export default (state = initialState, action: DeliveryPointsActions) => {
    switch (action.type) {
        case FETCH_DELIVERYPOINTS_REQUEST:
            return {
            ...state,
            pending: true,
            };
        case FETCH_DELIVERYPOINTS_SUCCESS:
            return {
                ...state,
                pending: false,
                deliveryPoints: action.payload.deliveryPoints,
                selecteddeliveryPoint: null,
                error: null,
                };
        case FETCH_DELIVERYPOINTS_FAILURE:
            return {
                ...state,
                pending: false,
                deliveryPoints: [],
                selecteddeliveryPoints: null,
                error: action.payload.error,
            };
      default:
        return {
          ...state,
        };
    }
  };