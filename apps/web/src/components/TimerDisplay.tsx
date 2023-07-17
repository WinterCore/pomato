import styled from "@emotion/styled";
import React, {HTMLAttributes} from "react";
import {SPORTS} from "../lib/segment-digits/data.js";
import {useTimerStore} from "../store/timer/timer.store.js";
import {SegmentDigit as SegmentDigitDefault} from "./SegmentDigit.js";

const numberToDigits = (value: number, minDigits = 2): ReadonlyArray<number> => {
    const digits = value.toString().split("").map(digit => +digit);

    if (digits.length < minDigits) {
        return [...Array.from({ length: minDigits - digits.length }).map(() => 0), ...digits];
    }

    return digits;
};

interface ITimerDisplayProps extends HTMLAttributes<HTMLDivElement> {}

export const TimerDisplay: React.FC<ITimerDisplayProps> = React.memo((props) => {
    const { state: { secondsLeft } } = useTimerStore();

    const seconds = numberToDigits(secondsLeft % 60);
    const minutes = numberToDigits(Math.floor(secondsLeft / 60));

    document.title = `${minutes.join("")}:${seconds.join("")} - Pomato`;

    return (
        <DigitsContainer {...props}>
            {minutes.map((digit, i) => <SegmentDigit {...SPORTS} key={i} value={digit} />)}
            <div css={{ width: 100 }} />
            {seconds.map((digit, i) => <SegmentDigit {...SPORTS} key={i} value={digit} />)}
        </DigitsContainer>
    );
});

const DigitsContainer = styled.div`
    display: flex;
    gap: 10px;
    width: 400px;

    @media (max-width: ${({ theme }) => theme.breakpoints.sm}px) {
        width: 300px;
    }
`;

const SegmentDigit = styled(SegmentDigitDefault)`
    
`;
