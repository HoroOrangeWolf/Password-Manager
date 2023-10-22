import styled from 'styled-components';
import { Typography } from 'antd';
import { connect, ConnectedProps } from 'react-redux';
import React from 'react';
import { MainStoreStateType } from '../../../store/types/mainStore.type';
import {
  selectCurrentFolder,
} from '../../../store/slices/passwords/selectors/password.selectors';
import { FolderPasswordType } from '../../../api/folder/types/folderPassword.type';

type PropsType = {
    folder: FolderPasswordType
} & ConnectorProps

const StyledContainer = styled.div<{isSelected: boolean}>`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 5px;
  background-color: ${({ isSelected }) => (isSelected ? '#E5E4E2' : 'none')};

  &:hover {
    background-color: #E5E4E2;
  }
`;

const { Title } = Typography;

const FolderListEntryContainer = ({ folder, currentFolder }: PropsType) => {
  const isCurrentPassword = folder.id === currentFolder;

  return (
    <StyledContainer isSelected={isCurrentPassword}>
      <Title level={4}>{folder.name}</Title>
    </StyledContainer>
  );
};

const mapStateToProps = (state: MainStoreStateType) => ({
  currentFolder: selectCurrentFolder(state),
});

const connector = connect(mapStateToProps);

type ConnectorProps = ConnectedProps<typeof connector>;

export default connector(FolderListEntryContainer);
