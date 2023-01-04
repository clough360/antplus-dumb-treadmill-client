import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { Api } from './api/api';
import {appStore} from './store/reducers/allReducers';
import { updateSpeedFromApi, setApiStatus } from './store/reducers/apiReducer';
import {DataLogger} from './dataLogger/dataLogger';
import { App } from './App';

const store = createStore(appStore);

export const api = new Api('http://192.168.0.206:5000');
export const dataLogger = new DataLogger();

api.onApiSuccessStateChange = (success: boolean) => {
  store.dispatch(setApiStatus(success ? 'Connected' : 'Not Connected'));
}

const  apiReadLoop = async () => {
  try {
    var speed = await api.getSpeed();
    console.log(speed);
    store.dispatch(updateSpeedFromApi(speed));
    dataLogger.addSample({
      speedMps: speed.currentSpeed,
      distanceDeltaM: speed.currentSpeed,
      inclinePct: 0,
      elevationM: 0,
      timeDeltaS: 1
    });
  }
  finally {
    setTimeout(apiReadLoop, 1000);
  }
};

apiReadLoop();


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
