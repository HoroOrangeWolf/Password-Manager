import styled from 'styled-components';
import { Typography } from 'antd';
import { connect, ConnectedProps } from 'react-redux';
import React from 'react';
import { PasswordType } from '../../../api/folder/types/password.type';
import { MainStoreStateType } from '../../../store/types/mainStore.type';
import { selectCurrentSelectedPasswordId } from '../../../store/slices/passwords/selectors/password.selectors';
import { setCurrentPassword } from '../../../store/slices/passwords/passwords.slice';

type PropsType = {
    password: PasswordType
} & ConnectorProps

const StyledContainer = styled.div<{isSelected: boolean}>`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 5px;
  background-color: ${({ isSelected }) => (isSelected ? '#F8F8F8' : 'none')};
  border-bottom: 1px solid #F5F5F5;
  
  &:hover {
    background-color: #F8F8F8;
  }
`;

const { Title, Paragraph } = Typography;

const PasswordEntryContainer = (props: PropsType) => {
  const isCurrentPassword = props.password.id === props.selectedCurrentPassword;

  return (
    <StyledContainer
      isSelected={isCurrentPassword}
      onClick={() => props.setCurrentPassword(props.password.id)}
    >
      <Title level={5}>{props.password.name}</Title>
      <Paragraph type="secondary">{props.password.login}</Paragraph>
    </StyledContainer>
  );
};

const mapStateToProps = (state: MainStoreStateType) => ({
  selectedCurrentPassword: selectCurrentSelectedPasswordId(state),
});

const mapDispatchToProps = {
  setCurrentPassword,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ConnectorProps = ConnectedProps<typeof connector>;

export default connector(PasswordEntryContainer);
