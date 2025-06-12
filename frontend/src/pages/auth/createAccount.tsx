import * as React from 'react';

import ErrorList from '@/components/errorlist/ErrorList';
import MDEditorCustom from '@/components/MDEditorCustom';
import { useAuth } from '@/hooks/useAuth';
import { formatArray } from '@/utils/stringUtils';
import { ExceptionMessage } from '@cloneoverflow/common';
import { AxiosError } from 'axios';
import { FormEvent, useState } from 'react';
import { Form } from 'react-bootstrap';
import { NavLink, useNavigate } from 'react-router-dom';
import { SignupData, SignupDataType } from './SignupData';

const Signup = () => {
  const { createAccount: singup } = useAuth();
  const [ data, setData ] = useState<SignupDataType>({
    email: '',
    name: '',
    password: '',
    repeatPassword: '',
    username: '',
    about: '',
  });
  const [ showPassword, setShowPassword ] = useState(false);
  const [ errMsg , setErrMsg ] = useState<string[] | null>();
  const navigator = useNavigate();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    
    const result = SignupData.safeParse(data);
    if (!result.success) {
      
      setErrMsg([
        result.error.flatten().fieldErrors.name?.at(0) ?? '', 
        result.error.flatten().fieldErrors.username?.at(0) ?? '', 
        result.error.flatten().fieldErrors.email?.at(0) ?? '', 
        result.error.flatten().fieldErrors.password?.at(0) ?? '',
        result.error.flatten().fieldErrors.repeatPassword?.at(0) ?? '',
        data.password !== data.repeatPassword ? 'Passwords do not match' : ''
      ]);
      return;
    }

    const tokens = await singup({
      name: data.name,
      username: data.username,
      email: data.email,
      password: data.password,
      about: data.about,
    }).catch((err: AxiosError<ExceptionMessage>) => {
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
              setData({
                ...data,
                name: e.target.value,
              });
            }}
          />
        </Form.Group>
        <Form.Group className='block'>
          <Form.Label>Username</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter unique username" 
            onChange={async (e) => {
              setData({
                ...data,
                username: e.target.value,
              });
            }}
          />
        </Form.Group>
        <Form.Group className='block'>
          <Form.Label>Email</Form.Label>
          <Form.Control 
            type="text" 
            placeholder="Enter email" 
            onChange={async (e) => {
              setData({
                ...data,
                email: e.target.value,
              });
            }}
          />
        </Form.Group>
        <Form.Group className='block'>
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type={showPassword ? "text" : "password"} 
            placeholder="Password" 
            onChange={async (e) => {
              setData({
                ...data,
                password: e.target.value,
              });
            }}
          />
          <Form.Control 
            type={showPassword ? "text" : "password"} 
            placeholder="Repeat password" 
            style={{marginTop: '10px'}}
            onChange={async (e) => {
              setData({
                ...data,
                repeatPassword: e.target.value,
              });
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
            value={data.about}
            onChange={(value) => {
              setData({
                ...data,
                about: value,
              });
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