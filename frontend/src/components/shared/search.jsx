import React, { useState } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';
import { BaseButton } from '../styled/base-button';

const Search = () => {
  const [query, setQuery] = useState('');
  const history = useHistory();

  const handleSearch = () => {
    history.push(`/${query}`);
  };

  return (
    <SearchWrapper>
      <SearchBar
        value={query}
        onChange={e => setQuery(e.target.value.trim())}
        maxLength="64"
        placeholder="Search..."
      />
      <SearchButton onClick={handleSearch}>Search</SearchButton>
    </SearchWrapper>
  );
};

export default Search;

const SearchWrapper = styled.form``;

const SearchBar = styled.input`
  padding: 5px 12px;
  margin-right: 7px;
  &:focus {
    outline: 2px solid var(--green);
  }
`;

const SearchButton = styled(BaseButton)`
  background-color: var(--green);
  color: var(--black);
  &:hover {
    opacity: 0.7;
  }
`;
