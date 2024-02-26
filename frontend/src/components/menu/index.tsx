import * as React from 'react';
import './menu.css';
import { NavLink } from 'react-router-dom';
import { Navbar, Form, Container, Col } from 'react-bootstrap';
import { useAuth } from '../../hooks/useAuth';

export const Menu = () => {
  const { user, loading } = useAuth();

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
            : <button className='profile'>
                { user ? 
                  <>
                    <Navbar.Text>{user?.name}</Navbar.Text>
                    <Navbar.Text className='reputation'>● {user?.reputation ?? 0}</Navbar.Text>
                  </> 
                  : <Navbar.Text>Login</Navbar.Text>
                }
              </button>
          }
        </Col>
      </Container>
    </Navbar>
  );
}