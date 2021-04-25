import React from 'react';
import { Link } from 'react-router-dom';

const UserTag = ({ username }) => <Link to={`/${username}`}>@{username}</Link>;

export default UserTag;
