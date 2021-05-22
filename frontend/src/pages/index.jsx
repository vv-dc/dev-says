import React from 'react';
import { Link } from 'react-router-dom';
import { AuthService } from '../services/auth.service';

const IndexPage = () => (
  <>
    <h1>{AuthService.isAuthenticated() && AuthService.getAccessToken()}</h1>
    <Link to="/login">Login</Link>
    <Link to="/register">Register</Link>
    <button onClick={async () => await AuthService.logout()}>Logout</button>
  </>
);

export default IndexPage;
