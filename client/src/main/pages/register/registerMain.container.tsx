import React from 'react';
import styled from 'styled-components';
import { Button, Typography } from 'antd';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
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

const { Title } = Typography;

const schema = yup.object({
  username: yup.string().min(3, 'This field must has min 3 characters').max(15, 'This field must has max 15 characters').required('This field is required'),
  email: yup.string().email('This field must be an email').required('This field is required'),
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
  email: '',
  username: '',
  password: '',
};

const RegisterMainContainer = () => {
  const form = useForm<FormData>({
    defaultValues,
    // @ts-ignore
    resolver: yupResolver(schema),
  });

  const navigator = useNavigate();

  const { control } = form;

  const onSubmit = (data: FormData) => {
    console.log('Data', data);
  };

  return (
    <StyledWrapper>
      <Title level={1}>Register</Title>
      <StyledForm onSubmit={form.handleSubmit(onSubmit)}>
        <SimpleControlledInputContainer
          name="username"
          label="Username"
          placeholder="Username"
          control={control}
        />
        <SimpleControlledInputContainer
          name="email"
          label="Email"
          placeholder="Email"
          control={control}
        />
        <SimpleControlledInputContainer
          name="password"
          label="Password"
          type="password"
          placeholder="Password"
          control={control}
        />
        <SimpleControlledInputContainer
          name="confirmPassword"
          label="Confirm Password"
          type="password"
          placeholder="Confirm Password"
          control={control}
        />
        <Button
          type="primary"
          size="large"
          onClick={(e) => {
            // @ts-ignore
            e.currentTarget?.form?.requestSubmit();
          }}
        >
          Register
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

export default RegisterMainContainer;
