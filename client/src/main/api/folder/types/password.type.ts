export type PasswordType = {
    id: string;
    name: string;
    login: string;
    password: string;
    pageUrl: string;
    lastModified: number;
    createdAt: number;
}

export type AddPasswordRequest = {
    name: string;
    login: string;
    password: string;
    pageUrl: string;
    masterKey: string;
}
