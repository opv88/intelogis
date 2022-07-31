import { all, call, put, takeLatest, takeEvery } from "redux-saga/effects";
import { editRequestsSuccess, editRequestSuccess, fetchRequestsFailure, fetchRequestsSuccess, selectRequestSuccess } from "./actions";
import { EDIT_REQUESTS_COMMAND, EDIT_REQUEST_COMMAND, FETCH_REQUESTS_REQUEST, SELECT_REQUEST_QUERY } from "./actionTypes";
import { IRequest } from "./types";

const getRequests = (): IRequest[] => {
    const mockedRequests: IRequest[] = [
        {
            id: 1,
            name: 'Из цирка в монастырь',
            isExpandable: true,
            points: [
                {
                    id: 1,
                    fromCoords: {
                        Id: 1,
                        Lat: 55.69449,
                        Lng: 37.54025,
                        Name: 'Большой московский цирк'
                    },
                    toCoords: {
                        Id: 5,
                        Lat: 55.7262,
                        Lng: 37.55639,
                        Name: 'Новодевичий монастырь'
                    },
                }
            ]
        },
        {
            id: 2,
            name: 'От Москва-сити к МГУ',
            points: [
              {
                id: 2,
                fromCoords: {
                  Id: 6,
                  Lat: 55.7482,
                  Lng: 37.54031,
                  Name: 'Москва-сити' 
                },
                toCoords: {
                  Id: 8,
                  Lat: 55.69785700,
                  Lng: 37.53347800,
                  Name: 'МГУ' 
                }
              }
            ],
            isExpandable: true,
        },
        {
            id: 3,
            name: 'От красной площади на винзавод',
            isExpandable: true,
            points: [
                {
                    id: 3,
                    fromCoords: {
                      Id: 7,
                      Lat: 55.75426400,
                      Lng: 37.62019000,
                      Name: 'Красная площадь' 
                    },
                    toCoords: {
                      Id: 37,
                      Lat: 55.75546,
                      Lng: 37.66502,
                      Name: 'Винзавод'
                    },
                }
            ]
        },
        {
          id: 4,
          name: 'От красной площади в Азовское море',
          isExpandable: true,
          points: [
              {
                  id: 4,
                  fromCoords: {
                    Id: 7,
                    Lat: 55.75426400,
                    Lng: 37.62019000,
                    Name: 'Красная площадь' 
                  },
                  toCoords: {
                    Id: 41,
                    Lat: 46.492728,
                    Lng: 37.398195,
                    Name: 'Точка в Азовском море'
                  },
              }
          ]
        },
        {
          id: 5,
          name: 'От останкинский телебашни до зоопарка',
          isExpandable: true,
          points: [
              {
                  id: 5,
                  fromCoords: {
                    Id: 44,
                    Lat: 55.81968,
                    Lng: 37.61166,
                    Name: 'Останкинская телебашня'
                  },
                  toCoords: {
                    Id: 39,
                    Lat: 55.76323,
                    Lng: 37.57659,
                    Name: 'Московский зоопарк'
                  },
              }
          ]
        },
        {
          id: 6,
          name: 'От третьяковской галереи до Красного Октября',
          isExpandable: true,
          points: [
              {
                  id: 6,
                  fromCoords: {
                    Id: 34,
                    Lat: 55.74138,
                    Lng: 37.62086,
                    Name: 'Третьяковская галерея'
                  },
                  toCoords: {
                    Id: 31,
                    Lat: 55.74127,
                    Lng: 37.61015,
                    Name: 'Красный Октябрь'
                  },
              }
          ]
        },
        {
          id: 7,
          name: 'От парка Зарядье до ГУМа',
          isExpandable: true,
          points: [
              {
                  id: 7,
                  fromCoords: {
                    Id: 25,
                    Lat: 55.75116,
                    Lng: 37.62872,
                    Name: 'Парк Зарядье'
                  },
                  toCoords: {
                    Id: 23,
                    Lat: 55.75489,
                    Lng: 37.62158,
                    Name: 'Государственный универсальный магазин (ГУМ)'
                  },
              }
          ]
        },
    ];

    return mockedRequests;
}

function* fetchRequestsSaga(): any {
  try {
    const response = yield call(getRequests);
    yield put(
      fetchRequestsSuccess({
        requests: response,
      })
    );
  } catch (e: any) {
    yield put(
      fetchRequestsFailure({
        error: e.message,
      })
    );
  }
}

function* selectRequestSaga(): any {
    yield put(selectRequestSuccess());
  }

function* editRequestSaga(): any {
  yield put(editRequestSuccess());
}

function* editRequestsSaga(): any {
  yield put(editRequestsSuccess());
}

function* requestsSaga() {
  yield all([takeLatest(FETCH_REQUESTS_REQUEST, fetchRequestsSaga)]);
  yield all([takeEvery(SELECT_REQUEST_QUERY, selectRequestSaga)]);
  yield all([takeEvery(EDIT_REQUEST_COMMAND, editRequestSaga)]);
  yield all([takeEvery(EDIT_REQUESTS_COMMAND, editRequestsSaga)]);
}

export default requestsSaga;