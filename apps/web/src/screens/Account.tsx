import React, {HTMLAttributes} from "react";
import {Button} from "../components/Button.js";
import {ModalPopup, ModalPopupHeading, ModalPopupSeparator} from "../components/ModalPopup.js";
import {useAuthenticator} from "../hooks/use-authenticator.js";
import {LogoutIcon} from "../icons/Logout.js";

interface IAccountScreenProps extends HTMLAttributes<HTMLDivElement> {
    readonly open: boolean;
    readonly close: () => void;
}

export const AccountScreen: React.FC<IAccountScreenProps> = (props) => {
    const { open, close, ...restProps } = props;
    const { logout } = useAuthenticator();

    const handleLogout = () => {
        logout();
        close();
    };

    return (
        <ModalPopup open={open} onClose={close} {...restProps}>
            <ModalPopupHeading>Account</ModalPopupHeading>
            <ModalPopupSeparator />
            <Button style={{ width: "100%" }}
                    onClick={handleLogout}
                    icon={<LogoutIcon style={{ width: 24 }} />}>
                Logout
            </Button>
        </ModalPopup>
    );
};
