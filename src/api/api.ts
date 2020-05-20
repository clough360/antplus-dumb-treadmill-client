import {SpeedInformation, SpeedUnits} from '../types/types';

export interface ApiCallError {
    message: string;
}

export class Api {
    private url = '';

    public onApiCallError?: (error: ApiCallError) => void;
    public onApiSuccessStateChange?: (success: boolean) => void; 

    public lastCallWasSuccessful: boolean = false;

    private setLastCallState(success: boolean): void {
        const lastState = this.lastCallWasSuccessful;
        this.lastCallWasSuccessful = success;
        if (this.onApiSuccessStateChange && success !==lastState) {
            try {
                this.onApiSuccessStateChange(success);
            } catch {}
        }
    }
    constructor (url: string) {
        this.url = url;
    }

    public async getSpeed(): Promise<SpeedInformation> {
        try {
            var result = await fetch(`${this.url}/speed`);
            this.setLastCallState(true);

            //@ts-ignore
            return result.json();
        }
        catch {
            this.setLastCallState(false);
             this.sendOnError("");
            throw {};
        }
    }

    public async setTargetSpeed(targetSpeed: number, units: SpeedUnits): Promise<void> {
        const body = {
            targetSpeed,
            units,
        };
        console.log("body", body, JSON.stringify(body));
        try
        {
            await fetch(`${this.url}/speed`, {
                method: 'put',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            });
            this.setLastCallState(true);
        } catch (error) {
            this.setLastCallState(false);
            this.sendOnError("");
            throw {};
        }
    }

    // send the onError message
    private sendOnError(message: string) {
        try {
            if (this.onApiCallError) {
                this.setLastCallState(false);
                this.onApiCallError({message});
            }
        }
        catch (e) {
        }
    }

}