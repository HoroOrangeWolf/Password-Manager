import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { useForm } from 'react-hook-form';
import { isNil } from 'lodash';
import styled from 'styled-components';
import { Button } from 'antd';
import { MainStoreStateType } from '../../../store/types/mainStore.type';
import {
  selectCurrentSelectedPassword,
} from '../../../store/slices/passwords/selectors/password.selectors';
import { PasswordRequestType, PasswordType } from '../../../api/folder/types/password.type';
import SimpleControlledInputContainer from '../../../shared/fields/simpleControlledInput.container';

type PropsType = {

} & ConnectorPropsType;

const defaultState: PasswordRequestType = {
  login: '', name: '', pageUrl: '', password: '',
};

const mapPasswordToRequest = (password: PasswordType): PasswordRequestType => ({
  name: password.name,
  password: password.password,
  login: password.login,
  pageUrl: password.pageUrl,
});

const StyledContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 10px;
  height: 100%;
`;

const ActionContainer = styled.div`
  margin-top: auto;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const PasswordPanelContainer = (props: PropsType) => {
  console.log('Panel');
  const isPasswordSelected = !isNil(props.currentPassword);

  const form = useForm({
    defaultValues: isPasswordSelected ? defaultState : mapPasswordToRequest(props.currentPassword),
  });

  useEffect(() => {
    form.reset();
  }, [props.currentPassword]);

  const getAction = () => {
    if (isPasswordSelected) {
      return (
        <Button type="primary">
          Update
        </Button>
      );
    }

    return (
      <Button type="primary">
        Create
      </Button>
    );
  };

  return (
    <StyledContainer>
      <SimpleControlledInputContainer name="name" label="name" placeholder="Password entry name" control={form.control} />
      <SimpleControlledInputContainer name="username" label="Username" placeholder="Username" control={form.control} />
      <SimpleControlledInputContainer name="password" label="Password" placeholder="Password" control={form.control} />
      <SimpleControlledInputContainer name="pageUrl" label="Url" placeholder="Url" control={form.control} />
      <ActionContainer>
        {getAction()}
      </ActionContainer>
    </StyledContainer>
  );
};

const mapStateToProps = (state: MainStoreStateType) => ({
  currentPassword: selectCurrentSelectedPassword(state),
});

const mapDispatchToProps = {

};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ConnectorPropsType = ConnectedProps<typeof connector>;

export default connect(PasswordPanelContainer);
