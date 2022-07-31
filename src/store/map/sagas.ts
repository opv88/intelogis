import { LatLngExpression } from "leaflet";
import { all, call, put, takeLatest, select } from "redux-saga/effects";
import { getSelectedRequestSelector } from "../requests/selectors";
import { ICoord, IRequest } from "../requests/types";
import { fetchPositionsFailure, fetchPositionsSuccess } from "./actions";
import { FETCH_POSITIONS_REQUEST } from "./actionTypes";

const getPositions = async (request: IRequest) => {
    const positions: LatLngExpression[][] = [];
    const promises: Promise<any>[] = [];
    request?.points.forEach((item) => {
        promises.push(getPositionsByCoords(item.fromCoords, item.toCoords).then((result: LatLngExpression[]|null|undefined) => {
        if (result !== null && result !== undefined)
        {
          positions.push(result)
        }
        }));
    });

    await Promise.all(promises);
    return positions;
}

const getPositionsByCoords = async (coords1: ICoord, coords2: ICoord) : Promise<LatLngExpression[]|null|undefined> => {
    return fetch(`https://open.mapquestapi.com/directions/v2/route?key=OGKs8XqfDZOzlWoOMXrlCJ4vk8298kVz&from=${coords1.Lat},${coords1.Lng}&to=${coords2.Lat},${coords2.Lng}`,
    {
        mode: 'cors',
        method: 'GET'
    })
    .then((response => {
      if (response.ok)
      {
        return response.json().then(result => {
          const positions: LatLngExpression[] = [];
          if (result.info && result.info.statuscode !== 0)
          {
            return null;
          }

          result.route.legs.forEach((leg: any) => {
              leg.maneuvers.forEach((maneuver: any) => {
                positions.push(maneuver.startPoint);
              });
          })
          return positions;
        })
      }
    }))
  }

  const getPointsCenter = (request: IRequest) : LatLngExpression | undefined => {
    if (request === null || request?.points === null || request?.points.length < 1)
    {
      return undefined;
    }

    return {
      lat: request.points[0].fromCoords.Lat + (request.points[0].toCoords.Lat - request.points[0].fromCoords.Lat) / 2,
      lng: request.points[0].fromCoords.Lng + (request.points[0].toCoords.Lng - request.points[0].fromCoords.Lng) / 2
    };
  }

function* fetchPositionsSaga(): any {
  try {
    const request = yield select(getSelectedRequestSelector);
    if (request === null)
    {
        yield put(
            fetchPositionsFailure({
                error: 'empty request',
            }));
    }

    const response = yield call(getPositions, request as IRequest);
    const pointsCenter = getPointsCenter(request as IRequest);

    if (response !== null && response.length > 0) {
        yield put(
            fetchPositionsSuccess({
              positions: response,
              pointsCenter: pointsCenter
            })
          );
    } else {
        yield put(
            fetchPositionsFailure({
              error: 'Не удалось проложить маршрут',
            })
          );
    }
  } catch (e: any) {
    yield put(
      fetchPositionsFailure({
        error: e.message,
      })
    );
  }
}


function* positionsSaga() {
    yield all([takeLatest(FETCH_POSITIONS_REQUEST, fetchPositionsSaga)]);
}

export default positionsSaga;