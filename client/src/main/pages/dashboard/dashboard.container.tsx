import styled from 'styled-components';
import { Outlet } from 'react-router-dom';
import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Spin } from 'antd';
import FoldersListContainer from './containers/foldersList.container';
import PasswordListContainer from './containers/passwordList.container';
import { MainStoreStateType } from '../../store/types/mainStore.type';
import { selectIsFetchingFolders } from '../../store/slices/passwords/selectors/password.selectors';
import AddNewFolderDialog from './dialogs/addNewFolder.dialog';

const StyledContainer = styled.div`
  width: 100vw;
  height: 80vh;
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
      <StyledContainer>
        <FoldersListContainer />
        <PasswordListContainer />
        <StyledRightPanel>
          <Outlet />
        </StyledRightPanel>
      </StyledContainer>
    </>
  );
};

const mapStateToProps = (state: MainStoreStateType) => ({
  isFetchingFolders: selectIsFetchingFolders(state),
});

const connector = connect(mapStateToProps);

type ConnectorProps = ConnectedProps<typeof connector>

export default connector(DashboardContainer);
