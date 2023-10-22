import FetchingStatusConstant from '../constant/fetchingStatus.constant';

type FetchingStatusTypof = typeof FetchingStatusConstant;

type FetchingStatusKeys = keyof FetchingStatusTypof;

export type FetchingStatusType = FetchingStatusTypof[FetchingStatusKeys]
