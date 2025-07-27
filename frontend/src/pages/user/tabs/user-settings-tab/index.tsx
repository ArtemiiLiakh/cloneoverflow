import React, { FormEvent, useEffect } from 'react';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { AxiosError } from 'axios';
import { UserGetResponse, UserUpdateBody } from '@cloneoverflow/common/api/user';
import { ExceptionMessage } from '@cloneoverflow/common';
import { AuthService } from '@/api/services/auth.service';
import { UserService } from '@/api/services/user.service';
import ErrorList from '@/components/errorlist/ErrorList';
import MDEditorCustom from '@/components/MDEditorCustom';
import { formatArray } from '@/utils/stringUtils';

interface UserSettingsTabProps {
  user: UserGetResponse;
}

interface ChangePasswordData {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const UserSettingsTab = ({ user }: UserSettingsTabProps) => {
  const [oldUser, setOldUser] = useState<UserUpdateBody>(user);
  const [newUser, setNewUser] = useState<UserUpdateBody>({});
  const [changePasswordData, setChangePasswordData] = useState<ChangePasswordData>({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [errMsg, setErrMsg] = useState<string[]>();
  const [passwordErrors, setPasswordErrors] = useState<string[]>();
  const [isUpdatedPassword, setIsUpdatedPassword] = useState(false);

  useEffect(() => {
    setOldUser(user);
  }, [user]);

  useEffect(() => {
    setIsUpdatedPassword(false);
  }, [changePasswordData]);

  const onChangeSettings = async (event: FormEvent) => {
    event.preventDefault();
    UserService.update(user.id, newUser).catch((error: AxiosError<ExceptionMessage>) => {
      setErrMsg(formatArray(error.response?.data.error) ?? ['Server error']);
    }).then(() => {
      setErrMsg(undefined);
      window.location.reload();
    });
  };

  const onChangePassword = async (event: FormEvent) => {
    event.preventDefault();
    if (changePasswordData.newPassword !== changePasswordData.confirmPassword) {
      setPasswordErrors(['Passwords do not match']);
      return;
    }
    
    // const res = await AuthService.changePassword({
    //   oldPassword: changePasswordData.oldPassword,
    //   newPassword: changePasswordData.newPassword,
    // }).catch((error: AxiosError<ExceptionResponse>) => {
    //   setPasswordErrors(formatArray(error.response?.data.error) ?? ['Server error']);
    // });

    // if (res) {
    //   setPasswordErrors(undefined);
    //   setIsUpdatedPassword(true);
    // }
  };

  const onLeaveAccount = async () => {
    AuthService.signout().then(() => {
      setErrMsg(undefined);
      window.location.assign('/');
    });
  }

  return (
    <div className='user-settings'>
      <h2>Settings</h2>
      <Form onSubmit={onChangeSettings}>
        <Form.Group className='settings-block'>
          <Form.Label hrmlFor='settings-name'>Name</Form.Label>
          <Form.Control 
            id='settigns-name' 
            type="text" 
            placeholder="Name" 
            value={oldUser.name}
            onChange={(e) => {
              setOldUser({
                ...oldUser,
                name: e.target.value
              });
              setNewUser({
                ...newUser,
                name: e.target.value
              });
            }}
          />
        </Form.Group>
        <Form.Group className='settings-block'>
          <Form.Label hrmlFor='settings-username'>Username</Form.Label>
          <Form.Control 
              id='settigns-username' 
              type="text" 
              placeholder="Username" 
              value={oldUser.username}
              onChange={(e) => {
                setOldUser({
                  ...oldUser,
                  username: e.target.value
                });
                setNewUser({
                  ...newUser,
                  username: e.target.value
                });
              }}
            />
        </Form.Group>
        <Form.Group className='settings-block' data-color-mode="light">
          <Form.Label hrmlFor='settings-about'>About</Form.Label>
          <MDEditorCustom 
            id='settings-about' 
            value={oldUser.about} 
            onChange={(text?: string) => {
              setOldUser({
                ...oldUser,
                about: text ?? '',
              });
              setNewUser({
                ...newUser,
                about: text ?? ''
              });
            }}
          />
        </Form.Group>
        <Form.Group className='settings-block'>
          <ErrorList errors={errMsg}/>
        </Form.Group>
        <Form.Group className='settings-block'>
          <Button type='submit'>Save changes</Button>
        </Form.Group>
      </Form>

      <Form onSubmit={onChangePassword}>
        <h2>Change password</h2>
        <Form.Group className='settings-block'>
          <Form.Label hrmlFor='settings-old-password'>Old password</Form.Label>
          <Form.Control 
            id='settings-old-password' 
            type="password" 
            placeholder="Old password" 
            onChange={(e) => setChangePasswordData({
              ...changePasswordData,
              oldPassword: e.target.value
            })}
          />
        </Form.Group>
        <Form.Group className='settings-block'>
          <Form.Label hrmlFor='settings-new-password'>New password</Form.Label>
          <Form.Control 
            id='settings-new-password' 
            type="password" 
            placeholder="New password" 
            onChange={(e) => setChangePasswordData({
              ...changePasswordData,
              newPassword: e.target.value
            })}
          />
        </Form.Group>
        <Form.Group className='settings-block'>
          <Form.Label hrmlFor='settings-confirm-password'>Confirm password</Form.Label>
          <Form.Control 
            id='settings-confirm-password' 
            type="password" 
            placeholder="Confirm password" 
            onChange={(e) => setChangePasswordData({
              ...changePasswordData,
              confirmPassword: e.target.value
            })}
          />
        </Form.Group>
        <Form.Group className='settings-block'>
          {
            isUpdatedPassword && 
            <Form.Text className='success-message'>Password has been updated</Form.Text>
          }
          <ErrorList errors={passwordErrors}/>
        </Form.Group>
        <Form.Group className='settings-block'>
          <Button type='submit'>Save password</Button>
        </Form.Group>
      </Form>
      <Form.Group className='settings-block'>
        <Button type='button' variant='danger' onClick={onLeaveAccount}>Leave account</Button>
      </Form.Group>
    </div>
  );
}
 
export default UserSettingsTab;