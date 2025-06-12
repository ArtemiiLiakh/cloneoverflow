import * as React from 'react';
import { AnswersSortByEnum, OrderByEnum } from '@cloneoverflow/common';
import { UserGetAnswersQuery, UserGetAnswersResponse } from '@cloneoverflow/common/api/user';
import { useState, useEffect } from 'react';
import { Form, Table } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserService } from '@/api/services/user.service';
import { GetPassedDate } from '@/utils/dateUtils';

interface UserAnswersTabProps {
  userId?: string;   
}

const UserAnswersTab = ({ userId }: UserAnswersTabProps) => {
  const [request, setRequest] = useState<UserGetAnswersQuery>({
    sortBy: AnswersSortByEnum.RATE,
    orderBy: OrderByEnum.DESC,
    page: 0,
    pageSize: 10,
  });
  const [answers, setAnswers] = useState<UserGetAnswersResponse>();

  const handleRequest = (request: UserGetAnswersQuery) => {
    if (!userId) return;
    
    UserService.getAnswers(userId, request).then((response: UserGetAnswersResponse) => {
      setAnswers(response);
    });
    setRequest(request);
  }

  useEffect(() => {
    if (userId) {
      UserService.getAnswers(userId, request).then((response: UserGetAnswersResponse) => {
        setAnswers(response);
      });
    }
  }, []);

  return (
    <div className="user-answers">
      <p className='block-header'>Answers</p>
      <div className="answer-filter">
        <div className="filter-block">
          <Form.Label htmlFor='answer-sortBy'>Sort by:</Form.Label>
          <Form.Select 
            id='answer-sortBy' 
            onChange={(e) => {
              handleRequest({
                ...request,
                sortBy: e.target.value as AnswersSortByEnum,
              });
            }}
            defaultValue={AnswersSortByEnum.RATE}
          >
            <option value={AnswersSortByEnum.DATE}>Date</option>
            <option value={AnswersSortByEnum.RATE}>Rate</option>
            <option value={AnswersSortByEnum.SOLUTION}>Solution</option>
          </Form.Select>
          <button id='orderBy' className='orderBy' onClick={() => {
            handleRequest({
              ...request,
              orderBy: request.orderBy === OrderByEnum.ASC ? OrderByEnum.DESC : OrderByEnum.ASC,
            });
          }}>
            {request.orderBy === OrderByEnum.ASC ? '↑' : '↓'}
          </button>
        </div>
        <div className="filter-block">
          <Form.Label htmlFor='answer-question'>Question:</Form.Label>
          <Form.Control 
            id='answer-question' 
            type='search' 
            placeholder='Search by question'
            onChange={(e) => {
              setRequest({
                ...request,
                search: e.target.value,
              });
            }}
            onBlur={() => {
              handleRequest(request);
            }}
          />
        </div>
      </div>
      <Table className='answer-table'>
        <thead>
          <tr>
            <th></th>
            <th>#</th>
            <th>Text</th>
            <th>Rate</th>
            <th>Solution</th>
            <th>Date</th>
            <th>Question</th>
          </tr>
        </thead>
        <tbody>
          {answers?.answers.map((answer, index) => (
            <tr key={answer.id}>
              <td></td>
              <td>{index + 1}</td>
              <td>{answer.text}</td>
              <td>{answer.rating}</td>
              <td className={answer.isSolution ? 'solution' : ''}>{answer.isSolution ? 'Yes' : 'No'}</td>
              <td>{GetPassedDate(answer.createdAt)}</td>
              <td><Link to={`/questions/${answer.question.id}`}>{answer.question.title}</Link></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
 
export default UserAnswersTab;