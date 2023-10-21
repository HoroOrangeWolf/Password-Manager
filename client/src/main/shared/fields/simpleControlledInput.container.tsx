import { Control, Controller } from 'react-hook-form';
import { Input, Typography } from 'antd';
import React from 'react';
import styled from 'styled-components';

type PropsType = {
    name: string;
    label: string;
    placeholder: string;
    control: Control<any>,
    type?: string;
}

const { Text } = Typography;

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const SimpleControlledInputContainer = ({
  name, control, label, placeholder, type,
}: PropsType) => (
  <Controller
    control={control}
    render={({ field, fieldState }) => (
      <StyledContainer>
        <Input
          {...field}
          placeholder={placeholder}
          size="large"
          type={type}
          addonBefore={label}
          status={fieldState.invalid && 'error'}
        />
        {fieldState.invalid && (
          <Text type="danger">
            {fieldState.error?.message}
          </Text>
        )}
      </StyledContainer>

    )}
    name={name}
  />
);

export default SimpleControlledInputContainer;
