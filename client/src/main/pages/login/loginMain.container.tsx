import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Typography } from 'antd';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import SimpleControlledInputContainer from '../../shared/fields/simpleControlledInput.container';
import { LoginType, loginUser } from '../../store/slices/context/thunks/context.thunks';

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
  username: yup.string().required('This field is required'),
  password: yup.string().required('This field is required'),
})
  .required();

type FormData = yup.InferType<typeof schema>;

const defaultValues: FormData = {
  username: '',
  password: '',
};

const { Title } = Typography;

type PropsType = {

} & ConnectorProps

const LoginMainContainer = (props: PropsType) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
    defaultValues,
    // @ts-ignore
    resolver: yupResolver(schema),
  });

  const navigator = useNavigate();

  const handleSubmit = async (user: FormData) => {
    try {
      setIsLoading(true);
      await props.loginUser(user as LoginType);
    } catch (e) {
      console.error('Couldn\'t login', e);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <StyledWrapper onSubmit={form.handleSubmit(handleSubmit)}>
      <Title level={1}>Login</Title>
      <StyledForm>
        <SimpleControlledInputContainer
          name="username"
          label="Email"
          placeholder="Username"
          control={form.control}
        />
        <SimpleControlledInputContainer
          name="password"
          label="Password"
          type="password"
          placeholder="Password"
          control={form.control}
        />
        <Button
          type="primary"
          size="large"
          disabled={isLoading}
          onClick={(e) => {
            // @ts-ignore
            e.currentTarget?.form?.requestSubmit();
          }}
        >
          Login
        </Button>
        <Button
          disabled={isLoading}
          size="large"
          onClick={() => navigator('/')}
        >
          Back
        </Button>
      </StyledForm>
    </StyledWrapper>
  );
};

const mapStateToProps = () => ({});

const mapDispatchToProps = {
  loginUser,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ConnectorProps = ConnectedProps<typeof connector>;

export default connector(LoginMainContainer);
