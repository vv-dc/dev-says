import React, { useEffect, useRef, useState } from 'react';
import { useHistory } from 'react-router';
import styled from 'styled-components';

import { AuthService } from '../../services/auth.service';

const Dots = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const history = useHistory();
  const menu = useRef();

  const handleClickOutside = event => {
    if (!menu.current.contains(event.target)) {
      setIsExpanded(false);
    }
  };
  const handleClick = () => {
    if (!AuthService.isAuthenticated()) history.push('./login');
    else setIsExpanded(true);
  };

  useEffect(() => {
    if (isExpanded) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isExpanded]);

  return (
    <DotsWrapper>
      {isExpanded && <DotsMenuWrapper ref={menu}>{children}</DotsMenuWrapper>}
      <DotsList onClick={handleClick}>
        <Dot />
        <Dot />
        <Dot />
      </DotsList>
    </DotsWrapper>
  );
};

export default Dots;

const Dot = styled.div`
  height: 3px;
  width: 3px;
  border-radius: 50%;
  background-color: var(--green);
  &:not(:last-of-type) {
    margin-right: 3px;
  }
`;

const DotsWrapper = styled.div`
  position: relative;
  margin-left: auto;
`;

const DotsMenuWrapper = styled.div`
  position: absolute;
  right: 0;
  width: 200px;
  box-shadow: 0px 0px 6px var(--dropdown-shadow);
  border-radius: 4px;
  background-color: var(--bg-post);
`;

const DotsList = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 35px;
  width: 35px;
  border-radius: 50%;
  margin-left: 15px;
  cursor: pointer;
  &:hover {
    background-color: var(--bg-dot-list);
  }
`;
