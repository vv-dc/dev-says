import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

const Dots = ({ children }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const menu = useRef();

  const handleClickOutside = event => {
    if (!menu.current.contains(event.target)) {
      setIsExpanded(false);
    }
  };

  const handleClick = () => {
    if (children) setIsExpanded(true);
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
      <DotsBody>
        {!isExpanded && <DotsBackground onClick={handleClick} />}
        <DotsList>
          <Dot />
          <Dot />
          <Dot />
        </DotsList>
      </DotsBody>
    </DotsWrapper>
  );
};

export default Dots;

const DotsList = styled.div`
  display: flex;
`;

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
  padding-top: 5px;
  padding-left: 20px;
  position: relative;
  margin-left: auto;
`;

const DotsBody = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DotsBackground = styled.div`
  position: absolute;
  height: 35px;
  width: 35px;
  border-radius: 50%;
  cursor: pointer;
  &:hover {
    background-color: var(--bg-dots);
  }
`;

const DotsMenuWrapper = styled.div`
  position: absolute;
  right: 0;
  min-width: 200px;
  box-shadow: 0px 0px 6px var(--border-dark);
  background-color: var(--bg-post);
`;
