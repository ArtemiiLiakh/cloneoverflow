import React, { useState } from 'react';
import { AnswerGetResponse } from '@cloneoverflow/common';
import MDEditor from '@uiw/react-md-editor';
import { Button } from 'react-bootstrap';
import MDEditorCustom from '../../../components/MDEditorCustom';
import { useAuth } from '../../../hooks/useAuth';
import { AnswerService } from '../../../api/services/answer.service';
import { GetPassedDate } from '../../../utils/dateUtils';

interface AnswerItemProps {
  answer: AnswerGetResponse;
}

const AnswerItem = ({ answer }: AnswerItemProps) => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [answerText, setAnswerText] = useState(answer.text);

  const onRead = () => {
    return (
      <>
        <MDEditor.Markdown className='answer-text' source={answer.text}/>
        <div className="answer-pannel">
          {
            answer.owner.id === user?.id ? 
              <div className="actions">
                <Button className='action-btn' onClick={() => {
                  setIsEditing(true);
                }}>Edit</Button>
                <Button className='action-btn' onClick={() => {
                  AnswerService.delete(answer.id).then(() => {
                    window.location.reload();
                  });
                }}>Delete</Button>
              </div>
             : <></>
          }
          <div className="author">
            <p className='answerDate'>answered {GetPassedDate(answer?.createdAt)}</p>
            <p>{answer?.owner.name}</p>
            <p><a href={`/users/${answer?.owner.id}`}>@{answer?.owner.username}</a> ● {answer?.owner.reputation}</p>
          </div>
        </div>
      </>
    );
  };

  const onEdit = () => {
    return <>
      <MDEditorCustom value={answerText} onChange={(e) => {
        setAnswerText(e ?? '');
      }}/>
      <div className="answer-pannel">
        <div className="actions">
          <Button className='action-btn' onClick={() => {
            AnswerService.update(answer.id, { text: answerText }).then((res) => {
              window.location.reload();
            });
          }}>Save</Button>
          <Button className='action-btn' onClick={() => {
            setAnswerText(answer.text);
            setIsEditing(false);
          }}>Cancel</Button>
        </div>
      </div>
    </>
  }

  return ( 
    <div className="answer-item">
      <div className="sidepanel">
        <button className='vote-btn'><i className="fa-solid fa-arrow-up"></i></button>
        <p className='rating'>{answer.rate}</p>
        <button className='vote-btn'><i className="fa-solid fa-arrow-down"></i></button>
      </div>
      <div className="answer-content" data-color-mode="light">
        { isEditing ? onEdit() : onRead() }
      </div>
    </div>
  );
}
 
export default AnswerItem;