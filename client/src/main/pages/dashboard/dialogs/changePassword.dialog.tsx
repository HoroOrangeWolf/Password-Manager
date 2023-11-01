import { Modal } from 'antd';
import React, { useRef } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import * as yup from 'yup';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { MainStoreStateType } from '../../../store/types/mainStore.type';
import { selectDialogMode, selectIsDialogOpen } from '../../../store/slices/dialogs/selectors/dialog.selector';
import { closeDialog } from '../../../store/slices/dialogs/dialog.slice';
import DialogModesConstant from '../../../store/slices/dialogs/constant/dialogModes.constant';
import SimpleControlledInputContainer from '../../../shared/fields/simpleControlledInput.container';
import { selectIsNavigationBlock } from '../../../store/slices/context/selectors/context.selector';
import { setNavigationBlock } from '../../../store/slices/context/context.slice';
import { changePassword } from '../../../store/slices/context/thunks/context.thunks';

type PropsType = {

} & ConnectorProps

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const schema = yup.object({
  password: yup.string().matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, {
    message: 'Password should contain minimum eight characters, at least one letter, one number and one special character.',
  })
    .required('This field is required'),
  confirmPassword: yup.string().oneOf([yup.ref('password'), null], 'Password must match').required('This field is required'),
})
  .required();

type FormData = yup.InferType<typeof schema>;

const defaultValues: FormData = {
  confirmPassword: '',
  password: '',
};

const ChangePasswordDialog = (props: PropsType) => {
  const ref = useRef<HTMLFormElement>(null);
  const isDialogOpen = props.isDialogOpen && props.dialogMode === DialogModesConstant.CHANGE_PASSWORD;

  const form = useForm({
    defaultValues,
    // @ts-ignore
    resolver: yupResolver(schema),
  });

  const handleSubmit = (formData: FormData) => {
    props.changePassword(formData.password);
  };

  return (
    <Modal
      title="Change password"
      open={isDialogOpen}
      okText="Submit"
      onCancel={() => props.closeDialog()}
      confirmLoading={props.navigationBlocked}
      onOk={() => ref.current.requestSubmit()}
    >
      <StyledForm onSubmit={form.handleSubmit(handleSubmit)} ref={ref}>
        <SimpleControlledInputContainer
          name="password"
          label="New Password"
          type="password"
          placeholder="New Password"
          control={form.control}
        />
        <SimpleControlledInputContainer
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="Confirm Password"
          control={form.control}
        />
      </StyledForm>
    </Modal>
  );
};

const mapStateToProps = (state: MainStoreStateType) => ({
  isDialogOpen: selectIsDialogOpen(state),
  navigationBlocked: selectIsNavigationBlock(state),
  dialogMode: selectDialogMode(state),
});

const mapDispatchToProps = {
  closeDialog,
  changePassword,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ConnectorProps = ConnectedProps<typeof connector>

export default connector(ChangePasswordDialog);
