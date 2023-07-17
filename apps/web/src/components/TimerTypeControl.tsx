import React, {HTMLAttributes} from "react";
import {TIMER_TYPE_LABEL, useTimerStore} from "../store/timer/timer.store.js";
import {IRecordWithLabel, TimerType} from "../types/common.js";
import {ItemPicker} from "./ItemPicker.js";

interface ITimerTypeControlProps extends HTMLAttributes<HTMLDivElement> {}

const ITEMS: ReadonlyArray<IRecordWithLabel<TimerType>> = [
    { key: TimerType.POMATO, label: TIMER_TYPE_LABEL[TimerType.POMATO] },
    { key: TimerType.SHORT_BREAK, label: TIMER_TYPE_LABEL[TimerType.SHORT_BREAK] },
    { key: TimerType.LONG_BREAK, label: TIMER_TYPE_LABEL[TimerType.LONG_BREAK] },
];

export const TimerTypeControl: React.FC<ITimerTypeControlProps> = (props) => {
    const { changeType, state: { type } } = useTimerStore();

    const handleChange = React.useCallback((item: IRecordWithLabel<TimerType>) =>
        changeType(item.key), [changeType]);

    return (
        <div css={{ display: "flex", justifyContent: "center" }}>
            <ItemPicker {...props}
                        selected={type}
                        items={ITEMS}
                        onChange={handleChange} />
        </div>
    );
};

