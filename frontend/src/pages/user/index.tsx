import { UserGetResponse, UserStatus } from '@clone-overflow/common';
import { useEffect, useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import { UserService } from '../../api/services/user.service';
import Username from '../../components/username/username';
import { useAuth } from '../../hooks/useAuth';
import { GetPassedDate } from '../../utils/stringUtils';
import './profile.css';
import UserAboutTab from './tabs/user-about-tab';
import UserAnswersTab from './tabs/user-answers-tab';
import UserQuestionsTab from './tabs/user-questions-tab';
import UserSettingsTab from './tabs/user-settings-tab';


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
    status: UserStatus.USER,
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