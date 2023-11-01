import {
  Outlet,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import styled from 'styled-components';
import { Button, Spin } from 'antd';
import React, { useEffect } from 'react';
import { isEmpty } from 'lodash';
import { connect, ConnectedProps } from 'react-redux';
import { MainStoreStateType } from '../store/types/mainStore.type';
import { selectCurrentUserFetching } from '../store/slices/context/selectors/context.selector';
import { fetchCurrentUser, logoutUser } from '../store/slices/context/thunks/context.thunks';
import { clearPasswordStore } from '../store/slices/passwords/passwords.slice';
import { clearAllContext, clearMasterPassword } from '../store/slices/context/context.slice';
import { openChangePasswordDialog } from '../store/slices/dialogs/dialog.slice';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  min-width: 300px;
`;

const StyledOutletDiv = styled.div`
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  display: flex;
`;

type PropsType = {

} & ConnectorProps;

const MainPageContainer = (props: PropsType) => {
  const navigation = useNavigate();
  const location = useLocation();

  useEffect(() => {
    props.fetchCurrentUser();

    window.electronAPI.onLogout(() => {
      navigation('');
      props.logoutUser();
    });

    window.electronAPI.onLock(() => {
      navigation('unlock');
      props.clearPasswordStore();
      props.clearMasterPassword();
    });

    window.electronAPI.changePassword(() => {
      props.openChangePasswordDialog();
    });
  }, []);

  const goToLoginPage = () => {
    navigation('login');
  };

  const goToRegister = () => {
    navigation('register');
  };

  if (props.isFetchingCurrentUser) {
    return (
      <StyledOutletDiv>
        <Spin size="large" />
      </StyledOutletDiv>
    );
  }

  if (!(isEmpty(location.pathname) || location.pathname === '/')) {
    return (
      <StyledOutletDiv>
        <Outlet />
      </StyledOutletDiv>
    );
  }

  return (
    <StyledOutletDiv>
      <StyledContainer>
        <Button
          size="large"
          type="primary"
          onClick={goToLoginPage}
        >
          Login
        </Button>
        <Button
          size="large"
          type="primary"
          onClick={goToRegister}
        >
          Register
        </Button>
      </StyledContainer>
    </StyledOutletDiv>
  );
};

const mapStateToProps = (state: MainStoreStateType) => ({
  isFetchingCurrentUser: selectCurrentUserFetching(state),
});

const mapDispatchToProps = {
  fetchCurrentUser,
  clearAllContext,
  clearMasterPassword,
  clearPasswordStore,
  logoutUser,
  openChangePasswordDialog,
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type ConnectorProps = ConnectedProps<typeof connector>

export default connector(MainPageContainer);
