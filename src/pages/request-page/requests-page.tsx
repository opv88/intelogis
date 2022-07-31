import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Resizable } from 're-resizable';
import { Spin } from 'antd';
import { Requests } from '../../components/requests';
import { Map } from '../../components/map';
import { getErrorSelector, getPendingRequestsSelector } from '../../store/requests/selectors';
import { fetchRequestsRequest } from '../../store/requests/actions';
import { LoadingOutlined } from '@ant-design/icons';
import styles from './request-page.module.css';
import 'antd/dist/antd.css';

export const RequestsPage: React.FC = () => {
    const dispatch = useDispatch();
    const antIcon = <LoadingOutlined spin />;
    const pendingRequests = useSelector(getPendingRequestsSelector);
    const error = useSelector(getErrorSelector);

    useEffect(() => {
        dispatch(fetchRequestsRequest());
    }, []);

    if (pendingRequests) {
        return (<div className={styles.loadingSpin}>
                <Spin tip="Обновление заявок..." indicator={antIcon} size='large'/>
            </div>);
    }

    if (error) {
        return (<h1>{error}</h1>);
    }

    return (<div className={styles.requestPage}>
        <Resizable grid={[1, 0]} minWidth={510}>
            <Requests />
        </Resizable>

        <Map />
    </div>)
} 