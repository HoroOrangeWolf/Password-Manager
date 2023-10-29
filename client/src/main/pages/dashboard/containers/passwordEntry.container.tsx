import styled from 'styled-components';
import { Typography } from 'antd';
import { connect, ConnectedProps } from 'react-redux';
import React from 'react';
import { PasswordType } from '../../../api/folder/types/password.type';
import { MainStoreStateType } from '../../../store/types/mainStore.type';
import { selectCurrentSelectedPasswordId } from '../../../store/slices/passwords/selectors/password.selectors';

type PropsType = {
    password: PasswordType
} & ConnectorProps

const StyledContainer = styled.div<{isSelected: boolean}>`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 5px;
  background-color: ${({ isSelected }) => (isSelected ? '#E5E4E2' : 'none')};
  
  &:hover {
    background-color: #E5E4E2;
  }
`;

const { Title, Paragraph } = Typography;

const PasswordEntryContainer = ({ password, selectedCurrentPassword }: PropsType) => {
  const isCurrentPassword = password.id === selectedCurrentPassword;

  return (
    <StyledContainer isSelected={isCurrentPassword}>
      <Title level={4}>{password.name}</Title>
      <Paragraph type="secondary">{password.login}</Paragraph>
    </StyledContainer>
  );
};

const mapStateToProps = (state: MainStoreStateType) => ({
  selectedCurrentPassword: selectCurrentSelectedPasswordId(state),
});

const connector = connect(mapStateToProps);

type ConnectorProps = ConnectedProps<typeof connector>;

export default connector(PasswordEntryContainer);
