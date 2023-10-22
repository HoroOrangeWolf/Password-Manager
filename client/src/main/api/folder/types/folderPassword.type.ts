import { PasswordType } from '../../password/types/password.type';

export type FolderPasswordType = {
    id: string;
    name: string;
    order: number;
    passwordEntries: PasswordType[];
    lastModified: number;
    createdAt: number;
}
