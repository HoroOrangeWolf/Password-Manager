import React from 'react';
import { Modal } from 'antd';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import styled from 'styled-components';
import * as yup from 'yup';
import { connect, ConnectedProps } from 'react-redux';
import SimpleControlledInputContainer from '../../../shared/fields/simpleControlledInput.container';
import { MainStoreStateType } from '../../../store/types/mainStore.type';
import { selectDialogMode, selectIsDialogOpen } from '../../../store/slices/dialogs/selectors/dialog.selector';
import DialogModesConstant from '../../../store/slices/dialogs/constant/dialogModes.constant';

type PropsType = {
} & ConnectorProps;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const schema = yup.object({
  name: yup.string().min(3).max(15).required('This field is required'),
})
  .required();

type FormData = yup.InferType<typeof schema>;

const defaultValues: FormData = {
  name: '',
};

const AddNewFolderDialog = (props: PropsType) => {
  const form = useForm<FormData>({
    defaultValues,
    // @ts-ignore
    resolver: yupResolver(schema),
  });

  const isDialogOpen = props.isOpen && props.dialogMode === DialogModesConstant.CREATE_FOLDER;

  return (
    <Modal title="Add Folder" open={isDialogOpen} okText="Submit">
      <StyledForm>
        <SimpleControlledInputContainer
          name="name"
          label="Folder name"
          placeholder="Folder name"
          control={form.control}
        />
      </StyledForm>
    </Modal>
  );
};

const mapStateToProps = (state: MainStoreStateType) => ({
  isOpen: selectIsDialogOpen(state),
  dialogMode: selectDialogMode(state),
});

const mapDispatchToProps = {

};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ConnectorProps = ConnectedProps<typeof connector>

export default connector(AddNewFolderDialog);
