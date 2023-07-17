import React from "react";
import {GET_GOOGLE_AUTH_URL, GET_USER_INFO, IAuthResponse, IMeResponse} from "../apis.js";
import {useOptionalUser} from "../store/user.store.js";

export const useAuthenticator = () => {
    const { setUser } = useOptionalUser();
    const [isLoading, setLoading] = React.useState<boolean>(false);

    const authenticate = React.useCallback(() => {
        (async () => {
            if (isLoading) {
                return;
            }

            setLoading(true);

            try {
                const resp = await fetch(GET_GOOGLE_AUTH_URL, {
                    headers: { Accept: "application/json" }
                });

                if (! resp.ok) {
                    alert("Something happened");
                    setLoading(false);
                    return;
                }

                const { url } = await resp.json() as IAuthResponse;

                window.location.href = url;
            } catch (e: unknown) {
                console.error(e);
                alert("Something happened");
                setLoading(false);
            }
        })().catch(console.error);
    }, [setLoading, isLoading]);

    React.useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const isAuth = window.location.pathname.startsWith("/auth");
        const token = searchParams.get("token");
        
        const getUserData = async (token: string) => {
            setLoading(true);

            const resp = await fetch(GET_USER_INFO, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    Accept: "application/json",
                }
            });

            if (! resp.ok) {
                alert("Something happened");
                setLoading(false);
                throw new Error(await resp.text());
            }

            const data = await resp.json() as IMeResponse;
            setUser({ ...data, token });
            window.history.replaceState({}, document.title, "/");
            setLoading(false);
        };
        
        if (isAuth && token) {
            getUserData(token).catch(console.error);
        }
    }, [setUser, setLoading]);

    const logout = React.useCallback(() => setUser(null), [setUser]);

    return {
        authenticate,
        isLoading,
        logout,
    };
};
