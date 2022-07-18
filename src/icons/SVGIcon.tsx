import styled from "@emotion/styled";
import {SVGProps} from "react";

export interface ISVGIconProps extends SVGProps<SVGSVGElement> {}

const SVG = styled.svg`
    fill: ${({ theme }) => theme.palette.typography.primary};
    width: 48px;
`;

export const SVGIcon: React.FC<ISVGIconProps> = (props) => {
    return <SVG {...props} />
};
