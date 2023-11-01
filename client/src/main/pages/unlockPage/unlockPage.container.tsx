import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Typography } from 'antd';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import SimpleControlledInputContainer from '../../shared/fields/simpleControlledInput.container';
import { unlockVault } from '../../store/slices/passwords/thunks/password.thunks';
import UserRepository from '../../api/user/repository/user.repository';

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  width: 100vh;
  justify-content: center;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const schema = yup.object({
  masterPassword: yup.string().required('This field is required'),
})
  .required();

type FormData = yup.InferType<typeof schema>;

const defaultValues: FormData = {
  masterPassword: '',
};

const { Title } = Typography;

type PropsType = {

} & ConnectorProps

const UnlockVaultPageContainer = (props: PropsType) => {
  const [isLogging, setIsLogging] = useState(false);

  const form = useForm({
    defaultValues,
    // @ts-ignore
    resolver: yupResolver(schema),
  });

  const navigator = useNavigate();

  const handleSubmit = async (req: FormData) => {
    setIsLogging(true);
    try {
      await props.unlockVault(req.masterPassword as string);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLogging(false);
    }
  };

  return (
    <StyledWrapper>
      <Title level={1}>Unlock vault</Title>
      <StyledForm onSubmit={form.handleSubmit(handleSubmit)}>
        <SimpleControlledInputContainer
          name="masterPassword"
          label="Master Password"
          type="password"
          placeholder="Master Password"
          control={form.control}
        />
        <Button
          type="primary"
          size="large"
          disabled={isLogging}
          onClick={(e) => {
            // @ts-ignore
            e.currentTarget?.form?.requestSubmit();
          }}
        >
          Unlock
        </Button>
        <Button
          size="large"
          disabled={isLogging}
          onClick={async () => {
            await UserRepository.logout();
            navigator('/');
          }}
        >
          Logout
        </Button>
      </StyledForm>
    </StyledWrapper>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  unlockVault,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ConnectorProps = ConnectedProps<typeof connector>;

export default connector(UnlockVaultPageContainer);
