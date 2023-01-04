import * as React from 'react';
import './SpeedControl.css';
import { SpeedUnits } from '../../types/types';
import { convertSpeedFromMps } from '../../utils';

export interface SpeedControlProps {
    currentSpeed: number;
    onSpeedChange: (newSpeed: number, units: SpeedUnits) => void;
    targetSpeed: number;
    displayUnits: SpeedUnits;
    range?: [number, number];
    increment?: number;
    adjustOptions?: number[];
    mpsConversionFactor?: number;
}

export const SpeedControl = ({currentSpeed, onSpeedChange, targetSpeed, displayUnits, range = [0,10], increment = 1, adjustOptions = [-0.2, 0.2], mpsConversionFactor = 1}: SpeedControlProps) => {
    const fixedSpeeds = [];
    if (increment > 0) {
        for (var i = range[0]; i <= range[1]; i+=increment) {
            fixedSpeeds.push(i)
        }
    } else {
        for (var i = range[0]; i >= range[1]; i+=increment) {
            fixedSpeeds.push(i)
        }
    }

    const convertToMps = (speed: number, factor: number) => {
        return speed * factor;
    };

    const targetSpeedInDisplayUnits = convertSpeedFromMps(targetSpeed,displayUnits);
    const speedMatchCss = (value: number, speedSetting: number) => {
        if (increment > 0) {
            return value>=speedSetting ? 'speed-on' : '';
        }
        console.log('ss', value, speedSetting, displayUnits, targetSpeedInDisplayUnits);
        return value<=Math.round(speedSetting) ? 'speed-on' : '';
    }

    return (
        <div className='speed-control'>
            <div className='speed-controls-container'>
                <div className='speed-button-container'>
                    {fixedSpeeds.map(f => <div className={`speed-button big-button ${speedMatchCss(targetSpeedInDisplayUnits ?? 0, f)}`} onClick={() => onSpeedChange(f,displayUnits)}>{f}</div> )}
                </div>
                <div className='speed-button-container'>
                    {adjustOptions.map(o => 
                        <div className="speed-button big-button-up" onClick={() => onSpeedChange((targetSpeedInDisplayUnits ?? 0) +convertToMps(o, mpsConversionFactor), displayUnits)}>{o > 0 ? '+' + o: o}</div>
                    )}
                </div>
            </div>
        </div>
    );
}