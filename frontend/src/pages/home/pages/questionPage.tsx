import { MappedSearchQuestionResponse, PaginationResponse, SearchQuestionFilterBy, SearchQuestionSortBy, SearchQuestionsDTO } from '@cloneoverflow/common';
import React, { useEffect, useState } from 'react';
import { Button, ListGroup, Nav } from 'react-bootstrap';
import { useSearchParams } from 'react-router-dom';
import { SearchService } from '../../../api/services/search.service';
import Pagination from '../../../components/pagination/pagination';
import config from '../../../config';
import QuestionItem from '../components/questionItem';

enum QuestionPageSortEnum {
  NEWEST = 'newest',
  ACTIVE = 'active',
  CLOSED = 'closed',
  TOP = 'top',
  MOSTANSWERED = 'mostanswered',
}

interface IQuestionSortMapper {
  [key: string]: SearchQuestionsDTO;
}

const QuestionSortMapper: IQuestionSortMapper = {
  [QuestionPageSortEnum.NEWEST]: {
    sortBy: [SearchQuestionSortBy.DATE],
  },
  [QuestionPageSortEnum.ACTIVE]: {
    sortBy: [SearchQuestionSortBy.DATE, SearchQuestionSortBy.RATE, SearchQuestionSortBy.ANSWERS],
    filterBy: [SearchQuestionFilterBy.ACTIVE],
  },
  [QuestionPageSortEnum.CLOSED]: {
    sortBy: [SearchQuestionSortBy.DATE, SearchQuestionSortBy.RATE, SearchQuestionSortBy.ANSWERS],
    filterBy: [SearchQuestionFilterBy.CLOSED],
  },
  [QuestionPageSortEnum.TOP]: {
    sortBy: [SearchQuestionSortBy.RATE, SearchQuestionSortBy.ANSWERS],
  },
  [QuestionPageSortEnum.MOSTANSWERED]: {
    sortBy: [SearchQuestionSortBy.ANSWERS, SearchQuestionSortBy.DATE],
  },
}

const QuestionPage = () => {
  const [questions, setQuestions] = useState<MappedSearchQuestionResponse[]>([]);
  const [activeTab, setActiveTab] = useState<QuestionPageSortEnum>(QuestionPageSortEnum.NEWEST);
  
  const [page, setPage] = useState<number>(config.defaultPage);
  const [pagination, setPagination] = useState<Partial<PaginationResponse>>({
    page: config.defaultPage,
    pageSize: config.defaultPageSize,
    totalPages: 0,
    totalAmount: 0,
  });

  const [searchParams, setSearchParam] = useSearchParams();

  useEffect(() => {
    SearchService.searchQuestion({ 
      search: searchParams.get('q') ?? '',
      ...QuestionSortMapper[activeTab],
      pagination: {
        page,
        pageSize: pagination.pageSize,
      },
    }).then((res) => {
      setQuestions(res.questions);
      setPagination(res.pagination);
    }); 
  }, [activeTab, page, searchParams]);

  return ( 
    <div className='page questionPage'>
      <div className="header">
        <h3>Questions</h3>
        <p>Total amount: {pagination.totalAmount}</p>
        <div className="search">
          <div className="sort">
            <Nav variant='pills' defaultActiveKey={QuestionPageSortEnum.NEWEST} onSelect={(e) => {
              setActiveTab(e as QuestionPageSortEnum);
              setPage(0);
            }}>
              <Nav.Item>
                <Nav.Link eventKey={QuestionPageSortEnum.NEWEST}>Newest</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey={QuestionPageSortEnum.ACTIVE}>Active</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey={QuestionPageSortEnum.CLOSED}>Closed</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey={QuestionPageSortEnum.TOP}>Top</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey={QuestionPageSortEnum.MOSTANSWERED}>Most answered</Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
        </div>
        <Button variant='primary' className='askQuestion'>Ask a question</Button>
      </div>
      <ListGroup className='questionList' variant='flush'>
        {questions.map((question, index) => <QuestionItem key={index} question={question}/>)}
      </ListGroup>

      <Pagination page={page} setPage={setPage} totalPages={pagination.totalPages ?? 0}/>
    </div>
  );
}
 
export default QuestionPage;