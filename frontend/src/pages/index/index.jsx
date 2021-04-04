import React from 'react';
import { Link } from 'react-router-dom';
import AuthStore from '../../stores/auth-store';

const IndexPage = () => {
  return (
    <>
      <h1>{AuthStore.accessToken}</h1>
      <Link to="/login">Login</Link>
      <Link to="/register">Register</Link>
    </>
  );
};

export default IndexPage;
