import { SpeedUnits } from "../../types/types";
import { convertSpeedToMps } from "../../utils";

export type TargetSpeedActionType = 'SET_TARGET_SPEED';

export interface TargetSpeed {
    targetSpeedMps: number;
}

const initialState: TargetSpeed = {
    targetSpeedMps: 0,
}

export interface TargetSpeedAction {
    type: TargetSpeedActionType;
    targetSpeedMps: number;
}

export const setTargetSpeed = (targetSpeedMps: number, units: SpeedUnits = 'mps'): TargetSpeedAction => ({
    type: 'SET_TARGET_SPEED',
    targetSpeedMps: convertSpeedToMps(targetSpeedMps,units),
});

// reducer
export const targetSpeed = (state = initialState, action: TargetSpeedAction): TargetSpeed => {
    console.log(action);
    switch (action.type) {
        case 'SET_TARGET_SPEED':
            return {...state, targetSpeedMps: action.targetSpeedMps};
    }
    return state;
}