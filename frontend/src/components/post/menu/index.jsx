import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';

import { AuthError } from '../../../helpers/auth-error';
import { PostService } from '../../../services/posts.service';
import { ReactComponent as Comment } from './icons/comment.svg';
import { ReactComponent as Share } from './icons/share.svg';

const PostMenu = ({ postId, totalScore }) => {
  const [score, setScore] = useState(0);
  const [total, setTotal] = useState(totalScore);
  const [isLoading, setIsLoading] = useState(true);
  const history = useHistory();

  const fetchScores = async () => {
    const { score } = await PostService.getUserScore(postId);
    setScore(score);
    setTotal(total => total - score);
  };

  const handleClick = async newScore => {
    const actualScore = newScore !== score ? newScore : 0;
    try {
      await PostService.updateUserScore(postId, actualScore);
      setScore(actualScore);
    } catch (error) {
      if (error instanceof AuthError) history.push('/login');
      // else 500 page
    }
  };

  useEffect(() => fetchScores().then(() => setIsLoading(false)), []);

  return isLoading ? (
    <h1>Loading...</h1>
  ) : (
    <MenuWrapper>
      <UpTriangle onClick={() => handleClick(1)} active={score === 1} />
      <Score>{total + score}</Score>
      <DownTriangle onClick={() => handleClick(-1)} active={score === -1} />
      <Comment />
      <Share />
    </MenuWrapper>
  );
};

export default PostMenu;

const MenuWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 10px 15px 10px;
  background-color: var(--bg-post);
  box-shadow: 0px 0px 4px #000;
  svg {
    margin-top: 15px;
    cursor: pointer;
  }
`;

const Score = styled.div`
  margin: 10px 0;
  font-size: 16px;
  font-weight: 900;
  color: var(--gray);
`;

const BaseTriangle = styled.div`
  width: 0;
  height: 0;
  border-right: 16px solid transparent;
  border-left: 16px solid transparent;
  cursor: pointer;
`;

const UpTriangle = styled(BaseTriangle)`
  border-bottom: 16px solid var(--${p => (p.active ? 'green' : 'gray')});
`;

const DownTriangle = styled(BaseTriangle)`
  border-top: 16px solid var(--${p => (p.active ? 'green' : 'gray')});
`;
