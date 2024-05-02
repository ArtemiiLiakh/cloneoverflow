import React, { useEffect, useState } from 'react';
import { NavLink, createSearchParams, useNavigate, useSearchParams } from 'react-router-dom';
import { Navbar, Form, Container, Col } from 'react-bootstrap';
import { useAuth } from '../../hooks/useAuth';

export const Menu = () => {
  const [search, setSearch] = useState('');
  const { user, authLoading } = useAuth();
  const navigate = useNavigate();
  const [searchParams, setSearchParam] = useSearchParams();
  
  useEffect(() => {
    const q = searchParams.get('q');
    if (q) {
      setSearch(q.replace('?q=', ''));
    }
  }, [searchParams])

  return (
    <Navbar className='navbar'>
      <Container>
        <Col sm>
          <NavLink to="/" className="logo"/>
        </Col>
        <Col sm={8}>
          <Form onSubmit={(e) => {
            e.preventDefault();
            setSearchParam('?q=' + search);
            navigate({
              pathname: '/questions',
              search: search ? createSearchParams({
                'q': search,
              }).toString() : undefined,
            });
          }}>
            <Form.Control type="text" placeholder="Search" className="searchBar" value={search} onChange={(e) => setSearch(e.target.value)}/>
          </Form>
        </Col>
        <Col sm className='account-container'>
          {
            authLoading ? <></> 
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