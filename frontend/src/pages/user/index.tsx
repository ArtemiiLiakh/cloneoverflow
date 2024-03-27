import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './profile.css';
import Username from '../../components/username/username';
import { Tab, Tabs } from 'react-bootstrap';
import { UserGetResponse } from '../../api/response/user.get.response';
import { UserService } from '../../api/services/user.service';
import { UserStatus } from '../../api/types/UserStatus';
import { GetPassedDate } from '../../utils/stringUtils';
import UserAboutTab from './tabs/user-about-tab';
import UserQuestionsTab from './tabs/user-questions-tab';
import UserAnswersTab from './tabs/user-answers-tab';
import UserSettingsTab from './tabs/user-settings-tab';
import { useAuth } from '../../hooks/useAuth';


const UserProfile = () => {
  const { userId } = useParams();
  const { user } = useAuth();
  const [userProfile, setUserProfile] = useState<UserGetResponse>({
    id: '',
    name: '',
    email: '',
    username: '',
    reputation: 0,
    about: '',
    status: UserStatus.ACTIVE,
    createdAt: new Date(),
  });

  useEffect(() => {
    if (!userId) return;
    UserService.get(userId).then((user) => setUserProfile(user));
  }, [])

  return (
    <div className="profile">
      <div className="user-info">
        <div className="info-block">
          <h4 className='name'>{userProfile.name}</h4>
          <Username userId={userId ?? ''} username={userProfile.username} />
          <p className='created-date'>{GetPassedDate(userProfile.createdAt)}</p>
        </div>
      </div>
      <hr />
      <div className="profile-tabs">
        <Tabs className="profile-menu" defaultActiveKey="profile">
          <Tab id='profile' eventKey='profile' title="Profile">
            <UserAboutTab userId={userId}/>
          </Tab>
          <Tab eventKey='questions' title="Questions">
            <UserQuestionsTab userId={userId}/>
          </Tab>
          <Tab eventKey='answers' title="Answers">
            <UserAnswersTab userId={userId}/>
          </Tab>
          {
            userId === user?.id && 
            (
              <Tab eventKey='settings' title="Settings">
                <UserSettingsTab user={userProfile}/>
              </Tab>
            )
          }
        </Tabs>
      </div>
    </div>
  );
}
 
export default UserProfile;