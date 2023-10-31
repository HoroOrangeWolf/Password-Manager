import styled from 'styled-components';
import { Typography } from 'antd';
import { connect, ConnectedProps } from 'react-redux';
import React from 'react';
import { DeleteOutlined, FolderOutlined } from '@ant-design/icons';
import { MainStoreStateType } from '../../../store/types/mainStore.type';
import {
  selectCurrentFolder,
} from '../../../store/slices/passwords/selectors/password.selectors';
import { FolderPasswordType } from '../../../api/folder/types/folderPassword.type';
import { setCurrentFolder } from '../../../store/slices/passwords/passwords.slice';
import { selectIsNavigationBlock } from '../../../store/slices/context/selectors/context.selector';
import { openConfirmRemoveFolderDialog, setFolderToRemove } from '../../../store/slices/dialogs/dialog.slice';

type PropsType = {
    folder: FolderPasswordType
} & ConnectorProps

const StyledContainer = styled.div<{ isSelected: boolean }>`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 5px;
  padding: 5px;
  height: 2rem;
  background-color: ${({ isSelected }) => (isSelected ? '#F8F8F8' : 'none')};
  border-bottom: 1px solid #F5F5F5;

  &:hover {
    background-color: #F8F8F8;
  }
`;

const LeftPanel = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
`;

const { Text } = Typography;

const FolderListEntryContainer = (props: PropsType) => {
  const isCurrentFolder = props.folder.id === props.currentFolder;

  const handleRemoveFolder = () => {
    if (props.isBlockedNavigation) {
      return;
    }

    props.setFolderToRemove(props.folder);
    props.openConfirmRemoveFolderDialog();
  };

  return (
    <StyledContainer isSelected={isCurrentFolder}>
      <LeftPanel onClick={() => {
        if (props.isBlockedNavigation) {
          return;
        }

        props.setCurrentFolder(props.folder.id);
      }}
      >
        <FolderOutlined />
        <Text>{props.folder.name}</Text>
      </LeftPanel>
      <div role="presentation" onClick={handleRemoveFolder}>
        <DeleteOutlined />
      </div>
    </StyledContainer>
  );
};

const mapStateToProps = (state: MainStoreStateType) => ({
  currentFolder: selectCurrentFolder(state),
  isBlockedNavigation: selectIsNavigationBlock(state),
});

const mapDispatchToProps = {
  setCurrentFolder,
  setFolderToRemove,
  openConfirmRemoveFolderDialog,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ConnectorProps = ConnectedProps<typeof connector>;

export default connector(FolderListEntryContainer);
