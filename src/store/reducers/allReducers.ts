import { combineReducers } from 'redux';
import {apiReducer} from './apiReducer';
import {targetSpeed} from './targetSpeed';
import {appConfigReducer} from './appConfig';

export const appStore = combineReducers({
    api: apiReducer,
    targetSpeed,
    config: appConfigReducer,
})