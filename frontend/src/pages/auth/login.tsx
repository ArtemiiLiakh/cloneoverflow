import { AxiosError } from 'axios';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { ServerException } from '../../api/types/ServerException';
import { LoginData } from './LoginData';
import './auth.css';
import { useAuth } from '../../hooks/useAuth';
import { validateData } from '../../utils/validateData';

const Login = () => {
  const { login } = useAuth();
  const [ data ] = useState(new LoginData()); 
  const [ showPassword, setShowPassword ] = useState(false);
  const [ errMsg, setErrMsg ] = useState<string[] | null>();

  const handleSubmit = async () => {
    setErrMsg(await validateData(data))

    const tokens = await login(data).catch((error: AxiosError<ServerException>) => {
      setErrMsg([error.response?.data.error ?? 'Server error']);
    });

    if (!tokens) return;
    setErrMsg(null);
  }

  const renderErrMsg = errMsg?.map(
    (msg, index) => 
    <Form.Text key={index} className='error-message'>{msg}</Form.Text>
  );

  return ( 
    <div className='auth'>
      <Form className='form'>
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
            className='change-password'
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
            <NavLink to='/auth/signin'>Doesn't have an account? Sign in</NavLink>
          </Form.Text>
        </Form.Group>
        <Form.Group className='block'>
          <button type="button" className='btn btn-primary' onClick={handleSubmit}>Login</button>
        </Form.Group>
      </Form>
    </div>
  );
}
 
export default Login;