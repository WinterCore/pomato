export interface IOAuthUserData {
    readonly uid: string;
    readonly email: string;
    readonly name: string;
    readonly profile_picture_url: string;
}

export interface IOAuthProvider {
    readonly getAuthURL: () => string;
    // readonly getData: () => Promise<IOAuthUserData>;
}
