import { SpeedInformation, ApiStatus, ApiState } from "../../types/types";

export type ApiActionType = 'UPDATE_SPEED_FROM_API' | 'SET_API_STATUS';

export interface ApiAction {
    type: ApiActionType;
    apiSpeed?: SpeedInformation;
    apiStatus?: ApiStatus;
}

const initialState: ApiState = {
    speed: {
        currentSpeed: 0,
        targetSpeed: 0,
        units: 'mps'
    },
    status: 'Not Connected',
}

export const updateSpeedFromApi = (speed: SpeedInformation): ApiAction => ({
    type: 'UPDATE_SPEED_FROM_API', 
    apiSpeed: speed
  });

  export const setApiStatus = (status: ApiStatus): ApiAction => ({
    type: 'SET_API_STATUS', 
    apiStatus: status,
  });

export const apiReducer = (state = initialState, action: ApiAction): ApiState  => {
    switch (action.type) {
        case 'UPDATE_SPEED_FROM_API':
            if (!action.apiSpeed) { return state;}
            return {...state, speed: action.apiSpeed};
        case 'SET_API_STATUS':
            if (!action.apiStatus) { return state;}
            return {...state, status: action.apiStatus};
        }
    return state;
}