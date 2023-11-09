import React, { useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useForm } from 'react-hook-form';
import { isNil } from 'lodash';
import styled from 'styled-components';
import { Button } from 'antd';
import { CopyOutlined, EyeFilled, EyeOutlined } from '@ant-design/icons';
import { toast } from 'react-toastify';
import { MainStoreStateType } from '../../../store/types/mainStore.type';
import { PasswordRequestType, PasswordType } from '../../../api/folder/types/password.type';
import SimpleControlledInputContainer from '../../../shared/fields/simpleControlledInput.container';
import SelectFolderContainer from './selectFolder.container';
import { addPassword, updatePassword } from '../../../store/slices/passwords/thunks/password.thunks';
import { selectIsNavigationBlock, selectMasterKey } from '../../../store/slices/context/selectors/context.selector';
import { setNavigationBlock } from '../../../store/slices/context/context.slice';
import { openConfirmRemovePasswordDialog, setPasswordToRemove } from '../../../store/slices/dialogs/dialog.slice';
import { selectCurrentFolder } from '../../../store/slices/passwords/selectors/password.selectors';

type PropsType = {
  currentPassword: PasswordType;
} & ConnectorPropsType;

const createDefaultState = (currentFolderId?: string): PasswordRequestType => ({
  parentFolder: currentFolderId ?? '',
  login: '',
  name: '',
  pageUrl: '',
  password: '',
});

const mapPasswordToRequest = (password: PasswordType): PasswordRequestType => ({
  name: password.name,
  password: password.password,
  login: password.login,
  pageUrl: password.pageUrl,
  parentFolder: password.parentFolder,
});

const StyledContainer = styled.div`
  width: 100%;
  padding: 5px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
`;

const ActionContainer = styled.div`
  margin-top: auto;
  display: flex;
  gap: 5px;
  flex-direction: row;
  justify-content: flex-end;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const StyledIconWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 5px;
`;

const PasswordPanelContainer = (props: PropsType) => {
  const [isPasswordNotHidden, setIsPasswordNotHidden] = useState(true);
  const isPasswordSelected = !isNil(props.currentPassword);

  const form = useForm({
    defaultValues: isPasswordSelected ? mapPasswordToRequest(props.currentPassword) : createDefaultState(props.currentFolderId),
  });

  const password = form.watch('password');

  const handleRemovePassword = () => {
    props.setPasswordToRemove(props.currentPassword);
    props.openConfirmRemovePasswordDialog();
  };

  const getAction = () => {
    if (isPasswordSelected) {
      return (
        <>
          <Button
            disabled={props.isBlockedNavigation}
            onClick={handleRemovePassword}
            size="large"
          >
            Delete
          </Button>
          <Button
            type="primary"
            disabled={props.isBlockedNavigation}
            size="large"
            onClick={(e) => {
              // @ts-ignore
              e.currentTarget?.form?.requestSubmit();
            }}
          >
            Update
          </Button>
        </>
      );
    }

    return (
      <Button
        type="primary"
        size="large"
        disabled={props.isBlockedNavigation}
        onClick={(e) => {
          // @ts-ignore
          e.currentTarget?.form?.requestSubmit();
        }}
      >
        Create
      </Button>
    );
  };

  const handleSubmit = async (formData: PasswordRequestType) => {
    props.setNavigationBlock(true);
    try {
      if (isPasswordSelected) {
        await props.updatePassword({ ...formData, masterKey: props.masterKey, passwordId: props.currentPassword.id });
        return;
      }

      await props.addPassword({ ...formData, masterKey: props.masterKey });
    } finally {
      props.setNavigationBlock(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(password);
    toast.success('Copied password to clipboard');
  };

  const handleChangePasswordVisibility = () => {
    setIsPasswordNotHidden(!isPasswordNotHidden);
  };

  const getPasswordIcons = () => (
    <StyledIconWrapper>
      <CopyOutlined onClick={handleCopy} />
      {isPasswordNotHidden ? <EyeFilled onClick={handleChangePasswordVisibility} /> : <EyeOutlined onClick={handleChangePasswordVisibility} />}
    </StyledIconWrapper>
  );

  return (
    <StyledContainer onSubmit={form.handleSubmit(handleSubmit)}>
      <StyledForm>
        <SimpleControlledInputContainer name="name" label="Name" placeholder="Password entry name" control={form.control} />
        <SimpleControlledInputContainer name="login" label="Login" placeholder="Login" control={form.control} />
        <SimpleControlledInputContainer
          name="password"
          label="Password"
          type={isPasswordNotHidden ? 'password' : 'text'}
          placeholder="Password"
          addonAfter={getPasswordIcons()}
          control={form.control}
        />
        <SimpleControlledInputContainer name="pageUrl" label="Url" placeholder="Url" control={form.control} />
        <SelectFolderContainer control={form.control} />
        <ActionContainer>
          {getAction()}
        </ActionContainer>
      </StyledForm>
    </StyledContainer>
  );
};

const mapStateToProps = (state: MainStoreStateType) => ({
  masterKey: selectMasterKey(state),
  isBlockedNavigation: selectIsNavigationBlock(state),
  currentFolderId: selectCurrentFolder(state),
});

const mapDispatchToProps = {
  addPassword,
  setPasswordToRemove,
  openConfirmRemovePasswordDialog,
  updatePassword,
  setNavigationBlock,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ConnectorPropsType = ConnectedProps<typeof connector>;

export default connector(PasswordPanelContainer);
