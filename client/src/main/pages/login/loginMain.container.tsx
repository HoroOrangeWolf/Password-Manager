import React from 'react';
import styled from 'styled-components';
import { Button, Typography } from 'antd';
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import SimpleControlledInputContainer from '../../shared/fields/simpleControlledInput.container';

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

const LoginMainContainer = () => {
  const form = useForm({
    defaultValues,
    // @ts-ignore
    resolver: yupResolver(schema),
  });

  const navigator = useNavigate();

  return (
    <StyledWrapper>
      <Title level={1}>Login</Title>
      <StyledForm>
        <SimpleControlledInputContainer
          name="username"
          label="Username"
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
          onClick={(e) => {
            // @ts-ignore
            e.currentTarget?.form?.requestSubmit();
          }}
        >
          Login
        </Button>
        <Button
          size="large"
          onClick={() => navigator('/')}
        >
          Back
        </Button>
      </StyledForm>
    </StyledWrapper>
  );
};

export default LoginMainContainer;
