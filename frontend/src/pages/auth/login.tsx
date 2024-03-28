import { AxiosError } from 'axios';
import { FormEvent, useState } from 'react';
import { Form } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { formatArray } from '../../utils/stringUtils';
import { validateData } from '../../utils/validateData';
import { LoginData } from './LoginData';
import './auth.css';
import { ExceptionResponse } from '@clone-overflow/common';

const Login = () => {
  const { login } = useAuth();
  const [ data ] = useState(new LoginData()); 
  const [ showPassword, setShowPassword ] = useState(false);
  const [ errMsg, setErrMsg ] = useState<string[] | null>();
  const navigator = useNavigate();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const errors = await validateData(data) ?? [];
    
    if (errors.length > 0) {
      setErrMsg(errors);
      return;
    }

    const tokens = await login(data).catch((error: AxiosError<ExceptionResponse>) => {
      setErrMsg(formatArray(error.response?.data.error) ?? ['Server error']);
    });

    if (!tokens) return;
    setErrMsg(null);
    navigator('/');
  }

  const renderErrMsg = errMsg?.map(
    (msg, index) => 
    <Form.Text key={index} className='error-message'>{msg}</Form.Text>
  );

  return ( 
    <div className='auth'>
      <Form className='form' onSubmit={handleSubmit}>
        <Form.Group className='block'>
          <Form.Label>Email</Form.Label>
          <Form.Control type="text" placeholder="Enter email" onChange={async (e) => {
            data.email = e.target.value;
              setErrMsg(await validateData(data))
          }}/>
        </Form.Group>
        <Form.Group className='block'>
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type={showPassword ? "text" : "password"} 
            placeholder="Password" 
            onChange={async (e) => {
              data.password = e.target.value;
              setErrMsg(await validateData(data))
            }}
          />
          <Form.Check 
            type="checkbox" 
            label="Show password" 
            className='show-password'
            onChange={() => {
              setShowPassword(!showPassword);
            }}
          />
        </Form.Group>
        <Form.Group className='block'>
          {renderErrMsg}
        </Form.Group>
        <Form.Group className='block'>
          <Form.Text>
            <NavLink to='/auth/signup'>Doesn't have an account? Sign up</NavLink>
          </Form.Text>
        </Form.Group>
        <Form.Group className='block'>
          <button className='btn btn-primary'>Login</button>
        </Form.Group>
      </Form>
    </div>
  );
}
 
export default Login;