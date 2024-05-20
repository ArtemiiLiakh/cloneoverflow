import * as React from 'react';
import { ListGroup } from 'react-bootstrap';
import { MappedSearchQuestionResponse, QuestionStatus } from '@cloneoverflow/common';
import { Link } from 'react-router-dom';
import { ShortText } from '../../../utils/stringUtils';
import Taglist from '../../../components/taglist/taglist';
import MDEditor from '@uiw/react-md-editor';
import { checkModifiedData, GetPassedDate } from '../../../utils/dateUtils';

interface QuestionItemProps {
  question: MappedSearchQuestionResponse;
}

const QuestionItem = ({ question }: QuestionItemProps) => {
  return (
    <ListGroup.Item className='question-item'>
      <div className="stats">
        <p>Rate: {question.rate}</p>
        <p>Answers: {question.answersAmount}</p>
        {question.status === QuestionStatus.CLOSED && <p className='status-closed'><i className="fas fa-check-circle"></i> Answered</p>}
      </div>
      <div className="question-body">
        <Link to={`/questions/${question.id}`} className='question-title'>
          <h4>{question.title}</h4>
        </Link>
        <div className="question-text" data-color-mode="light">
          <MDEditor.Markdown source={ShortText(question.text, 100)} />
        </div>
        <div className="meta">
          <Taglist tags={question.tags.map((tag) => tag.name)}/>
          <div className="user-meta">
            <div className="author">
              <p>
                <i className="fas fa-user" style={{
                  marginRight: '5px'
                }}></i> {question.owner.name}
              </p>
              <Link to={`/users/${question.owner.id}`}>@{question.owner.username}</Link>
            </div>
            <div className="date">
              <p>
                { checkModifiedData(question?.createdAt, question?.updatedAt) ? 
                    'Modified ' + GetPassedDate(question.updatedAt)
                  :
                    'Asked ' + GetPassedDate(question.createdAt)
                }
              </p>
            </div>
          </div>
        </div>
      </div>
    </ListGroup.Item>
  );
}
 
export default QuestionItem;