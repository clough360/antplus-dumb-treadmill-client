import { SpeedUnits } from "../../types/types";

export type AppConfigActionType = 'SET_CONFIG';

export interface AppConfig {
    displayUnits: SpeedUnits;
}

const initialState: AppConfig = {
    displayUnits: 'mph',
}

export interface SetConfigAcion {
    type: AppConfigActionType;
    configOrPartialConfig: AppConfig | any;
}

export const setTargetSpeed = (configOrPartialConfig: AppConfig | any): SetConfigAcion => ({
    type: 'SET_CONFIG',
    configOrPartialConfig,
});

// reducer
export const appConfigReducer = (state = initialState, action: SetConfigAcion): AppConfig => {
    switch (action.type) {
        case 'SET_CONFIG':
            return {...state, ...action.configOrPartialConfig};
    }
    return state;
}