import React from "react";

export interface IUser {
    readonly id: string;
    readonly name: string;
    readonly email: string;
    readonly profile_picture_url: string;
    readonly token: string;
}

interface IUserContext {
    readonly setUser: (user: IUser | null) => void;
    readonly user: IUser | null;
}

const UserContext = React.createContext<IUserContext | null>(null);

interface IUserProviderProps {
    readonly children: React.ReactNode;
}

const getExistingUser = (): IUser | null => {
    const userData = window.localStorage.getItem("user");

    if (! userData) {
        return null;
    }

    try {
        return JSON.parse(userData);
    } catch (e: unknown) {
        console.error(e);
        return  null;
    }
};

export const UserProvider: React.FC<IUserProviderProps> = (props) => {
    const [user, setUser] = React.useState<IUser | null>(getExistingUser);

    const setUserDelegate = React.useCallback((user: IUser | null) => {
        setUser(user);

        if (user) {
            window.localStorage.setItem("user", JSON.stringify(user));
        } else {
            window.localStorage.removeItem("user");
        }
    }, [setUser]);

    const value = React.useMemo(() =>
        ({ user, setUser: setUserDelegate }), [setUserDelegate, user]);

    return <UserContext.Provider {...props} value={value} />
};

export const useOptionalUser = () => {
    const store = React.useContext(UserContext);

    if (! store) {
        throw new Error("useUser must be used within a component that's wrapped with UserProvider");
    }

    return store;
};

export const useUser = () => {
    const store = useOptionalUser();

    if (! store.user) {
        throw new Error("useUser must not be used within components that don't require authentication, use useOptionalUser instead!");
    }

    return store;
};
