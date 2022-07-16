import styled from "@emotion/styled";
import React from "react";
import {SPORTS} from "../lib/segment-digits/data";
import {useTimerStore} from "../store/timer.store";
import {SegmentDigit as SegmentDigitDefault} from "./7SegmentDigit";

const numberToDigits = (value: number, minDigits = 2): ReadonlyArray<number> => {
    const digits = value.toString().split("").map(digit => +digit);

    if (digits.length < minDigits) {
        return [...Array.from({ length: minDigits - digits.length }).map(() => 0), ...digits];
    }

    return digits;
};

export const TimerDisplay: React.FC = () => {
    const { secondsLeft } = useTimerStore();

    const seconds = numberToDigits(secondsLeft % 60);
    const minutes = numberToDigits(Math.floor(secondsLeft / 60));

    document.title = `${minutes.join("")}:${seconds.join("")}`;

    return (
        <DigitsContainer>
            {minutes.map((digit, i) => <SegmentDigit {...SPORTS} key={i} value={digit} />)}
            <div css={{ width: 50 }} />
            {seconds.map((digit, i) => <SegmentDigit {...SPORTS} key={i} value={digit} />)}
        </DigitsContainer>
    );
};

const DigitsContainer = styled.div`
    display: flex;
    gap: 10px;
    width: 400px;
`;

const SegmentDigit = styled(SegmentDigitDefault)`
    
`;
