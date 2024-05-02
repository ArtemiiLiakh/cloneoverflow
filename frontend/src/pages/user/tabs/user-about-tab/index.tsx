import React, { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import Taglist from '../../../../components/taglist/taglist';
import { UserService } from '../../../../api/services/user.service';
import { GetPassedDate, ShortText } from '../../../../utils/stringUtils';
import MDEditor from '@uiw/react-md-editor';
import { UserGetProfileResponse } from '@cloneoverflow/common';

interface UserAboutTabProps {
  userId?: string;
}

const UserAboutTab = ({ userId }: UserAboutTabProps) => {
  const [user, setUser] = useState<UserGetProfileResponse>()
  const bestQuestionTitle = user?.bestQuestion?.title ?? '';
  const bestAnswerText = user?.bestAnswer?.text ?? '';
  const bestAnswerQuestionTitle = user?.bestAnswer?.question.title ?? '';

  useEffect(() => {
    if (userId) {
      UserService.getProfile(userId).then((data) => setUser(data));
    }
  }, []);

  return (
    <div className="user-about">
      <div className='stats'>
        <p className='block-header'>Stats</p>
        <div className="stats-info">
          <p>Reputation: {user?.reputation}</p>
          <p>Answers: {user?.answersAmount}</p>
          <p>Questions: {user?.questionsAmount}</p>
        </div>
      </div>
      <div className='about'>
        <div className="about-block" data-color-mode="light">
          <p className='block-header'>About</p>
          <MDEditor.Markdown source={user?.about ?? ''} />
        </div>
        <div className="about-block best-stats">
          <div className="about-block-item best-question">
            <div className="about-block-header">
              <p className='block-header'>Best Question</p>
              <p className='created-date'>{GetPassedDate(user?.bestQuestion?.createdAt)}</p>
            </div>
            <p>{ShortText(bestQuestionTitle, 100)}</p>
            <p>Rate: {user?.bestQuestion?.rate}</p>
            <p>Answers: {user?.bestQuestion?.answersAmount}</p>
            <Taglist tags={user?.bestQuestion?.tags}/>
            <button className='btn btn-primary'>Go to the question</button>
          </div>
          <div className="about-block-item best-answer">
            <div className="about-block-header">
              <p className='block-header'>Best Answer</p>
              <p className='created-date'>{GetPassedDate(user?.bestAnswer?.createdAt)}</p>
            </div>
            <p>Text: {ShortText(bestAnswerText, 100)}</p>
            <p>Rate: {user?.bestAnswer?.rate}</p>
            <button className='btn btn-primary'>{ShortText(bestAnswerQuestionTitle, 100)}</button>
          </div>
        </div>
      </div>
    </div>
  );
}
 
export default UserAboutTab;