import React, { useEffect, useState } from 'react';
import { UserService } from '../../../../api/services/user.service';
import { Form, Table } from 'react-bootstrap';
import Taglist from '../../../../components/taglist/taglist';
import { 
  MappedUserGetQuestionResponse, 
  UserGetQuestionsDTO, 
  UserGQSortBy, 
  UserGetQuestionResponse, 
  OrderBy
} from '@cloneoverflow/common';
import { GetPassedDate } from '../../../../utils/dateUtils';

interface UserQuestionsTabProps {
  userId?: string;   
}

const UserQuestionsTab = ({ userId }: UserQuestionsTabProps) => {
  const [questions, setQuestions] = useState<MappedUserGetQuestionResponse[]>();
  const [request, setRequest] = useState<UserGetQuestionsDTO>({
    sortBy: UserGQSortBy.RATE,
    orderBy: OrderBy.DESC,
    pagination: {
      page: 0,
      pageSize: 10,
    },
  });

  const handleRequest = (request: UserGetQuestionsDTO) => {
    if (!userId) return;
    UserService.getQuestions(userId, request).then((response: UserGetQuestionResponse) => {
      setQuestions(response.questions);
    });
    setRequest(request);
  }

  useEffect(() => {
    if (userId) {
      UserService.getQuestions(userId, request).then((response: UserGetQuestionResponse) => {
        setQuestions(response.questions);
      });
    }
  }, []);

  return ( 
    <div className="user-questions">
      <p className='block-header'>Questions</p>
      <div className="question-filter">
        <div className="filter-block">
          <Form.Control 
            type="search" 
            className='search-title' 
            placeholder='Title'
            onChange={(e) => {
              setRequest({
                ...request,
                search: e.target.value ?? undefined,
              });
            }}
            onBlur={() => {
              console.log(request);
              handleRequest(request)
            }}
          />
        </div>
        <div className="filter-block">
          <Form.Label htmlFor="question-sortBy">Sort by:</Form.Label>
          <Form.Select 
            id="question-sortBy" 
            className='sortBy-selector' 
            defaultValue='rate'
            onChange={(e) => {
              handleRequest({
                ...request,
                sortBy: e.target.value as UserGQSortBy,
              });
            }}
          >
            <option value={UserGQSortBy.DATE}>Date</option>
            <option value={UserGQSortBy.RATE}>Rate</option>
            <option value={UserGQSortBy.ANSWERS}>Answers</option>
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
          <Form.Label htmlFor="tags">Tags:</Form.Label>
          <Form.Control 
            type="search" 
            id="tags" 
            className='tags-search' 
            placeholder='Search tags'
            onChange={(e) => {
              setRequest({
                ...request,
                tags: e.target.value ? e.target.value.split(' ') : [],
              });
            }}
            onBlur={() => {
              console.log(request);
              handleRequest(request)
            }}
          />
        </div>
      </div>
      <Table>
        <thead>
          <tr>
            <th></th>
            <th>#</th>
            <th>Title</th>
            <th>Rate</th>
            <th>Answers</th>
            <th>Status</th>
            <th>Created</th>
            <th>Tags</th>
          </tr>
        </thead>
        <tbody>
          {questions?.map((question, index) => (
            <tr key={question.id}>
              <td></td>
              <td>{index + 1}</td>
              <td>{question.title}</td>
              <td>{question.rate}</td>
              <td>{question.answersAmount}</td>
              <td>{question.status}</td>
              <td>{GetPassedDate(question.createdAt)}</td>
              <td><Taglist tags={question.tags}/></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
 
export default UserQuestionsTab;