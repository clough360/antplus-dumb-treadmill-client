import * as React from 'react';
import './SpeedControl.css';
import { convertSpeedFromMpsForDisplay, convertSpeedFromMps } from '../../utils';
import { SpeedUnits } from '../../types/types';

export interface BigInfoProps {
    value: number;
    targetValue: number;
    displayUnits: SpeedUnits;
    title: string;
    onSelected?: (title: string) => void;
    selected?: boolean;
}

export const BigInfo = ({value, targetValue, displayUnits, title, onSelected, selected}:BigInfoProps) => {
    const displayValue = convertSpeedFromMpsForDisplay(targetValue, displayUnits);
    const isSelectedCss = selected ? ' selected' : '';
    return (
        <div className={'big-info-container' + isSelectedCss} onClick={() => onSelected && onSelected(title)}>
            <div className='big-info-title'>{title}</div>
            <div>
                <span className='big-info-value'>{displayValue}</span>
                <span className='big-info-units'>{displayUnits}</span>
            </div>
            {/* <div>Target Speed: {convertSpeedFromMpsForDisplay(targetValue, displayUnits)}</div> */}
        </div>
    );
}