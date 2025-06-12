import * as React from 'react';

import ErrorList from '@/components/errorlist/ErrorList';
import { useAuth } from '@/hooks/useAuth';
import { formatArray } from '@/utils/stringUtils';
import { ExceptionMessage } from '@cloneoverflow/common';
import { AxiosError } from 'axios';
import { FormEvent, useState } from 'react';
import { Form } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { LoginData, LoginDataType } from './LoginData';

const Login = () => {
  const { login } = useAuth();
  const [ data, setData ] = useState<LoginDataType>({
    email: '',
    password: '',
  }); 
  const [ showPassword, setShowPassword ] = useState(false);
  const [ errMsg, setErrMsg ] = useState<string[] | null>();
  const navigator = useNavigate();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const result = LoginData.safeParse(data);
    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;

      setErrMsg([
        fieldErrors.email?.at(0) ?? '', 
        fieldErrors.password?.at(0) ?? '',
      ])
      return;
    }

    const tokens = await login(data).catch((error: AxiosError<ExceptionMessage>) => {
      setErrMsg(formatArray(error.response?.data.message) ?? ['Server error']);
    });

    if (!tokens) return;
    setErrMsg(null);
    navigator('/');
  }

  return ( 
    <div className='auth'>
      <Form className='form' onSubmit={handleSubmit}>
        <Form.Group className='block'>
          <Form.Label>Email</Form.Label>
          <Form.Control type="text" placeholder="Enter email" onChange={async (e) => {
            setData({
              email: e.target.value,
              password: data?.password ?? '',
            })
          }}/>
        </Form.Group>
        <Form.Group className='block'>
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type={showPassword ? "text" : "password"} 
            placeholder="Password" 
            onChange={async (e) => {
              setData({
                email: data?.email ?? '',
                password: e.target.value,
              })
            }}
          />
          <Form.Check 
            type="checkbox" 
            id='show-password'
            className='show-password'
            style={{
              display: 'inline-block',
              marginRight: '10px',
            }}
            onChange={() => {
              setShowPassword(!showPassword);
            }}
          />
          <Form.Label htmlFor='show-password' className='show-password-label' style={{
            display: 'inline-block',
          }}>
            Show password
          </Form.Label>
        </Form.Group>
        <Form.Group className='block'>
          <ErrorList errors={errMsg}/>
        </Form.Group>
        <Form.Group className='block'>
          <Form.Text>
            <NavLink to='/auth/signup'>Doesn't have an account? Sign up</NavLink>
          </Form.Text>
        </Form.Group>
        <Form.Group className='block'>
          <button className='btn btn-primary' type='submit'>Login</button>
        </Form.Group>
      </Form>
    </div>
  );
}
 
export default Login;