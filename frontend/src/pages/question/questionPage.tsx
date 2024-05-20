import React, { useEffect, useState } from 'react';
import { OrderBy, QuestionAnswersSortBy, QuestionGetResponse } from '@cloneoverflow/common';
import MDEditor from '@uiw/react-md-editor';
import { Button } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import { AnswerService } from '../../api/services/answer.service';
import { QuestionService } from '../../api/services/question.service';
import MDEditorCustom from '../../components/MDEditorCustom';
import Taglist from '../../components/taglist/taglist';
import { useAuth } from '../../hooks/useAuth';
import AnswerItem from './components/answerItem';
import { GetPassedDate, checkModifiedData } from '../../utils/dateUtils';

enum AnswersSort {
  BEST='best',
  NEWEST='newest',
  OLDEST='oldest',
}

const QuestionPage = () => {
  const { questionId } = useParams()
  const [question, setQuestion] = useState<QuestionGetResponse>();
  const { user } = useAuth();
  const [sortAnswers, setSortAnswers] = useState<AnswersSort>(AnswersSort.BEST);
  const [answer, setAnswer] = useState<string>('');
  const navigate = useNavigate();

  const sortAnswersMapper = {
    [AnswersSort.BEST]: {
      sortBy: QuestionAnswersSortBy.RATE,
      orderBy: OrderBy.DESC,
    },
    [AnswersSort.NEWEST]: {
      sortBy: QuestionAnswersSortBy.DATE,
      orderBy: OrderBy.DESC,
    },
    [AnswersSort.OLDEST]: {
      sortBy: QuestionAnswersSortBy.DATE,
      orderBy: OrderBy.ASC,
    },
  };

  const createAnswer = () => {
    AnswerService.create({
      questionId: questionId ?? '',
      text: answer,
    }).then(() => {
      window.location.reload();
    });
  };

  useEffect(() => {
    QuestionService.get(questionId ?? '', {
      answers: sortAnswersMapper[sortAnswers],
    }).then((question) => {
      setQuestion(question);
    });
  }, [sortAnswers]);

  return (
    <div className="question" data-color-mode="light">
      <div className="question-content">
        <div className="head">
          <h1>{question?.title}</h1>
          <div className='head-pannel'>
            <p className='created-date'>Asked {GetPassedDate(question?.createdAt)}</p>
            {
              checkModifiedData(question?.createdAt, question?.updatedAt) ?
                <p className='updated-date'>Modified {GetPassedDate(question?.updatedAt)}</p>
              : <></>
            }
          </div>
        </div>
        <div className="body">
          <div className="sidepanel">
            <button className='vote-btn'><i className="fa-solid fa-arrow-up"></i></button>
            <p className='rating'>{question?.rate}</p>
            <button className='vote-btn'><i className="fa-solid fa-arrow-down"></i></button>
          </div>
          <div className="question-text">
            <MDEditor.Markdown className='md-text' source={question?.text ?? ''} />
            <Taglist tags={question?.tags.map((tag) => tag.name)} />
            <div className="footer">
              {
                user?.id === question?.owner.id ? 
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
                <p>{question?.owner.name}</p>
                <p><a href={`/users/${question?.owner.id}`}>@{question?.owner.username}</a> ● {question?.owner.reputation}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="answer-block">
        <div className="answer-head">
          <h4>{question?.answers.length} Answers</h4>
          <label htmlFor="sortByAnswer">Sort by:</label>
          <select id="sortByAnswer" className='sortAnswers' onChange={(e) => {
            setSortAnswers(e.target.value as AnswersSort);
          }}>
            <option value={AnswersSort.BEST}>Best</option>
            <option value={AnswersSort.NEWEST}>Newest</option>
            <option value={AnswersSort.OLDEST}>Oldest</option>
          </select>
        </div>
        <div className="answer-list">
          {
            question?.answers.map((answer, index) => <><AnswerItem key={index} answer={answer} /> <hr/></>)
          }
        </div>
        <div className="answer-create">
          <h5>Your answer</h5>
          <MDEditorCustom 
            className='answer-editor'
            value={answer} 
            onChange={(e) => {
              setAnswer(e ?? '');
            }}
          />
          <Button onClick={() => createAnswer()}>Post Your Answer</Button>
        </div>
      </div>
    </div>
  );
};

export default QuestionPage;