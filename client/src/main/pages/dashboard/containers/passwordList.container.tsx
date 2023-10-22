import styled from 'styled-components';
import React, { useMemo } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { MainStoreStateType } from '../../../store/types/mainStore.type';
import { selectCurrentPasswords } from '../../../store/slices/passwords/selectors/password.selectors';
import PasswordEntryContainer from './passwordEntry.container';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 2;
  border-left: 1px solid lightgray;
  border-right: 1px solid lightgray;
`;

type PropsType = {

} & ConnectorProps

const PasswordListContainer = (props: PropsType) => {
  const passwordElements = useMemo(() => (
    props.passwords
      .map((password) => (
        <PasswordEntryContainer key={password.id} password={password} />
      ))
  ), [props.passwords]);

  return (
    <StyledContainer>
      {passwordElements}
    </StyledContainer>
  );
};

const mapStateToProps = (state: MainStoreStateType) => ({
  passwords: selectCurrentPasswords(state),
});

const mapDispatchToProps = {};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ConnectorProps = ConnectedProps<typeof connector>;

export default connector(PasswordListContainer);
