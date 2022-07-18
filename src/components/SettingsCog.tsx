import styled from "@emotion/styled";
import {SettingsIcon} from "../icons/Settings";

export const SettingsCog = styled(SettingsIcon)`
    position: absolute;
    top: 24px;
    right: 24px;
    width: 24px;
    cursor: pointer;

    fill: ${({ theme }) => theme.palette.typography.hint};

    transition: all 150ms ease-in-out;

    &:hover {
        transform: rotate(45deg);
        fill: ${({ theme }) => theme.palette.typography.primary};
    }
`;
