import { all, call, put, takeEvery } from "redux-saga/effects";
import { ICoord } from "../requests/types";

import { fetchDeliveryPointsFailure, fetchDeliveryPointsSuccess } from "./actions";
import { FETCH_DELIVERYPOINTS_REQUEST } from "./actionTypes";

const getDeliveryPoints = (): ICoord[] => {
    const mockedCoords: ICoord[] = [
        {
            Id: 1,
            Lat: 55.69449,
            Lng: 37.54025,
            Name: 'Большой московский цирк'
        },
        {
            Id: 2,
            Lat: 55.71037,
            Lng: 37.54436,
            Name: 'Воробьевы горы' 
        },
        {
            Id: 3,
            Lat: 55.73872,
            Lng: 37.5232,
            Name: 'Музей-панорама "Бородинская битва"'
        },
        {
            Id: 4,
            Lat: 55.71576,
            Lng: 37.55371,
            Name: 'Стадион "Лужники"' 
        },
        {
            Id: 5,
            Lat: 55.7262,
            Lng: 37.55639,
            Name: 'Новодевичий монастырь'
        },
        {
            Id: 6,
            Lat: 55.7482,
            Lng: 37.54031,
            Name: 'Москва-сити' 
        },
        {
          Id: 7,
          Lat: 55.75426400,
          Lng: 37.62019000,
          Name: 'Красная площадь' 
        },
        {
          Id: 8,
          Lat: 55.69785700,
          Lng: 37.53347800,
          Name: 'МГУ' 
        },
        {
          Id: 9,
          Lat: 55.76029400,
          Lng: 37.61861700,
          Name: 'Большой Театр' 
        },
        {
          Id: 10,
          Lat: 55.74166200,
          Lng: 37.62075700,
          Name: 'Третьяковская галерея'
        },
        {
          Id: 11,
          Lat: 55.74474800,
          Lng: 37.60564300,
          Name: 'Храм Христа Спасителя'
        },
        {
          Id: 12,
          Lat: 55.76388600,
          Lng: 37.57763800,
          Name: 'Московский зоопарк'
        },
        {
          Id: 13,
          Lat: 55.73141200,
          Lng: 37.60337900,
          Name: 'Парк Горького'
        },
        {
          Id: 14,
          Lat: 55.76092900,
          Lng: 37.61955300,
          Name: 'Малый театр'
        },
        {
          Id: 15,
          Lat: 55.75098,
          Lng: 37.61698,
          Name: 'Успенский собор'
        },
        {
          Id: 16,
          Lat: 55.74968,
          Lng: 37.61363,
          Name: 'Оружейная палата'
        },
        {
          Id: 17,
          Lat: 55.75146,
          Lng: 37.61793,
          Name: 'Царь-пушка'
        },
        {
          Id: 18,
          Lat: 55.75076,
          Lng: 37.61849,
          Name: 'Царь-колокол'
        },
        {
          Id: 20,
          Lat: 55.75252,
          Lng: 37.62308,
          Name: 'Собор Василия Блаженного'
        },
        {
          Id: 21,
          Lat: 55.75371,
          Lng: 37.61988,
          Name: 'Мавзолей Ленина'
        },
        {
          Id: 22,
          Lat: 55.75533,
          Lng: 37.61784,
          Name: 'Государственный исторический музей'
        },
        {
          Id: 23,
          Lat: 55.75489,
          Lng: 37.62158,
          Name: 'Государственный универсальный магазин (ГУМ)'
        },
        {
          Id: 24,
          Lat: 55.75769,
          Lng: 37.62334,
          Name: 'Никольская улица'
        },
        {
          Id: 25,
          Lat: 55.75116,
          Lng: 37.62872,
          Name: 'Парк Зарядье'
        },
        {
          Id: 26,
          Lat: 55.76015,
          Lng: 37.62469,
          Name: 'Центральный детский мир'
        },
        {
          Id: 27,
          Lat: 55.76013,
          Lng: 37.61864,
          Name: 'Большой театр'
        },
        {
          Id: 28,
          Lat: 55.7589,
          Lng: 37.61229,
          Name: 'Тверская улица'
        },
        {
          Id: 29,
          Lat: 55.7473,
          Lng: 37.60511,
          Name: 'Пушкинский музей'
        },
        {
          Id: 30,
          Lat: 55.74944,
          Lng: 37.5911,
          Name: 'Старый Арбат'
        },
        {
          Id: 31,
          Lat: 55.74127,
          Lng: 37.61015,
          Name: 'Красный Октябрь'
        },
        {
          Id: 32,
          Lat: 55.72849,
          Lng: 37.6001,
          Name: 'Парк Горького'
        },
        {
          Id: 33,
          Lat: 55.73406,
          Lng: 37.60679,
          Name: 'Парк искусств Музеон'
        },
        {
          Id: 34,
          Lat: 55.74138,
          Lng: 37.62086,
          Name: 'Третьяковская галерея'
        },
        {
          Id: 35,
          Lat: 55.74182,
          Lng: 37.64936,
          Name: 'Бункер 42'
        },
        {
          Id: 36,
          Lat: 55.72798,
          Lng: 37.65795,
          Name: 'Крутицкое патриаршее подворье'
        },
        {
          Id: 37,
          Lat: 55.75546,
          Lng: 37.66502,
          Name: 'Винзавод'
        },
        {
          Id: 38,
          Lat: 55.76144,
          Lng: 37.58365,
          Name: 'Московский планетарий'
        },
        {
          Id: 39,
          Lat: 55.76323,
          Lng: 37.57659,
          Name: 'Московский зоопарк'
        },
        {
          Id: 40,
          Lat: 55.76718,
          Lng: 37.57124,
          Name: 'Римско-католический кафедральный собор непорочного зачатия пресвятой девы Марии'
        },
        {
          Id: 41,
          Lat: 46.492728,
          Lng: 37.398195,
          Name: 'Точка в Азовском море'
        },
        {
          Id: 42,
          Lat: 55.73676,
          Lng: 37.51993,
          Name: 'Триумфальная арка'
        },
        {
          Id: 43,
          Lat: 55.73062,
          Lng: 37.50248,
          Name: 'Парк победы на поклонной горе'
        },
        {
          Id: 44,
          Lat: 55.81968,
          Lng: 37.61166,
          Name: 'Останкинская телебашня'
        },
    ];

    return mockedCoords;
}

function* fetchDeliveryPointsSaga(): any {
  try {
    const response = yield call(getDeliveryPoints);
    yield put(
      fetchDeliveryPointsSuccess({
        deliveryPoints: response,
      })
    );
  } catch (e: any) {
    yield put(
      fetchDeliveryPointsFailure({
        error: e.message,
      })
    );
  }
}

function* deliveryPointsSaga() {
yield all([takeEvery(FETCH_DELIVERYPOINTS_REQUEST, fetchDeliveryPointsSaga)]);
}

export default deliveryPointsSaga;