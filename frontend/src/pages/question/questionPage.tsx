import * as React from 'react';
import { AnswersSortByEnum, ExceptionMessage, VoteTypeEnum } from '@cloneoverflow/common';
import { QuestionGetAnswersResponse, QuestionGetResponse } from '@cloneoverflow/common/api/question';
import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import AnswerItem from './components/answerItem';
import { AnswerService } from '@/api/services/answer.service';
import { QuestionService } from '@/api/services/question.service';
import ErrorList from '@/components/errorlist/ErrorList';
import MDEditorCustom from '@/components/MDEditorCustom';
import Taglist from '@/components/taglist/taglist';
import { useAuth } from '@/hooks/useAuth';
import { GetPassedDate } from '@/utils/dateUtils';
import { formatArray } from '@/utils/stringUtils';
import MDEditor from '@uiw/react-md-editor';

const QuestionPage = () => {
  const { user } = useAuth();
  const { questionId } = useParams()
  const [question, setQuestion] = useState<QuestionGetResponse>();
  const [answers, setAnswers] = useState<QuestionGetAnswersResponse['answers']>();
  const [sortAnswers, setSortAnswers] = useState<AnswersSortByEnum>(AnswersSortByEnum.RATE);
  const [newAnswer, setNewAnswer] = useState<string>('');
  const [errors, setErrors] = useState<string[]>([]);
  const navigate = useNavigate();

  const disableVoteDown = question?.myVoteType === VoteTypeEnum.DOWN || 
                          question?.owner?.id === user?.id;

  const disableVoteUp = question?.myVoteType === VoteTypeEnum.UP || 
                        question?.owner?.id === user?.id;

  const createAnswer = React.useCallback(() => {
    AnswerService.create({
      questionId: questionId ?? '',
      text: newAnswer,
    }).then(() => {
      window.location.reload();
    }).catch((e: AxiosError<ExceptionMessage>) => {
      console.log(e);
      setErrors(formatArray(e.response?.data.error) ?? ['Server error']);
    });
  }, [newAnswer]);

  const toggleFavorite = React.useCallback(() => {
    if (!questionId || !question) return;

    console.log(question?.isFavorite);
    if (question?.isFavorite) {
      QuestionService.removeFavorite(questionId).then(() => setQuestion({
        ...question,
        isFavorite: false
      }));
    }
    else {
      QuestionService.makeFavorite(questionId).then(() => setQuestion({
        ...question,
        isFavorite: true
      }));
    }
  }, [question]);

  useEffect(() => {
    if (questionId) {
      QuestionService.get(questionId).then((newQuestion) => {
        setQuestion(newQuestion);   
      });
      QuestionService.addViewer(questionId);
    }
  }, []);

  useEffect(() => {
    if (questionId) QuestionService.getAnswers(questionId, sortAnswers).then((answersList) => {
      setAnswers(answersList.answers);
    });
  }, [sortAnswers]);

  return (
    <div className="question" data-color-mode="light">
      <div className="question-content">
        <div className="head">
          <h1>{question?.title}</h1>
          <div className='head-pannel'>
            { question?.isClosed ? <p className='closed'>Closed</p> : <></> }
            <p className='created-date'>Asked {GetPassedDate(question?.createdAt)}</p>
            {
              question?.createdAt === question?.updatedAt ?
                <p className='updated-date'>Modified {GetPassedDate(question?.updatedAt)}</p>
                : <></>
            }
            <p>Viewed {question?.views ?? 0}</p>
          </div>
        </div>
        <div className="body">
          <div className="sidepanel">
            <button className='vote-btn' disabled={disableVoteUp} onClick={() => {
              QuestionService.voteQuestion(questionId ?? '', 'up').then(() => {
                if (question) {
                  setQuestion({
                    ...question,
                    myVoteType: question?.myVoteType ? null : VoteTypeEnum.UP,
                    rating: question?.rating + 1,
                  });
                }
              }).catch(() => { });
            }}><i className="fa-solid fa-arrow-up"></i></button>
            <p className='rating'>{question?.rating}</p>
            <button className='vote-btn' disabled={disableVoteDown} onClick={() => {
              QuestionService.voteQuestion(questionId ?? '', 'down').then(() => {
                if (question) {
                  setQuestion({
                    ...question,
                    myVoteType: question?.myVoteType ? null : VoteTypeEnum.DOWN,
                    rating: question?.rating - 1,
                  });
                }
              }).catch(() => {});
            }}><i className="fa-solid fa-arrow-down"></i></button>
            <button className='favorite' onClick={toggleFavorite}>
              {
                question?.isFavorite ? 
                <i className="fa-solid fa-bookmark"></i> : 
                <i className="fa-regular fa-bookmark"></i>
              }             
            </button>
          </div>
          <div className="question-text">
            <MDEditor.Markdown className='md-text' source={question?.text ?? ''} />
            <Taglist tags={question?.tags.map((tag) => tag)} />
            <div className="footer">
              {
                user?.id === question?.owner?.id ?
                  <div className="actions">
                    <Button className="action-btn" onClick={() => {
                      navigate(`/questions/${questionId}/edit`)
                    }}>Edit</Button>

                    <Button className="action-btn" onClick={() => {
                      QuestionService.delete(questionId ?? '').then(() => {
                        navigate('/');
                      });
                    }}>Delete</Button>
                  </div>
                  : <></>
              }
              <div className="author">
                <p className='askedDate'>asked {new Date(question?.createdAt ?? '').toDateString()}</p>
                <p>{question?.owner?.name}</p>
                <p><a href={`/users/${question?.owner?.id}`}>@{question?.owner?.username}</a> ● {question?.owner?.rating}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="answer-block">
        <div className="answer-head">
          <h4>{answers?.length} Answers</h4>
          <label htmlFor="sortByAnswer">Sort by:</label>
          <select id="sortByAnswer" className='sortAnswers' onChange={(e) => {
            setSortAnswers(e.target.value as AnswersSortByEnum);
          }}>
            <option value={AnswersSortByEnum.RATE}>Rating</option>
            <option value={AnswersSortByEnum.DATE}>Date</option>
            <option value={AnswersSortByEnum.SOLUTION}>Solution</option>
          </select>
        </div>
        <div className="answer-list">
          { 
            !question ? '' : answers?.map((answer) => (
              <>
                <AnswerItem key={answer.id} question={question} item={answer} /> 
                <hr />
              </>
            ))
          }
        </div>
        <div className="answer-create">
          <h5>Your answer</h5>
          <MDEditorCustom
            className='answer-editor'
            value={newAnswer}
            onChange={(e) => {
              setNewAnswer(e ?? '');
            }}
          />
          <Button onClick={() => createAnswer()}>Post Your Answer</Button>
          <ErrorList errors={errors} />
        </div>
      </div>
    </div>
  );
};

export default QuestionPage;