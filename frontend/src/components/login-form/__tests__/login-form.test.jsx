import React from 'react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { fireEvent, render, waitFor } from '@testing-library/react';

import LoginForm from '../';
import { AuthService } from '../../../services/auth.service';
import { PopupWindow } from '../../../helpers/popup-window';

jest.mock('../../../helpers/popup-window');

describe('<LoginForm />', () => {
  const mockedAuth = {
    login: 'login',
    password: 'password',
  };

  const mockSuccess = 'Success';
  const mockFailure = new Error('Failure');

  const mockGoogle = {
    provider: 'google',
    code: 'googlecode',
  };

  const mockGithub = {
    provider: 'github',
    code: 'githubcode',
  };

  const renderForm = () => {
    const history = createMemoryHistory();
    return render(
      <Router history={history}>
        <LoginForm />
      </Router>
    );
  };

  it('redirects to the "/" on successfull local login', () => {
    const history = createMemoryHistory();
    const { getByLabelText, getByText } = renderForm();

    const { login, password } = mockedAuth;
    const mockedLocalLogin = jest
      .spyOn(AuthService, 'loginLocal')
      .mockResolvedValue(mockSuccess);

    const loginInput = getByLabelText('Username or email address');
    const passwordInput = getByLabelText('PasswordForgot password?');
    const submitButton = getByText('Sign in');

    fireEvent.input(loginInput, { target: { value: login } });
    fireEvent.input(passwordInput, { target: { value: password } });
    fireEvent.click(submitButton);

    expect(mockedLocalLogin).toBeCalledWith(login, password);
    expect(history.location.pathname).toBe('/');
  });

  it('displays an error on invalid local login', async () => {
    const { getByText, getByLabelText, findByRole } = renderForm();

    const { login, password } = mockedAuth;
    const mockLocalLogin = jest
      .spyOn(AuthService, 'loginLocal')
      .mockRejectedValue(mockFailure);

    const loginInput = getByLabelText('Username or email address');
    const passwordInput = getByLabelText('PasswordForgot password?');
    const submitButton = getByText('Sign in');

    fireEvent.input(loginInput, { target: { value: login } });
    fireEvent.input(passwordInput, { target: { value: password } });
    fireEvent.click(submitButton);

    expect(mockLocalLogin).toBeCalledWith(login, password);
    expect(await findByRole('alert')).toBeInTheDocument();
  });

  it('redirect to the "/" on successfull Google login', async () => {
    const history = createMemoryHistory();
    const { getByText } = renderForm();

    const { provider, code } = mockGoogle;
    const mockPopupWindow = PopupWindow.mockResolvedValue({ code });
    const mockLoginExternal = jest
      .spyOn(AuthService, 'loginExternal')
      .mockResolvedValue(mockSuccess);

    await waitFor(() => fireEvent.click(getByText('Sign in with Google')));

    expect(mockPopupWindow).toBeCalled();
    expect(mockLoginExternal).toBeCalledWith(provider, code);
    expect(history.location.pathname).toBe('/');
  });

  it('redirect to the "/" on successfull GitHub login', async () => {
    const history = createMemoryHistory();
    const { getByText } = renderForm();

    const { provider, code } = mockGithub;
    const mockPopupWindow = PopupWindow.mockResolvedValue({ code });
    const mockLoginExternal = jest
      .spyOn(AuthService, 'loginExternal')
      .mockResolvedValue(mockSuccess);

    await waitFor(() => fireEvent.click(getByText('Sign in with GitHub')));

    expect(mockPopupWindow).toBeCalled();
    expect(mockLoginExternal).toBeCalledWith(provider, code);
    expect(history.location.pathname).toBe('/');
  });

  it('displays an error on unfilled popup', async () => {
    const { getByText, findByRole } = renderForm();

    const mockPopupWindow = PopupWindow.mockRejectedValue();
    const mockLoginExternal = jest.spyOn(AuthService, 'loginExternal');

    fireEvent.click(getByText('Sign in with GitHub'));
    fireEvent.click(getByText('Sign in with Google'));

    expect(mockPopupWindow).toBeCalledTimes(2);
    expect(mockLoginExternal).not.toBeCalled();
    expect(await findByRole('alert')).toBeInTheDocument();
  });

  it('displays an error on invalid external credentials', async () => {
    const { getByText, findByRole } = renderForm();

    const { provider, code } = mockGoogle;
    const mockPopupWindow = PopupWindow.mockResolvedValue({ code });
    const mockLoginExternal = jest
      .spyOn(AuthService, 'loginExternal')
      .mockRejectedValue(mockFailure);

    await waitFor(() => fireEvent.click(getByText('Sign in with Google')));

    expect(mockPopupWindow).toBeCalled();
    expect(mockLoginExternal).toBeCalledWith(provider, code);
    expect(await findByRole('alert')).toBeInTheDocument();
  });

  it('closes the error block on click', async () => {
    const { getByText, findByRole } = renderForm();
    PopupWindow.mockRejectedValue();

    fireEvent.click(getByText('Sign in with Google'));
    const errorBlock = await findByRole('alert');

    expect(errorBlock).toBeInTheDocument();
    fireEvent.click(errorBlock);
    expect(errorBlock).not.toBeInTheDocument();
  });
});
