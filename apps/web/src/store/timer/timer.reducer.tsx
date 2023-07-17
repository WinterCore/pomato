import {TimerType} from "../../types/common.js";

export interface ITimerStoreState {
    readonly type: TimerType;
    readonly secondsLeft: number;
    readonly isStarted: boolean;
}

export enum TimerStoreActionType {
    STOP,
    START,
    CHANGE_TYPE,
    SET,
}

interface IActionStop {
    readonly type: TimerStoreActionType.STOP;
}

interface IActionStart {
    readonly type: TimerStoreActionType.START;
}

interface IActionSet {
    readonly type: TimerStoreActionType.SET;
    readonly payload: number;
}

interface IActionChangeType {
    readonly type: TimerStoreActionType.CHANGE_TYPE;
    readonly payload: {
        readonly type: TimerType;
        readonly duration: number;
    };
}

export type ITimerStoreAction = IActionStop | IActionStart | IActionChangeType | IActionSet;

export function timerStoreReducer(state: ITimerStoreState, action: ITimerStoreAction): ITimerStoreState {
    switch(action.type) {
        case TimerStoreActionType.START:
            return { ...state, isStarted: true };
        case TimerStoreActionType.STOP:
            return { ...state, isStarted: false };
        case TimerStoreActionType.SET:
            return { ...state, secondsLeft: action.payload };
        case TimerStoreActionType.CHANGE_TYPE: {
            const { payload: { type, duration } } = action;

            return { type, secondsLeft: duration, isStarted: false };
        };
    }
}
