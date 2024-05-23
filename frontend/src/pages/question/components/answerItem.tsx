import React, { useState } from 'react';
import { AnswerGetResponse, QuestionGetResponse, VoteType } from '@cloneoverflow/common';
import MDEditor from '@uiw/react-md-editor';
import { Button } from 'react-bootstrap';
import MDEditorCustom from '../../../components/MDEditorCustom';
import { useAuth } from '../../../hooks/useAuth';
import { AnswerService } from '../../../api/services/answer.service';
import { GetPassedDate } from '../../../utils/dateUtils';
import { QuestionService } from '../../../api/services/question.service';

interface AnswerItemProps {
  question: QuestionGetResponse;
  item: AnswerGetResponse;
}

const AnswerItem = ({ question, item }: AnswerItemProps) => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [answer, setAnswer] = useState<AnswerGetResponse>(item);

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
      <MDEditorCustom value={answer.text} onChange={(e) => {
        setAnswer({
          ...answer,
          text: e ?? ''
        });
      }}/>
      <div className="answer-pannel">
        <div className="actions">
          <Button className='action-btn' onClick={() => {
            AnswerService.update(answer.id, { text: answer.text }).then((res) => {
              window.location.reload();
            });
          }}>Save</Button>
          <Button className='action-btn' onClick={() => {
            setAnswer({
              ...answer,
              text: item.text
            });
            setIsEditing(false);
          }}>Cancel</Button>
        </div>
      </div>
    </>
  }

  return ( 
    <div className="answer-item">
      <div className="sidepanel">
        <button className='vote-btn' disabled={answer.voteType === VoteType.UP || answer.owner.id === user?.id} onClick={() => {
          AnswerService.voteAnswer(answer.id, { vote: VoteType.UP }).then(() => {
            setAnswer({
              ...answer,
              voteType: answer?.voteType ? null : VoteType.UP,
              rate: answer.rate + 1
            });
          }).catch(() => {});
        }}><i className="fa-solid fa-arrow-up"></i></button>
        <p className='rating'>{answer.rate}</p>
        <button className='vote-btn' disabled={answer.voteType === VoteType.DOWN || answer.owner.id === user?.id} onClick={() => {
          AnswerService.voteAnswer(answer.id, { vote: VoteType.DOWN }).then(() => {
            setAnswer({
              ...answer,
              voteType: answer?.voteType ? null : VoteType.DOWN,
              rate: answer.rate - 1
            });
          }).catch(() => {});
        }}><i className="fa-solid fa-arrow-down"></i></button>
        {
          question.owner.id === user?.id ?
            <button className={`vote-btn ${answer.isSolution ? 'solution' : ''}`} onClick={() => {
              QuestionService.closeQuestion(question.id, answer.id).then(() => {
                window.location.reload();
              });
            }}><i className="fa-solid fa-check"></i></button>
          : <></>
        }
        {
          question.owner.id !== user?.id && answer.isSolution ?
            <p className='solution'>Solution</p>
          : <></> 
        }
      </div>
      <div className="answer-content" data-color-mode="light">
        { isEditing ? onEdit() : onRead() }
      </div>
    </div>
  );
}
 
export default AnswerItem;