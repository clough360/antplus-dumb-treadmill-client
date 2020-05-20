import {SpeedUnits} from './types/types';

export const convertSpeedToMps = (speed: number, units:SpeedUnits): number => {
    switch (units) {
        case 'mps': return speed;
        case 'mph': return speed / 2.23694;
        case 'kph': return speed / 3.6000059687997;
        // pace
        case 'm/m': return 26.8224 / speed ;
        // distance
        case 'miles': return speed / 2.23694;
        case 'km': return speed / 3.6000059687997;
    }
}

export const convertSpeedFromMps = (speed: number, units:SpeedUnits): number => {
    switch (units) {
        case 'mps': return speed;
        case 'mph': return speed * 2.23694;
        case 'kph': return speed * 3.6000059687997;
        // pace
        case 'm/m': return 26.8224 / speed;
        // distance
        case 'miles': return speed * 2.23694;
        case 'km': return speed * 3.6000059687997;
    }
}

export const convertSpeedFromMpsForDisplay = (speed: number, units:SpeedUnits): string => {
    var value = convertSpeedFromMps(speed, units);
    if (value === Infinity || value === NaN) {
        return '-';
    }
    return value.toFixed(1);
}