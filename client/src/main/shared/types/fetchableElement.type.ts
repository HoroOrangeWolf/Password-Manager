import { FetchingStatusType } from './fetchingStatus.type';

export type FetchableElementType<T> = {
    status: FetchingStatusType;
    value?: T
}
