import React from 'react';
import styled from 'styled-components';
import { PopupWindow } from '../../helpers/popup-window';
import { BaseButton } from '../styled/base-button';
import { ReactComponent as GithubLogo } from './github-logo.svg';

const GitHubButton = ({ buttonText, onSuccess, onFailure }) => {
  const { REACT_APP_GITHUB_ID } = process.env;
  const oauthGitHubUrl = 'https://github.com/login/oauth/authorize';

  const githubOauth2Params = {
    client_id: REACT_APP_GITHUB_ID,
    scope: 'user:email',
  };

  const handleClick = event => {
    event.preventDefault();
    const search = new URLSearchParams(githubOauth2Params).toString();
    PopupWindow('github-auth', `${oauthGitHubUrl}?${search}`)
      .then(response => onSuccess(response))
      .catch(error => onFailure(error));
  };

  return (
    <ButtonBody onClick={handleClick}>
      {buttonText}
      <GithubLogo />
    </ButtonBody>
  );
};

export default GitHubButton;

const ButtonBody = styled(BaseButton)`
  background-color: #161b22;
  border: 1px solid #3f3f46;
  color: #c9d1d9;
  svg {
    height: 18px;
    margin-left: 10px;
    vertical-align: bottom;
  }
`;
