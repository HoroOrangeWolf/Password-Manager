import styled from 'styled-components';
import React, { useMemo } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { isEmpty } from 'lodash';
import { Button } from 'antd';
import { MainStoreStateType } from '../../../store/types/mainStore.type';
import { selectCurrentPasswords } from '../../../store/slices/passwords/selectors/password.selectors';
import PasswordEntryContainer from './passwordEntry.container';
import { clearCurrentSelectedPassword } from '../../../store/slices/passwords/passwords.slice';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;
  border-left: 1px solid lightgray;
  border-right: 1px solid lightgray;
`;

type PropsType = {

} & ConnectorProps

const StyledWrapper = styled.div`
  display: flex;
  flex: 2;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
`;

const StyledTop = styled.div`
  height: 90%;
  padding: 5px;
`;

const StyledBottom = styled.div`
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledButton = styled(Button)`
  width: 100%;
  height: 100%;
  border-radius: 0;
`;

const PasswordListContainer = (props: PropsType) => {
  const passwordElements = useMemo(() => (
    props.passwords
      ?.map((password) => (
        <PasswordEntryContainer key={password.id} password={password} />
      )) ?? []
  ), [props.passwords]);

  if (isEmpty(passwordElements)) {
    return (
      <StyledContainer>
        <StyledTop>
          <StyledWrapper>
            <span>No password</span>
          </StyledWrapper>
        </StyledTop>
        <StyledBottom>
          <StyledButton type="primary" onClick={() => props.clearCurrentSelectedPassword()}>
            Add new password
          </StyledButton>
        </StyledBottom>
      </StyledContainer>
    );
  }

  return (
    <StyledContainer>
      <StyledTop>
        {passwordElements}
      </StyledTop>
      <StyledBottom>
        <StyledButton type="primary" onClick={() => props.clearCurrentSelectedPassword()}>
          Add new password
        </StyledButton>
      </StyledBottom>
    </StyledContainer>
  );
};

const mapStateToProps = (state: MainStoreStateType) => ({
  passwords: selectCurrentPasswords(state),
});

const mapDispatchToProps = {
  clearCurrentSelectedPassword,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ConnectorProps = ConnectedProps<typeof connector>;

export default connector(PasswordListContainer);
