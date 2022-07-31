import { combineReducers } from "redux";

import requestsReducer from "./requests/reducer";
import deliveryPointsReducer from "./deliveryPoints/reducer";
import mapReducer from "./map/reducer";

const rootReducer = combineReducers({
  requests: requestsReducer,
  deliveryPoints: deliveryPointsReducer,
  map: mapReducer
});

export type AppState = ReturnType<typeof rootReducer>;

export default rootReducer;