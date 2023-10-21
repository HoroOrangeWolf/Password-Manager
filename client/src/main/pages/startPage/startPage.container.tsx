import {
  Outlet, useLocation, useNavigate,
} from 'react-router-dom';
import styled from 'styled-components';
import { Button } from 'antd';
import React from 'react';
import { isEmpty } from 'lodash';

const StyledContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  min-width: 300px;
`;
const StyledOutletDiv = styled.div`
  width: 100%;
  height: 90vh;
  justify-content: center;
  align-items: center;
  display: flex;
`;
const StartPageContainer = () => {
  const navigation = useNavigate();
  const location = useLocation();

  const goToLoginPage = () => {
    navigation('login');
  };

  const goToRegister = () => {
    navigation('register');
  };

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

export default StartPageContainer;
