import React, { useState } from 'react';
import './App.css';
import {SpeedControl} from './Controls/SpeedControl/SpeedControl';
import {BigInfo} from './Controls/SpeedControl/BigInfo';
import { useSelector, useDispatch } from "react-redux";
import { AppState } from './store/AppState';
import { setTargetSpeed } from './store/reducers/targetSpeed';
import {api} from './index';
import {StatusBar} from './Controls/StatusBar';
import { SpeedUnits } from './types/types';

export const App = (): JSX.Element => {
  const apiSpeed = useSelector((state: AppState) => state.api.speed);
  const apiStatus = useSelector((state: AppState) => state.api.status);
  const config = useSelector((state: AppState) => state.config);
  const targetSpeed = useSelector((state: AppState) => {console.log("state", state); return state.targetSpeed.targetSpeedMps});
  const distance = useSelector((state: AppState) => {console.log("state", state); return state.targetSpeed.targetSpeedMps});

  const [selectedPage, setSelectedPage] = useState<string>('speed');

  const dispatch = useDispatch();
  
  const handleOnSpeedChange = (newSpeed: number, units: SpeedUnits) => {
    if (newSpeed < 0) {
      newSpeed = 0;
    }
    console.log("handleOnSpeedChange ", newSpeed, units);
    api.setTargetSpeed(newSpeed, units);
    dispatch(setTargetSpeed(newSpeed, units));
  };

  const handleOnPageSelected = (page: string) => {
    setSelectedPage(page);
    console.log(page);
  }

  setInterval(() => {},1000);

  const startStopButton = targetSpeed === 0 
    ? <div className='start-stop-button start' onClick={() =>handleOnSpeedChange(1,'kph')}><span>Start</span></div>
    : <div className='start-stop-button stop' onClick={() => handleOnSpeedChange(0,'mps')}><span>Stop</span></div>;

  return (
    <div className="app">
      <StatusBar apiStatus={apiStatus}/>
      <div className="speed-container">
        <div className='top-panel'>
          <BigInfo value={apiSpeed.currentSpeed} targetValue={targetSpeed} displayUnits={config.displayUnits} title='speed' onSelected={handleOnPageSelected} selected={selectedPage==='speed'}/>
          <BigInfo value={apiSpeed.currentSpeed} targetValue={targetSpeed} displayUnits='m/m' title='pace' onSelected={handleOnPageSelected} selected={selectedPage==='pace'}/>
          <BigInfo value={apiSpeed.currentSpeed} targetValue={targetSpeed} displayUnits='miles' title='distance' onSelected={handleOnPageSelected} selected={selectedPage==='distance'}/>
        </div>
        <div>
          {selectedPage ==='speed' && <SpeedControl currentSpeed={apiSpeed.currentSpeed} onSpeedChange={handleOnSpeedChange} targetSpeed={targetSpeed} displayUnits={config.displayUnits}/>}
          {selectedPage === 'pace' && <SpeedControl currentSpeed={apiSpeed.currentSpeed} onSpeedChange={handleOnSpeedChange} targetSpeed={targetSpeed} displayUnits={'m/m'} range={[16,5]} adjustOptions={[.2, -.2]} increment={-1}/>}
        </div>
      </div>
      <div className='start-stop-container'>
        { startStopButton }
        <div className='start-stop-button reset' onClick={() => handleOnSpeedChange(0,'mps')}><span>Reset</span></div>
      </div>
    </div>
  );
}
