import {IUser} from "./store/user.store.js";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const GET_GOOGLE_AUTH_URL = `${BASE_URL}/auth/google`;
export const GET_USER_INFO = `${BASE_URL}/me`;


export interface IAuthResponse {
    readonly url: string;
}

export interface IMeResponse extends Omit<IUser, "token"> {}
