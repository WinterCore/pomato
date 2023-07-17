import React from "react";
import {animated, Spring} from "@react-spring/web";
import styled from "@emotion/styled";
import {SettingsIcon} from "../icons/Settings.js";
import {AccountIcon} from "../icons/Account.js";
import {useAuthenticator} from "../hooks/use-authenticator.js";
import {useOptionalUser} from "../store/user.store.js";
import {Loader as LoaderDefault} from "../icons/Loader.js";

interface INavbarProps {
    readonly zenMode: boolean;
    readonly toggleSettings: () => void;
    readonly toggleAccount: () => void;
}

export const Navbar: React.FC<INavbarProps> = (props) => {
    const { zenMode, toggleSettings, toggleAccount } = props;
    const { authenticate, isLoading } = useAuthenticator();
    const { user } = useOptionalUser();
    
    return (
        <Spring to={{ opacity: zenMode ? 0 : 1 }}>
            {(styles: any) => (
                <Container style={styles}>
                    <div />
                    <Right>
                        {isLoading && <Loader />}
                        {user && ! isLoading && (
                            <Avatar alt="Profile Picture"
                                    onClick={toggleAccount}
                                    src={user.profile_picture_url} />
                        )}
                        {! user && ! isLoading && <AccountIcon onClick={authenticate} />}
                        <SettingsCog onClick={toggleSettings} />
                    </Right>
                </Container>
            )}
        </Spring>
    );
};

const Loader = styled(LoaderDefault)`
    color: ${({ theme }) => theme.palette.typography.primary}!important;
`;

const Avatar = styled.img`
    width: 28px;
    height: 28px;
    border-radius: 100%;
    cursor: pointer;
`;

const Container = styled(animated.div)`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 16px;

    svg {
        color: ${({ theme }) => theme.palette.typography.hint};
        transition: all 150ms ease-in-out;
        width: 24px;
        cursor: pointer;

        &:hover {
            color: ${({ theme }) => theme.palette.typography.primary};
        }
    }
`;

const Right = styled.div`
    display: flex;
    align-items: center;
    gap: 14px;
`;

const SettingsCog = styled(SettingsIcon)`
    &:hover {
        transform: rotate(45deg);
    }
`;
