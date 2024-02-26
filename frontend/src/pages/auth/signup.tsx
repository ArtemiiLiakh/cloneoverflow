import { AxiosError } from 'axios';
import { useState } from 'react';
import { Form } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { ServerException } from '../../api/types/ServerException';
import { SignupData } from './SignupData';
import { useAuth } from '../../hooks/useAuth';
import { validateData } from '../../utils/validateData';

const Signup = () => {
  const { singup } = useAuth();
  const [ data ] = useState(new SignupData());
  const [ showPassword, setShowPassword ] = useState(false);
  const [ errMsg , setErrMsg ] = useState<string[] | null>();

  const handleSubmit = async () => {
    setErrMsg(await validateData(data))

    const tokens = await singup({
      name: data.name,
      username: data.username,
      email: data.email,
      password: data.password,
    }).catch((err: AxiosError<ServerException>) => {
      setErrMsg([err.response?.data.error ?? 'Server error']);
    });

    if (!tokens) return;

    setErrMsg(null);
    console.log(tokens);
  }

  const renderErrMsg = errMsg?.map(
    (msg, index) => 
    <Form.Text key={index} className='error-message'>{msg}</Form.Text>
  );

  return ( 
    <div className='auth'>
      <Form className='form'>
        <Form.Group className='block'>
          <Form.Label>Name</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter name" 
            onChange={async (e) => {
              data.name = e.target.value;
              setErrMsg(await validateData(data))
            }}
          />
        </Form.Group>
        <Form.Group className='block'>
          <Form.Label>Username</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter unique username" 
            onChange={async (e) => {
              data.username = e.target.value;
              setErrMsg(await validateData(data))
            }}
          />
        </Form.Group>
        <Form.Group className='block'>
          <Form.Label>Email</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter email" 
            onChange={async (e) => {
              data.email = e.target.value;
              setErrMsg(await validateData(data))
            }}
          />
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
          <Form.Control 
            type={showPassword ? "text" : "password"} 
            placeholder="Repeat password" 
            style={{marginTop: '10px'}}
            onChange={async (e) => {
              data.repeatPassword = e.target.value;
              setErrMsg(await validateData(data))
            }}
          />
          <Form.Check 
            type="checkbox" 
            label="Show passwords"
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
            <NavLink to='/auth/login'>Already have an account? Login</NavLink>
          </Form.Text>
        </Form.Group>
        <Form.Group className='block'>
          <button type="button" className='btn btn-primary' onClick={handleSubmit}>Sign in</button>
        </Form.Group>
      </Form>
    </div>
  );
}
 
export default Signup;