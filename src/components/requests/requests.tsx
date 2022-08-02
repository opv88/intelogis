import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Table, Dropdown, Menu, Button, Result } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import { EditOutlined, SnippetsOutlined, CheckOutlined, StopOutlined } from '@ant-design/icons';
import { getEditingPointSelector, getEditingRequestSelector, getErrorSelector, getRequestsSelector, getSelectedRequestSelector } from '../../store/requests/selectors';
import { ICoord, IPoint, IRequest } from '../../store/requests/types';
import { editPoint, editRequest, editRequests, selectRequest } from '../../store/requests/actions';
import { getDeliveryPointsSelector } from '../../store/deliveryPoints/selectors';
import { fetchDeliveryPointsRequest } from '../../store/deliveryPoints/actions';
import 'antd/dist/antd.min.css';
import styles from './requests.module.css';

const Requests: React.FC = () => {
    const dispatch = useDispatch();
    const requests: IRequest[] = useSelector(getRequestsSelector);
    const coords = useSelector(getDeliveryPointsSelector);
    const editingRequest = useSelector(getEditingRequestSelector);
    const editingPoint: IPoint|null = useSelector(getEditingPointSelector);
    const error = useSelector(getErrorSelector);
    const selectedRequest = useSelector(getSelectedRequestSelector);
    
    const columns: any = [
        {
          title: 'Name',
          dataIndex: 'name',
          key: 'name',
          isEditable: true,
          render: (item: any, record: IRequest) => <div className={record.id === selectedRequest?.id ? `${styles.row} ${styles.activeRow}`: styles.row }>{item}</div>
        }];

    const mapRequestToTableData = (item: IRequest) => {
        return {
            id: item.id,
            key: item.name,
            name: item.name,
            points: item.points,
            isExpandable: true
        }
    }

    useEffect(() => {
        dispatch(fetchDeliveryPointsRequest());
    }, [])

    const handleOnSelectItem = (item: IRequest) => {
        dispatch(selectRequest({selectedRequest: item}))
    }

    const handleOnRow = (record: any) => {
        return {
            onClick: () => { handleOnSelectItem(record); }
        };
    };

    const handleOnEditPoint = (request: IRequest) => {
        dispatch(editRequest({editingRequest: request}));
    }

    const handleOnSavePoint = () => {
        if (!editingRequest || !editingPoint) {
            handleOnCancelPoint();
            return;
        }

        const pointIndex = editingRequest.points.findIndex(p => p.id === editingPoint.id);
        editingRequest.points.splice(pointIndex, 1, editingPoint);
        const requestIndex = requests.findIndex(r => r.id === editingRequest.id);
        const editedRequests = [...requests];
        editedRequests.splice(requestIndex, 1, editingRequest);

        dispatch(editRequests({ editingRequests: editedRequests }));
        dispatch(selectRequest({ selectedRequest: editingRequest }));
    };

    const handleOnCancelPoint = () => {
        dispatch(editRequest({editingRequest: null}));
        dispatch(editPoint({ editingPoint: null }));
    };

    const handleOnMenuItemClick = (item: any, point: IPoint, directionCode: 'in'|'out') => {
        if (!editingRequest) {
            return;
        }
        
        const requestIndex = requests.findIndex(request => request.id === editingRequest.id);
        if (requestIndex > -1) {
            const newCoord = coords.find(coord => coord.Id === Number.parseInt(item.key));
            
            if (!newCoord) {
                return;
            }

            const newPoint: IPoint = {
                id: editingPoint?.id ?? point.id,
                fromCoords: directionCode === 'in' ? newCoord : point.fromCoords,
                toCoords: directionCode === 'out' ? newCoord : point.toCoords,
            };

            dispatch(editPoint({ editingPoint: newPoint }));
        }
    };

    const getMenu = (point: IPoint, directionCode: 'in'|'out') => {
        return (<Menu
            items={coords.filter(coords =>
                (directionCode === 'in' && coords.Id !== point.toCoords.Id)
                || (directionCode === 'out' && coords.Id !== point.fromCoords.Id)).map((item: ICoord) : any =>  {
                return {
                    key: item.Id,
                    label: (<div>{`${item.Name} (${item.Lat}, ${item.Lng})`}</div>)
                }
            })}
            onClick={(item: any) => {
                handleOnMenuItemClick(item, point, directionCode);
            }} />);
    };

    const renderEditPoint = (point: IPoint) => {
        return (<div>
            <Dropdown overlay={getMenu(point, 'in')} trigger={['click']} overlayClassName={styles.deliveryPoints}>
                <div>
                    <div className={styles.dropdownList}>{renderReadonlyPointCoords(point.fromCoords)}<DownOutlined /></div>
                </div>
            </Dropdown>
            <Dropdown overlay={getMenu(point, 'out')} trigger={['click']} overlayClassName={styles.deliveryPoints}>
                <div>
                    <div className={styles.dropdownList}>{renderReadonlyPointCoords(point.toCoords)}<DownOutlined /></div>
                </div>
            </Dropdown>
        </div>);
    }

    const renderReadonlyPointCoords = (pointCoord: ICoord) => {
        return (<div><b>{pointCoord.Name}</b> ({pointCoord.Lat}, {pointCoord.Lng})</div>);
    }

    const renderReadonlyPoint = (point: IPoint) => {
        return (<div>
            <div>{renderReadonlyPointCoords(point.fromCoords)}</div>
            <div>{renderReadonlyPointCoords(point.toCoords)}</div>
        </div>);
    }

    const renderPointOperations = (request: IRequest, point: IPoint) => {
        if (editingRequest?.id === request.id)
        {
            return <div className={styles.saveButtons}>
                <Button type='primary' onClick={handleOnSavePoint}>
                    <CheckOutlined />
                    Сохранить
                </Button>
                <Button type='primary' onClick={handleOnCancelPoint}>
                    <StopOutlined />
                    Отменить
                </Button>
            </div>
        } else {
            return <Button
                type='primary'
                key={`${request.id}_${point.id}_op`}
                disabled={editingRequest !== null}
                onClick={() => handleOnEditPoint(request)}
                className={styles.buttonEdit}>
                <EditOutlined />
                Изменить
            </Button>
        }
    }

    const renderPoint = (request: IRequest, point: IPoint) => {
        return (<div key={`${request.id}_${point.id}`} className={styles.points}>
                <div>
                    <div>{request.id === editingRequest?.id ? renderEditPoint(editingPoint ?? point) : renderReadonlyPoint(point)}</div>
                </div>
                {renderPointOperations(request, editingPoint ?? point)}
            </div>);
    }

    const renderPoints = (request: IRequest, points: IPoint[]) => {
        return points.map((point: IPoint) => renderPoint(request, point));
    } 

    const renderExpandedRow = (record: IRequest) => {
        return (<div>
            {renderPoints(record, record.points)}
        </div>);
    }

    const renderRequestList = () => {        
        return(
            <div className={styles.requestsBody}>
                {error ? <Result
                    status="warning"
                    title="Ошибка при выполнении"
                    className={styles.loadingError}><h2>{error}</h2></Result> : ''}
                <h2>
                    <SnippetsOutlined className={styles.requestsIcon} />
                    Заявки
                </h2>
                <Table
                    className={styles.requestsTable}
                    dataSource={requests.map(mapRequestToTableData)}
                    columns={columns}
                    pagination={{position: []}}
                    showHeader={false}
                    onRow={(record) => handleOnRow(record)}
                    expandable={{
                        expandedRowRender: record => renderExpandedRow(record),
                        rowExpandable: record => record.isExpandable === true,
                    }}
                />
            </div>
        )
    }

    return (<div>{renderRequestList()}</div>);
}

export { Requests }