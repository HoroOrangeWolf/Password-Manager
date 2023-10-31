import React from 'react';
import { Modal } from 'antd';
import { connect, ConnectedProps } from 'react-redux';
import { MainStoreStateType } from '../../../store/types/mainStore.type';
import {
  selectDialogMode,
  selectFolderToRemove,
  selectIsDialogOpen,
} from '../../../store/slices/dialogs/selectors/dialog.selector';
import DialogModesConstant from '../../../store/slices/dialogs/constant/dialogModes.constant';
import { closeDialog } from '../../../store/slices/dialogs/dialog.slice';
import { removeFolder } from '../../../store/slices/passwords/thunks/password.thunks';
import { selectIsNavigationBlock } from '../../../store/slices/context/selectors/context.selector';
import { setNavigationBlock } from '../../../store/slices/context/context.slice';

type PropsType = {
} & ConnectorProps;

const AddNewFolderDialog = (props: PropsType) => {
  const isDialogOpen = props.isOpen && props.dialogMode === DialogModesConstant.REMOVE_FOLDER;

  const handleRemovePassword = async () => {
    props.setNavigationBlock(true);

    try {
      await props.removeFolder(props.folderToRemove?.id);
    } catch (e) {
      console.error(e);
    } finally {
      props.setNavigationBlock(false);
      props.closeDialog();
    }
  };

  return (
    <Modal
      title="Add Folder"
      open={isDialogOpen}
      okText="Submit"
      onCancel={() => props.closeDialog()}
      confirmLoading={props.navigationBlocked}
      onOk={handleRemovePassword}
    >
      <div>
        Do you wish to remove
        {' '}
        {props.folderToRemove?.name}
        ?
      </div>
    </Modal>
  );
};

const mapStateToProps = (state: MainStoreStateType) => ({
  isOpen: selectIsDialogOpen(state),
  dialogMode: selectDialogMode(state),
  folderToRemove: selectFolderToRemove(state),
  navigationBlocked: selectIsNavigationBlock(state),
});

const mapDispatchToProps = {
  closeDialog,
  removeFolder,
  setNavigationBlock,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ConnectorProps = ConnectedProps<typeof connector>

export default connector(AddNewFolderDialog);
