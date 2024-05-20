import * as React from 'react';
import { useState, useEffect } from 'react';
import { Form, Table } from 'react-bootstrap';
import { UserService } from '../../../../api/services/user.service';
import { OrderBy, UserGASortBy, UserGetAnswersDTO, UserGetAnswersResponse } from '@cloneoverflow/common';
import { GetPassedDate } from '../../../../utils/dateUtils';

interface UserAnswersTabProps {
  userId?: string;   
}

const UserAnswersTab = ({ userId }: UserAnswersTabProps) => {
  const [request, setRequest] = useState<UserGetAnswersDTO>({
    sortBy: UserGASortBy.RATE,
    orderBy: OrderBy.DESC,
    pagination: {
      page: 0,
      pageSize: 10,
    },
  });
  const [answers, setAnswers] = useState<UserGetAnswersResponse>();

  const handleRequest = (request: UserGetAnswersDTO) => {
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
                sortBy: e.target.value as UserGASortBy,
              });
            }}
            defaultValue={UserGASortBy.RATE}
          >
            <option value={UserGASortBy.DATE}>Date</option>
            <option value={UserGASortBy.RATE}>Rate</option>
            <option value={UserGASortBy.SOLUTION}>Solution</option>
          </Form.Select>
          <button id='orderBy' className='orderBy' onClick={() => {
            handleRequest({
              ...request,
              orderBy: request.orderBy === OrderBy.ASC ? OrderBy.DESC : OrderBy.ASC,
            });
          }}>
            {request.orderBy === OrderBy.ASC ? '↑' : '↓'}
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
                questionTitle: e.target.value,
              });
            }}
            onBlur={() => {
              handleRequest(request);
            }}
          />
        </div>
      </div>
      <Table>
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
              <td>{answer.rate}</td>
              <td>{answer.isSolution ? 'Yes' : 'No'}</td>
              <td>{GetPassedDate(answer.createdAt)}</td>
              <td>{answer.question.title}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
 
export default UserAnswersTab;