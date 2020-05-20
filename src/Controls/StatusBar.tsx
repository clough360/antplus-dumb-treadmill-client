import * as React from 'react';
import {ApiStatus} from '../types/types';

interface Props {
    apiStatus: ApiStatus;
}

export const StatusBar = ({apiStatus}: Props) => {

    return (
        <div className="status-bar">
            <div><div>Treadmill: </div><div>{apiStatus}</div></div>
        </div>
    );
}