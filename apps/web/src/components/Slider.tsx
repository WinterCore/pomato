import React, {InputHTMLAttributes} from "react";
import styled from "@emotion/styled";
import {useTheme} from "@emotion/react";

interface ISliderProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "onChange"> {
    readonly value: number;
    readonly onChange: (value: number) => void;
}

export const Slider: React.FC<ISliderProps> = (props) => {
    const { onChange, value, ...restProps } = props;

    const { palette: { background: bg, typography: tg } } = useTheme();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => onChange(+e.target.value);

    return (
        <RangeInput min="0"
                    max="1"
                    step="0.001"
                    {...restProps}
                    style={{
                        ...restProps.style,
                        background: `linear-gradient(to right, ${tg.secondary}, ${tg.secondary} ${value * 100}%, ${bg.secondary} ${value * 100}%, ${bg.secondary} 100%)`
                    }}
                    type="range"
                    onChange={handleChange}
                    value={value} />
    );
};

const RangeInput = styled("input")`
    -webkit-appearance: none;
    height: 13px;
    width: 100%;
    border-radius: 6px;
    outline: none;
    padding: 0;
    margin: 0;

    &:focus {
        outline: none;
    }

    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 25px;
        height: 25px;
        border-radius: 50%;
        cursor: pointer;
        background: ${({ theme }) => theme.palette.accent};
        -webkit-transition: background .15s ease-in-out;
        transition: background .15s ease-in-out;
    }

    &::-webkit-slider-thumb:hover {
        background: ${({ theme }) => theme.palette.typography.primary};
    }

    &::-moz-range-thumb {
        width: 20px;
        height: 20px;
        border: 0;
        border-radius: 50%;
        background: #f0932b;
        border: #f9ca24 5px solid; cursor: pointer;
        -webkit-transition: background .15s ease-in-out;
        transition: background .15s ease-in-out;
    }

    &::-moz-range-thumb:hover {
        background: #f9ca24;
    }

    &::-moz-focus-inner, &::-moz-focus-outer {
        border: 0;
    }
`;
