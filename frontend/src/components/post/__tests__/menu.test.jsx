import axios from 'axios';
import React from 'react';
import { Router } from 'react-router-dom';
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from '@testing-library/react';
import { createMemoryHistory } from 'history';

import PostMenu from '../menu';
import { PostService } from '../../../services/posts.service';
import { AuthService } from '../../../services/auth.service';
import { AuthError } from '../../../helpers/auth-error';

describe('<PostMenu />', () => {
  const mockPostId = 54321;
  const mockUserId = 12345;

  const mockTotalScore = 100;
  const mockActualScore = -1;
  const mockUpdatedScore = 1;
  const expectedScore = mockTotalScore - mockActualScore + mockUpdatedScore;

  beforeEach(() => {
    jest
      .spyOn(PostService, 'getTotalScore')
      .mockResolvedValue({ totalScore: mockTotalScore });
    jest
      .spyOn(PostService, 'getUserScore')
      .mockResolvedValue({ score: mockActualScore });
  });

  it('display total post score correctly', async () => {
    await act(async () => render(<PostMenu postId={mockPostId} />));
    expect(PostService.getTotalScore).toBeCalledWith(mockPostId);
    expect(PostService.getUserScore).toBeCalledWith(mockPostId);
    expect(screen.getByText(mockTotalScore)).toBeInTheDocument();
  });

  it('changes score when on click when user is authenticated', async () => {
    await act(async () => render(<PostMenu postId={mockPostId} />));

    const mockPut = axios.put.mockResolvedValue();
    const mockGetUserId = jest
      .spyOn(AuthService, 'getUserId')
      .mockReturnValue(mockUserId);

    await waitFor(() => fireEvent.click(screen.getByLabelText('Up vote')));

    expect(mockGetUserId).toBeCalled();
    expect(mockPut).toBeCalledWith(
      `/posts/${mockPostId}/scores/${mockUserId}`,
      { score: mockUpdatedScore }
    );
    expect(screen.getByText(expectedScore)).toBeInTheDocument();
  });

  it('redirects to the /login on click when user is not authenticated', async () => {
    const history = createMemoryHistory();
    await act(async () =>
      render(
        <Router history={history}>
          <PostMenu postId={mockPostId} />
        </Router>
      )
    );

    const mockGetUserId = jest
      .spyOn(AuthService, 'getUserId')
      .mockImplementation(() => {
        throw new AuthError();
      });
    await waitFor(() => fireEvent.click(screen.getByLabelText('Down vote')));

    expect(mockGetUserId).toBeCalled();
    expect(axios.put).not.toBeCalled();
    expect(history.location.pathname).toBe('/login');
  });
});
