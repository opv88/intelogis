import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { MapContainer, Marker, Popup, Polyline, TileLayer, useMap } from 'react-leaflet';
import leaflet, { LatLngExpression } from 'leaflet';
import { LoadingOutlined } from '@ant-design/icons';
import { Result, Spin } from 'antd';
import { getSelectedRequestSelector } from '../../store/requests/selectors';
import { getErrorSelector, getPendingMapSelector, getPointsCenterSelector, getPositionsSelector } from '../../store/map/selectors';
import { fetchPositionsRequest } from '../../store/map/actions';
import 'leaflet/dist/leaflet.css';
import styles from './map.module.css';
import { IPoint } from '../../store/requests/types';

export const Map: React.FC = () => {
    const dispatch = useDispatch();
    const defaultZoom = 13;
    const antIcon = <LoadingOutlined spin />;
    const request = useSelector(getSelectedRequestSelector);
    const pendingMap = useSelector(getPendingMapSelector);
    const error = useSelector(getErrorSelector);
    const pointsCenter = useSelector(getPointsCenterSelector);
    const positions: LatLngExpression[][] = useSelector(getPositionsSelector);

    const iconLoading = new leaflet.Icon({iconUrl: './icons/loading-icon.png'});
    const limeOptions = { color: 'blue' };

    useEffect(() => {
      if (request !== null) {
        dispatch(fetchPositionsRequest());
      }

    }, [request]);

    const renderPositions = (item: IPoint, index: number) => {
      if (positions.length < 1)
      {
        return null;
      }

      return <Polyline
            key={`line_${item.fromCoords.Lat}${item.fromCoords.Lng}${item.toCoords.Lat}${item.toCoords.Lng}`}
            pathOptions={limeOptions}
            positions={positions[index]}/>
    }

    function FlyToCenterMarker() {
      const map = useMap();
      if (pointsCenter !== undefined) {
        map.flyTo(pointsCenter as LatLngExpression, map.getZoom());
      }

      setTimeout(() => map.invalidateSize(), 100);

      return null;
    }

    const renderMap = () => {
        return (<div className={styles.map}>
            {error ? <Result
              status="warning"
              title="Ошибка при выполнении"
              className={styles.loadingError}><h2>{error}</h2></Result> : ''}

            { pendingMap ? <div className={styles.loadingSpin}>
                <Spin tip="Обновление карты..." indicator={antIcon} size='large'/>
              </div> : ''}

            <MapContainer
              center={pointsCenter}
              zoom={defaultZoom}
              scrollWheelZoom={false}>
              <div>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {request?.points.map((item, index) => {
                      return (<div key={`${item.fromCoords.Name}->${item.toCoords.Name}`}>
                
                      <Marker
                        key={`${item.fromCoords.Lat}${item.fromCoords.Lng}`}
                        position={{lat: item.fromCoords.Lat, lng: item.fromCoords.Lng}}
                        icon={iconLoading}
                      >
                      <Popup>
                        {item.fromCoords.Name}
                      </Popup>
                    </Marker>
    
                    <Marker
                      key={`${item.toCoords.Lat}${item.toCoords.Lng}`}
                      position={{lat: item.toCoords.Lat, lng: item.toCoords.Lng}}
                      icon={iconLoading}
                    >
                      <Popup>
                        {item.toCoords.Name}
                      </Popup>
                    </Marker>

                    {renderPositions(item, index)}
                </div>)})}
              </div>
              <FlyToCenterMarker />
            </MapContainer>
          </div>);
    }

    return (<div>{renderMap()}</div>);
}

