import { ExceptionResponse } from '@cloneoverflow/common';
import { AxiosError } from 'axios';
import { FormEvent, useState } from 'react';
import { Form } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { formatArray } from '../../utils/stringUtils';
import { validateData } from '../../utils/validateData';
import { SignupData } from './SignupData';
import MDEditorCustom from '../../components/MDEditorCustom';
import ErrorList from '../../components/errorlist/ErrorList';

const Signup = () => {
  const { singup } = useAuth();
  const [ data ] = useState(new SignupData());
  const [about, setAbout] = useState<string>();
  const [ showPassword, setShowPassword ] = useState(false);
  const [ errMsg , setErrMsg ] = useState<string[] | null>();
  const navigator = useNavigate();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    const errors = await validateData(data) ?? [];
    
    if (errors.length > 0) {
      setErrMsg(errors);
      return;
    }

    const tokens = await singup({
      name: data.name,
      username: data.username,
      email: data.email,
      password: data.password,
      about,
    }).catch((err: AxiosError<ExceptionResponse>) => {
      setErrMsg(formatArray(err.response?.data.error) ?? ['Server error']);
    });

    if (!tokens) return;

    setErrMsg(null);
    navigator('/');
  }

  return ( 
    <div className='auth'>
      <Form className='form' onSubmit={handleSubmit}>
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
          <ErrorList errors={errMsg}/>
        </Form.Group>
        <Form.Group className='block' data-color-mode="light">
          <Form.Label>About</Form.Label>
          <MDEditorCustom 
            value={about}
            onChange={(value) => {
              setAbout(value)
            }}
          />
        </Form.Group>

        <Form.Group className='block'>
          <Form.Text>
            <NavLink to='/auth/login'>Already have an account? Login</NavLink>
          </Form.Text>
        </Form.Group>
        <Form.Group className='block'>
          <button className='btn btn-primary'>Sign up</button>
        </Form.Group>
      </Form>
    </div>
  );
}
 
export default Signup;