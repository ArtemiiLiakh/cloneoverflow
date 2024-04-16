import * as React from 'react';
import { Container } from 'react-bootstrap';
import HomeSidebar from './components/sidebar';
import { Outlet } from 'react-router-dom';

export const Home = () => {
  return (
    <Container className='home'>
      <HomeSidebar />
      <div className="content">
        <Outlet/>
      </div>
    </Container>
  );
}