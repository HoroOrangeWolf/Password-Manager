import styled from 'styled-components';
import React, { useMemo } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { MainStoreStateType } from '../../../store/types/mainStore.type';
import { selectCurrentPasswords, selectFolders } from '../../../store/slices/passwords/selectors/password.selectors';
import FolderListEntryContainer from './folderListEntry.container';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;
`;

type PropsType = {

} & ConnectorType

const FoldersListContainer = (props: PropsType) => {
  const foldersElements = useMemo(() => (
    Object.entries(props.folders)
      .map(([key, value]) => (
        <FolderListEntryContainer folder={value.folder} key={key} />
      ))
  ), [props.folders]);

  return (
    <StyledContainer>
      {foldersElements}
    </StyledContainer>
  );
};

const mapStateToProps = (state: MainStoreStateType) => ({
  folders: selectFolders(state),
});

const connector = connect(mapStateToProps);

type ConnectorType = ConnectedProps<typeof connector>;

export default connector(FoldersListContainer);
