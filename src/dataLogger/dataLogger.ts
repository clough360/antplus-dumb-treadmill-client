interface DataSample {
    timeDeltaS: number;
    distanceDeltaM: number;
    speedMps: number;
    inclinePct: number;
    elevationM: number;
}

// records the history of data
// todo: this is too volatile at the moment and needs to be sent to a permanent store possibly on the server
// or at least in the browser
export class DataLogger {
    public distanceTravelledM: number = 0;
    public samples: DataSample[] = [];

    public addSample(sample: DataSample) {
        this.samples.push(sample);
    }

    public clear() {
        this.samples = [];
    }
}