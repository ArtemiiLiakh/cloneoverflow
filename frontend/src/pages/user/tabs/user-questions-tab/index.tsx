import * as React from 'react';
import { OrderByEnum, QuestionsSortByEnum } from '@cloneoverflow/common';
import { UserGetQuestionDataItem, UserGetQuestionsQuery, UserGetQuestionsResponse } from '@cloneoverflow/common/api/user';
import { useEffect, useState } from 'react';
import { Form, Table } from 'react-bootstrap';
import { UserService } from '@/api/services/user.service';
import Taglist from '@/components/taglist/taglist';
import { GetPassedDate } from '@/utils/dateUtils';

interface UserQuestionsTabProps {
  userId?: string;   
}

const UserQuestionsTab = ({ userId }: UserQuestionsTabProps) => {
  const [questions, setQuestions] = useState<UserGetQuestionDataItem[]>();
  const [request, setRequest] = useState<UserGetQuestionsQuery>({
    sortBy: QuestionsSortByEnum.RATE,
    orderBy: OrderByEnum.DESC,
    page: 0,
    pageSize: 10,
  });

  const handleRequest = (request: UserGetQuestionsQuery) => {
    if (!userId) return;
    UserService.getQuestions(userId, request).then((response: UserGetQuestionsResponse) => {
      setQuestions(response.questions);
    });
    setRequest(request);
  }

  useEffect(() => {
    if (userId) {
      UserService.getQuestions(userId, request).then((response: UserGetQuestionsResponse) => {
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
                sortBy: e.target.value as QuestionsSortByEnum,
              });
            }}
          >
            <option value={QuestionsSortByEnum.DATE}>Date</option>
            <option value={QuestionsSortByEnum.RATE}>Rate</option>
            <option value={QuestionsSortByEnum.ANSWERS}>Answers</option>
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
      <Table className='question-table'>
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
              <td>{question.rating}</td>
              <td>{question.answersAmount}</td>
              <td className={question.isClosed ? 'closed' : ''}>{question.isClosed ? 'CLOSED' : 'ACTIVE'}</td>
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