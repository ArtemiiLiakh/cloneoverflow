import * as React from 'react';
import { NavLink } from 'react-router-dom';
import './username.css';

interface UsernameProps {
  userId: string;
  username: string;
}

const Username = ({ userId, username }: UsernameProps) => {
  return <NavLink to={`/user/${userId}`} className='username'>@{username}</NavLink>;
}
 
export default Username;