import * as React from 'react';

import Taglist from '@/components/taglist/taglist';
import { GetPassedDate } from '@/utils/dateUtils';
import { SearchQuestionDataItem } from '@cloneoverflow/common/api/search';
import { ListGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';

interface QuestionItemProps {
  question: SearchQuestionDataItem;
}

const QuestionItem = ({ question }: QuestionItemProps) => {
  return (
    <ListGroup.Item className='question-item'>
      <div className="stats">
        <p>Rate: {question.rating}</p>
        <p>Answers: {question.answersAmount}</p>
        <p>Views: {question.views}</p>
        {question.isClosed && <p className='status-closed'><i className="fas fa-check-circle"></i> Answered</p>}
      </div>
      <div className="question-body">
        <Link to={`/questions/${question.id}`} className='question-title'>
          <h4>{question.title}</h4>
        </Link>
        <div className="meta">
          <Taglist tags={question.tags.map((tag) => tag)}/>
          <div className="user-meta">
            <div className="author">
              <p>
                <i className="fas fa-user" style={{
                  marginRight: '5px'
                }}></i> {question.owner?.name}
              </p>
              <Link to={`/users/${question.owner?.id}`}>@{question.owner?.username}</Link>
            </div>
            <div className="date">
              <p>
                { question.createdAt !== question.updatedAt ? 
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