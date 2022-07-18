import React, {HTMLAttributes} from "react";
import {TIMER_TYPE_LABEL, useTimerStore} from "../store/timer.store";
import {IRecordWithLabel, TimerType} from "../types/common";
import {ItemPicker} from "./ItemPicker";

interface ITimerTypeControlProps extends HTMLAttributes<HTMLDivElement> {}

const ITEMS: ReadonlyArray<IRecordWithLabel<TimerType>> = [
    { key: TimerType.POMATO, label: TIMER_TYPE_LABEL[TimerType.POMATO] },
    { key: TimerType.SHORT_BREAK, label: TIMER_TYPE_LABEL[TimerType.SHORT_BREAK] },
    { key: TimerType.LONG_BREAK, label: TIMER_TYPE_LABEL[TimerType.LONG_BREAK] },
];

export const TimerTypeControl: React.FC<ITimerTypeControlProps> = (props) => {
    const { changeType, type } = useTimerStore();

    const handleChange = React.useCallback((item: IRecordWithLabel<TimerType>) =>
        changeType(item.key), [changeType]);

    return (
        <ItemPicker selected={type}
                    items={ITEMS}
                    onChange={handleChange} />
    );
};

