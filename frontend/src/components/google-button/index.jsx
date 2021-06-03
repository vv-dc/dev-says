import React from 'react';
import styled from 'styled-components';
import { PopupWindow } from '../../helpers/popup-window';
import { BaseButton } from '../styled/base-button';
import { ReactComponent as GoogleLogo } from './google-logo.svg';

const GoogleButton = ({ buttonText, onSuccess, onFailure }) => {
  const { REACT_APP_GOOGLE_ID, REACT_APP_HOST } = process.env;
  const oauthGoogleUrl = 'https://accounts.google.com/o/oauth2/auth';

  const googleOauth2Params = {
    client_id: REACT_APP_GOOGLE_ID,
    redirect_uri: REACT_APP_HOST,
    scope: 'email',
    response_type: 'code',
    prompt: 'consent',
  };

  const handleClick = event => {
    event.preventDefault();
    const search = new URLSearchParams(googleOauth2Params).toString();
    PopupWindow('google-auth', `${oauthGoogleUrl}?${search}`)
      .then(response => onSuccess(response))
      .catch(error => onFailure(error));
  };

  return (
    <ButtonBody onClick={handleClick}>
      {buttonText}
      <GoogleLogo />
    </ButtonBody>
  );
};

export default GoogleButton;

const ButtonBody = styled(BaseButton)`
  background-color: var(--white);
  color: var(--gray-dark);
  line-height: 18px;
  svg {
    height: 18px;
    margin-left: 10px;
    vertical-align: bottom;
  }
`;
