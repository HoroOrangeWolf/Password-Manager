export type PasswordType = {
    id: string;
    name: string;
    login: string;
    password: string;
    pageUrl: string;
    parentFolder: string;
    lastModified: number;
    createdAt: number;
}

export type PasswordRequestType = Omit<PasswordType, 'createdAt' | 'lastModified' | 'id'> & {
    parentFolder: string;
};

export type AddPasswordRequest = {
    masterKey: string;
} & PasswordRequestType
