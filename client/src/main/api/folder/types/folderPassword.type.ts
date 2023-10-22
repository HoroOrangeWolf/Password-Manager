import { PasswordType } from './password.type';

export type FolderPasswordType = {
    id: string;
    name: string;
    order: number;
    passwordEntries: PasswordType[];
    lastModified: number;
    createdAt: number;
}

export type AddFolderRequest = {
    name: string;
}
