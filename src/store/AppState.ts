import { SpeedInformation, ApiStatus } from "../types/types";
import { TargetSpeed } from "./reducers/targetSpeed";
import { AppConfig } from './reducers/appConfig';

export interface AppState {
    api: {
        speed: SpeedInformation;
        status: ApiStatus;
    }
    targetSpeed: TargetSpeed;
    config: AppConfig;
}