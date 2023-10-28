import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, Typography } from 'antd';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { connect, ConnectedProps } from 'react-redux';
import SimpleControlledInputContainer from '../../shared/fields/simpleControlledInput.container';
import { registerUser } from '../../store/slices/context/thunks/context.thunks';
import { RegisterRequestType } from '../../api/user/types/registerRequest.type';

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

type PropsType = {

} & ConnectorProps

const RegisterMainContainer = (props: PropsType) => {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<FormData>({
    defaultValues,
    // @ts-ignore
    resolver: yupResolver(schema),
  });

  const navigator = useNavigate();

  const { control } = form;

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    try {
      await props.registerUser(data as RegisterRequestType);
    } catch (e) {
      console.error("Couldn't register user", e);
    } finally {
      setIsLoading(false);
    }
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
          disabled={isLoading}
          onClick={(e) => {
            // @ts-ignore
            e.currentTarget?.form?.requestSubmit();
          }}
        >
          Register
        </Button>
        <Button
          size="large"
          disabled={isLoading}
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
  registerUser,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ConnectorProps = ConnectedProps<typeof connector>

export default connector(RegisterMainContainer);
