import { MainStoreStateType } from '../../../types/mainStore.type';
import FetchingStatusConstant from '../../../../shared/constant/fetchingStatus.constant';

export const selectCurrentUserFetching = ({ context }: MainStoreStateType) => (
  context.currentUser.status === FetchingStatusConstant.FETCHING || context.currentUser.status === FetchingStatusConstant.PENDING
);

export const selectMasterKey = ({ context }: MainStoreStateType) => (
  context.masterPassword
);

export const selectIsUserFetched = ({ context }: MainStoreStateType) => (
  context.currentUser.status === FetchingStatusConstant.SUCCESS
);

export const selectIsNavigationBlock = ({ context }: MainStoreStateType) => (
  context.isBlockedNavigation
);

export const selectIsCurrentUserError = ({ context }: MainStoreStateType) => (
  context.currentUser.status === FetchingStatusConstant.ERROR
);
