import styled from "@emotion/styled";
import {ThemeMode} from "shared";
import React, {HTMLAttributes} from "react";
import {IItemPickerRecord, ItemPicker} from "../components/ItemPicker.js";
import {ModalPopup, ModalPopupHeading, ModalPopupSeparator} from "../components/ModalPopup.js";
import {Slider} from "../components/Slider.js";
import {DarkModeIcon} from "../icons/DarkMode.js";
import {InvertColorsIcon} from "../icons/InvertColors.js";
import {LightModeIcon} from "../icons/LightMode.js";
import {NotificationsIcon} from "../icons/Notifications.js";
import {TimeIcon} from "../icons/Time.js";
import {useSettings} from "../store/settings.store.js";
import {TIMER_TYPE_LABEL} from "../store/timer/timer.store.js";
import {TimerType} from "../types/common.js";

interface ISettingsScreenProps extends HTMLAttributes<HTMLDivElement> {
    readonly open: boolean;
    readonly close: () => void;
}

const COLOR_SCHEME_PICKER_ITEMS: ReadonlyArray<IItemPickerRecord<ThemeMode>> = [
    { key: "dark", label: "Dark", icon: <DarkModeIcon css={{ width: 24 }} /> },
    { key: "light", label: "Light", icon: <LightModeIcon css={{ width: 24 }} /> },
];

export const SettingsScreen: React.FC<ISettingsScreenProps> = (props) => {
    const { open, close } = props;
    const { settings, updateSettings } = useSettings();

    console.log(settings);

    const handleTimerChange = (type: TimerType) => (e: React.ChangeEvent<HTMLInputElement>) =>
        updateSettings({ durations: { [type]: (+e.target.value || 0) * 60 } });

    const changeTheme = React.useCallback((item: IItemPickerRecord<ThemeMode>) =>
        updateSettings({ theme: item.key }), [updateSettings]);
    
    const getFieldValue = (type: TimerType) => settings.durations[type] !== 0 ? settings.durations[type] / 60 : "";

    const handleVolumeChange = (value: number) =>
        updateSettings({ notificationVolume: value });

    return (
        <ModalPopup open={open} onClose={close}>
            <ModalPopupHeading>App Settings</ModalPopupHeading>
            <ModalPopupSeparator />
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <OptionContainer type="col">
                    <OptionLabel css={{ fontSize: 16 }}>
                        <InvertColorsIcon />
                        Color Scheme
                    </OptionLabel>
                    <ItemPicker
                        items={COLOR_SCHEME_PICKER_ITEMS}
                        selected={settings.theme}
                        onChange={changeTheme}
                    />
                </OptionContainer>

                <OptionContainer type="col">
                    <OptionLabel css={{ fontSize: 16 }}>
                        <TimeIcon />
                        Time (Minutes)
                    </OptionLabel>
                    <OptionContainer type="row" css={{ marginTop: 12 }}>
                        <OptionLabel>{TIMER_TYPE_LABEL[TimerType.POMATO]}</OptionLabel>
                        <Input type="number"
                               css={{ maxWidth: 100 }}
                               value={getFieldValue(TimerType.POMATO)}
                               onChange={handleTimerChange(TimerType.POMATO)} />
                    </OptionContainer>
                    <OptionContainer type="row" css={{ marginTop: 12 }}>
                        <OptionLabel>{TIMER_TYPE_LABEL[TimerType.SHORT_BREAK]}</OptionLabel>
                        <Input type="number"
                               css={{ maxWidth: 100 }}
                               value={getFieldValue(TimerType.SHORT_BREAK)}
                               onChange={handleTimerChange(TimerType.SHORT_BREAK)} />
                    </OptionContainer>
                    <OptionContainer type="row" css={{ marginTop: 12 }}>
                        <OptionLabel>{TIMER_TYPE_LABEL[TimerType.LONG_BREAK]}</OptionLabel>
                        <Input type="number"
                               css={{ maxWidth: 100 }}
                               value={getFieldValue(TimerType.LONG_BREAK)}
                               onChange={handleTimerChange(TimerType.LONG_BREAK)} />
                    </OptionContainer>
                </OptionContainer>

                <OptionContainer type="col">
                    <OptionLabel>
                        <NotificationsIcon />
                        Alarm Sound
                    </OptionLabel>
                    <OptionContainer type="row">
                        <Slider value={settings.notificationVolume}
                                style={{ width: "100%" }}
                                onChange={handleVolumeChange} />
                    </OptionContainer>
                </OptionContainer>
            </div>
        </ModalPopup>
    );
};

const OptionLabel = styled.div`
    font-size: 14px;

    & svg {
        margin-right: 8px;
        width: 32px;
    }

    display: flex;
    align-items: center;
`;

interface IOptionContainerProps {
    readonly type?: "row" | "col";
}

const OptionContainer = styled("div", { shouldForwardProp: prop => prop !== "type" })
<IOptionContainerProps>`
    margin-top: 24px;

    ${({ type = "row" }) => type === "row" ? `
        display: flex;
        align-items: center;
        justify-content: space-between;
    ` : ""}

    ${({ type }) => type === "col" ? `
    ` : ""}
`;

const Input = styled.input`
    border-radius: 10px;
    background: ${({ theme }) => theme.palette.background.secondary};
    border: none;
    padding: 10px 14px;
    color: ${({ theme }) => theme.palette.typography.primary};
    outline: 0;

    &:hover {
        outline: none;
    }

    -moz-appearance: textfield;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

`;
