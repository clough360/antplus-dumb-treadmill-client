export type SpeedUnits = 'mps' | 'mph' | 'kph' | 'm/m' | 'miles' | 'km';

export interface ApiState {
    speed: SpeedInformation;
    status: ApiStatus;
}

export interface SpeedInformation {
    targetSpeed: number;
    currentSpeed: number;
    units: SpeedUnits;
}

export interface InclineInformation {
    targetIncline: number;
    currentIncline: number;
}

export type ApiStatus = 'Not Connected' | 'Connected';