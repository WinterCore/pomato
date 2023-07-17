interface IStartEvent {
    readonly type: "start";
}

interface IStopEvent {
    readonly type: "stop";
}

interface ISetTimeEvent {
    readonly type: "set-time";
    readonly seconds: number;
}

export type IEvent = IStartEvent | IStopEvent | ISetTimeEvent;

interface ITimeChanged {
    readonly type: "time-changed";
    readonly seconds: number;
}

interface IFinished {
    readonly type: "finished";
}

export type ISubscriptionEvent = ITimeChanged | IFinished;

let intervalID: number;
let seconds = 0;

onmessage = (e: MessageEvent<IEvent>) => {
    const { data } = e;

    switch (data.type) {
        case "start": {
            intervalID = window.setInterval(() => {
                seconds -= 1;

                if (seconds < 1) {
                    clearInterval(intervalID);

                    postMessage({
                        type: "finished",
                    } as ISubscriptionEvent);
                }

                postMessage({
                    type: "time-changed",
                    seconds,
                } as ISubscriptionEvent);
            }, 1000);
            break;
        }

        case "stop": {
            clearInterval(intervalID);
            break;
        }

        case "set-time": {
            clearInterval(intervalID);
            seconds = data.seconds;
            break;
        }
    }
};
