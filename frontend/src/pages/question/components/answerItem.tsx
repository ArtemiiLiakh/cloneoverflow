import React, { useState } from 'react';
import MDEditor from '@uiw/react-md-editor';
import { Button } from 'react-bootstrap';
import { AnswerGetResponse } from '@cloneoverflow/common/api/answer';
import { QuestionGetAnswersDataItem, QuestionGetResponse } from '@cloneoverflow/common/api/question';
import { VoteTypeEnum } from '@cloneoverflow/common';
import { AnswerService } from '@/api/services/answer.service';
import { QuestionService } from '@/api/services/question.service';
import MDEditorCustom from '@/components/MDEditorCustom';
import { useAuth } from '@/hooks/useAuth';
import { GetPassedDate } from '@/utils/dateUtils';

interface AnswerItemProps {
  question: QuestionGetResponse;
  item: AnswerGetResponse;
}

const AnswerItem = ({ question, item }: AnswerItemProps) => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [answer, setAnswer] = useState<QuestionGetAnswersDataItem>(item);

  const onRead = () => {
    return (
      <>
        <MDEditor.Markdown className='answer-text' source={answer.text}/>
        <div className="answer-pannel">
          {
            answer.owner?.id === user?.id ? 
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
            <p className='answerDate'>answered {GetPassedDate(answer.createdAt)}</p>
            <p>{answer?.owner?.name}</p>
            <p><a href={`/users/${answer.owner?.id}`}>@{answer.owner?.username}</a> ● {answer.owner?.rating}</p>
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
        <button className='vote-btn' disabled={answer.myVoteType === VoteTypeEnum.UP || answer.owner?.id === user?.id} onClick={() => {
          AnswerService.voteAnswer(answer.id, 'up').then(() => {
            setAnswer({
              ...answer,
              myVoteType: answer.myVoteType ? null : VoteTypeEnum.UP,
              rating: answer.rating + 1
            });
          }).catch(() => {});
        }}><i className="fa-solid fa-arrow-up"></i></button>
        <p className='rating'>{answer.rating}</p>
        <button className='vote-btn' disabled={answer.myVoteType === VoteTypeEnum.DOWN || answer.owner?.id === user?.id} onClick={() => {
          AnswerService.voteAnswer(answer.id, 'down').then(() => {
            setAnswer({
              ...answer,
              myVoteType: answer?.myVoteType ? null : VoteTypeEnum.DOWN,
              rating: answer.rating - 1
            });
          }).catch(() => {});
        }}><i className="fa-solid fa-arrow-down"></i></button>
        {
          question.owner?.id === user?.id ?
            <button className={`vote-btn ${answer.isSolution ? 'solution' : ''}`} onClick={() => {
              if (answer.isSolution) {
                QuestionService.openQuestion(question.id).then(() => {
                  window.location.reload();
                })
              } else {
                QuestionService.closeQuestion(question.id ?? '', {
                  answerId: answer.id
                }).then(() => {
                  window.location.reload();
                });
              }
            }}><i className="fa-solid fa-check"></i></button>
          : <></>
        }
        {
          question.owner?.id !== user?.id && answer.isSolution ?
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