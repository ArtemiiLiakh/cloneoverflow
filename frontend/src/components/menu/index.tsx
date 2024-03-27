import * as React from 'react';
import './menu.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { Navbar, Form, Container, Col } from 'react-bootstrap';
import { useAuth } from '../../hooks/useAuth';

export const Menu = () => {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  return (
    <Navbar className='navbar'>
      <Container>
        <Col sm>
          <NavLink to="/" className="logo"/>
        </Col>
        <Col sm={8}>
          <Form>
            <Form.Control type="text" placeholder="Search" className="searchBar" />
          </Form>
        </Col>
        <Col sm className='account-container'>
          {
            loading ? <></> 
            : <button className='user' onClick={() => {
                if (user) {
                  navigate(`/user/${user.id}`);
                } else {
                  navigate('/auth/login');
                }
              }}>
                <span>
                  { user ? `${user?.name} ● ${user?.reputation ?? 0}` : 'Login'}
                </span>
              </button>
          }
        </Col>
      </Container>
    </Navbar>
  );
}