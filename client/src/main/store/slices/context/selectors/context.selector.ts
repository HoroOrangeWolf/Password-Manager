import { MainStoreStateType } from '../../../types/mainStore.type';
import FetchingStatusConstant from '../../../../shared/constant/fetchingStatus.constant';

export const selectCurrentUserFetching = ({ context }: MainStoreStateType) => (
  context.currentUser.status === FetchingStatusConstant.FETCHING || context.currentUser.status === FetchingStatusConstant.PENDING
);

export const selectIsUserFetched = ({ context }: MainStoreStateType) => (
  context.currentUser.status === FetchingStatusConstant.SUCCESS
);

export const selectIsCurrentUserError = ({ context }: MainStoreStateType) => (
  context.currentUser.status === FetchingStatusConstant.ERROR
);
