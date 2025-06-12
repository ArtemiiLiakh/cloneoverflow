import * as React from 'react';
import { PaginationInfo, SearchQuestionFilterByEnum, SearchQuestionSortByEnum } from '@cloneoverflow/common';
import { SearchQuestionDataItem, SearchQuestionsQuery } from '@cloneoverflow/common/api/search';
import { useEffect, useState } from 'react';
import { Button, ListGroup, Nav } from 'react-bootstrap';
import { useNavigate, useSearchParams } from 'react-router-dom';
import QuestionItem from '../components/questionItem';
import config from '@/config';
import { SearchService } from '@/api/services/search.service';
import Pagination from '@/components/pagination/pagination';

enum QuestionPageSortEnum {
  NEWEST = 'newest',
  ACTIVE = 'active',
  CLOSED = 'closed',
  TOP = 'top',
  MOSTANSWERED = 'mostanswered',
}

interface IQuestionSortMapper {
  [key: string]: SearchQuestionsQuery;
}

const QuestionSortMapper: IQuestionSortMapper = {
  [QuestionPageSortEnum.NEWEST]: {
    sortBy: SearchQuestionSortByEnum.DATE,
  },
  [QuestionPageSortEnum.ACTIVE]: {
    sortBy: SearchQuestionSortByEnum.DATE,
    filterBy: SearchQuestionFilterByEnum.ACTIVE,
  },
  [QuestionPageSortEnum.CLOSED]: {
    sortBy: SearchQuestionSortByEnum.DATE,
    filterBy: SearchQuestionFilterByEnum.CLOSED,
  },
  [QuestionPageSortEnum.TOP]: {
    sortBy: SearchQuestionSortByEnum.RATE,
  },
  [QuestionPageSortEnum.MOSTANSWERED]: {
    sortBy: SearchQuestionSortByEnum.ANSWERS,
  },
}

const QuestionListTab = () => {
  const [questions, setQuestions] = useState<SearchQuestionDataItem[]>([]);
  const [activeTab, setActiveTab] = useState<QuestionPageSortEnum>(QuestionPageSortEnum.NEWEST);

  const [page, setPage] = useState<number>(config.defaultPage);
  const [pagination, setPagination] = useState<Partial<PaginationInfo>>({
    page: config.defaultPage,
    pageSize: config.defaultPageSize,
    totalPages: 0,
    totalAmount: 0,
  });

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    SearchService.searchQuestion({
      search: searchParams.get('q') ?? '',
      ...QuestionSortMapper[activeTab],
      page,
      pageSize: pagination.pageSize,
    }).then((res) => {
      setQuestions(res.questions);
      setPagination(res.pagination);
    });
  }, [activeTab, page, searchParams]);

  return (
    <div className='page questionPage'>
      <div className="header">
        <h3>Questions</h3>
        { pagination.totalAmount ? <p>{pagination.totalAmount} questions</p> : ''}
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
        <Button variant='primary' className='askQuestion' onClick={() => {
          navigate('/questions/ask');
        }}>Ask a question</Button>
      </div>
      <ListGroup className='questionList' variant='flush'>
        {questions.map((question) => <QuestionItem key={question.id} question={question} />)}
      </ListGroup>

      <Pagination page={page} setPage={setPage} totalPages={pagination.totalPages ?? 0} />
    </div>
  );
}

export default QuestionListTab;