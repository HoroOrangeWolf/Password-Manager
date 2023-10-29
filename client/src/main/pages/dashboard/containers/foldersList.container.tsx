import styled from 'styled-components';
import React, { useMemo } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Collapse } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { MainStoreStateType } from '../../../store/types/mainStore.type';
import { selectFolders } from '../../../store/slices/passwords/selectors/password.selectors';
import FolderListEntryContainer from './folderListEntry.container';
import { openCreateFolderDialog } from '../../../store/slices/dialogs/dialog.slice';

const StyledContainer = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
`;

const StyledWrapper = styled.div`
  flex: 2;
`;

const HeaderWrapper = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

type PropsType = {

} & ConnectorType;

const FoldersListContainer = (props: PropsType) => {
  const foldersElements = useMemo(() => (
    Object.entries(props.folders ?? {})
      .map(([key, value]) => (
        <FolderListEntryContainer folder={value.folder} key={key} />
      ))
  ), [props.folders]);

  return (
    <StyledWrapper>
      <Collapse defaultActiveKey={['1']}>
        <Collapse.Panel
          header={(
            <HeaderWrapper onClick={() => props.openCreateFolderDialog()}>
              Folder
              <PlusOutlined />
            </HeaderWrapper>
)}
          key="1"
        >
          <StyledContainer>
            {foldersElements}
          </StyledContainer>
        </Collapse.Panel>
      </Collapse>
    </StyledWrapper>
  );
};

const mapStateToProps = (state: MainStoreStateType) => ({
  folders: selectFolders(state),
});

const mapDispatchToProps = {
  openCreateFolderDialog,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ConnectorType = ConnectedProps<typeof connector>;

export default connector(FoldersListContainer);
