import React from 'react';
import styled from 'styled-components';
import PopupWindow from '../helpers/popup-window';
import { toQuery } from '../helpers/url-utils';
import { BaseButton } from './styled/base-button';

const GoogleButton = ({ buttonText, onSuccess, onFailure }) => {
  const googleOauth2Url = 'https://accounts.google.com/o/oauth2/auth';
  const googleOauth2Params = {
    client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
    redirect_uri: process.env.REACT_APP_HOST,
    scope: 'email',
    response_type: 'code',
    prompt: 'consent',
  };

  const handleClick = event => {
    event.preventDefault();
    const search = toQuery(googleOauth2Params);
    new PopupWindow('google-auth', `${googleOauth2Url}?${search}`)
      .then(response => onSuccess(response))
      .catch(error => onFailure(error));
  };

  return (
    <ButtonBody onClick={handleClick}>
      {buttonText}
      <svg viewBox="0 0 24 24">
        <g>
          <path
            fill="#E94435"
            d="M12.1,5.8c1.6-0.1,3.1,0.5,4.3,1.6l2.6-2.7c-1.9-1.8-4.4-2.7-6.9-2.7c-3.8,0-7.2,2-9,5.3l3,2.4C7.1,7.2,9.5,5.7,12.1,5.8z"
          ></path>
          <path
            fill="#F8BB15"
            d="M5.8,12c0-0.8,0.1-1.6,0.4-2.3l-3-2.4C2.4,8.7,2,10.4,2,12c0,1.6,0.4,3.3,1.1,4.7l3.1-2.4C5.9,13.6,5.8,12.8,5.8,12z"
          ></path>
          <path
            fill="#34A751"
            d="M15.8,17.3c-1.2,0.6-2.5,1-3.8,0.9c-2.6,0-4.9-1.5-5.8-3.9l-3.1,2.4C4.9,20,8.3,22.1,12,22c2.5,0.1,4.9-0.8,6.8-2.3L15.8,17.3z"
          ></path>
          <path
            fill="#547DBE"
            d="M22,12c0-0.7-0.1-1.3-0.2-2H12v4h6.1v0.2c-0.3,1.3-1.1,2.4-2.2,3.1l3,2.4C21,17.7,22.1,14.9,22,12z"
          ></path>
        </g>
      </svg>
    </ButtonBody>
  );
};

export default GoogleButton;

const ButtonBody = styled(BaseButton)`
  background-color: var(--white);
  color: var(--dark-gray);
  line-height: 18px;
  svg {
    height: 18px;
    margin-left: 10px;
    vertical-align: bottom;
  }
`;
