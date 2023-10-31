import styled from 'styled-components';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Spin } from 'antd';
import FoldersListContainer from './containers/foldersList.container';
import PasswordListContainer from './containers/passwordList.container';
import { MainStoreStateType } from '../../store/types/mainStore.type';
import {
  selectCurrentSelectedPassword,
  selectIsFetchingFolders,
} from '../../store/slices/passwords/selectors/password.selectors';
import AddNewFolderDialog from './dialogs/addNewFolder.dialog';
import PasswordPanelContainer from './containers/passwordPanel.container';
import RemoveFolderConfirmationDialog from './dialogs/removeFolderConfirmation.dialog';
import RemovePasswordConfirmationDialog from './dialogs/removePasswordConfirmation.dialog';

const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`;

const StyledRightPanel = styled.div`
  flex: 6;
`;

type PropsType = {

} & ConnectorProps

const DashboardContainer = (props: PropsType) => {
  if (props.isFetchingFolders) {
    return <Spin size="large" />;
  }

  return (
    <>
      <AddNewFolderDialog />
      <RemoveFolderConfirmationDialog />
      <RemovePasswordConfirmationDialog />
      <StyledContainer>
        <FoldersListContainer />
        <PasswordListContainer />
        <StyledRightPanel>
          <PasswordPanelContainer currentPassword={props.currentPassword} key={props.currentPassword?.id ?? ''} />
        </StyledRightPanel>
      </StyledContainer>
    </>
  );
};

const mapStateToProps = (state: MainStoreStateType) => ({
  isFetchingFolders: selectIsFetchingFolders(state),
  currentPassword: selectCurrentSelectedPassword(state),
});

const connector = connect(mapStateToProps);

type ConnectorProps = ConnectedProps<typeof connector>

export default connector(DashboardContainer);
