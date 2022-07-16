import React from "react";
import {Theme, useTheme, Interpolation} from "@emotion/react";
import {useTransition, animated} from "@react-spring/web";
import {ISVGSegmentDigit} from "../lib/segment-digits/data";

interface ISegmentDigitProps extends ISVGSegmentDigit {
    readonly value: number;
    readonly css?: Interpolation<Theme>;
}

export const SegmentDigit: React.FC<ISegmentDigitProps> = (props) => {
    const { data, viewBox, masks, value, css } = props;
    const theme = useTheme();

    const mask = React.useMemo(() => masks[value] || 0, [value, masks]);

    const visibleSegs = React.useMemo(() =>
        data.map((data, i) => ({ id: i, data })).filter(({ id }) => 1 << id & mask), [mask, data]);
    const segsWithTransitions = useTransition(visibleSegs, {
        enter: { opacity: 1 },
        leave: { opacity: 0 },
        keys: item => item.id,
    });

    return (
        <svg viewBox={viewBox} fill={theme.foreground} css={css}>
            <g>
                {segsWithTransitions((style, item) => <animated.path style={style} d={item.data} />)}
            </g>
        </svg>
    );
};
