import React, { useEffect, useState } from 'react';
import { SearchQuestionFilterByEnum, SearchQuestionSortByEnum } from '@cloneoverflow/common';
import { SearchQuestionDataItem, SearchQuestionsQuery } from '@cloneoverflow/common/api/search';
import { Button, ListGroup, Nav } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import QuestionItem from '../components/questionItem';
import { SearchService } from '@/api/services/search.service';
import config from '@/config';

enum HomePageSortEnum {
  INTERESTING = 'interesting',
  HOT = 'hot',
  WEEK = 'week',
  MONTH = 'month',
}

interface IQuestionSortMapper {
  [key: string]: SearchQuestionsQuery;
}

const QuestionSortMapper: IQuestionSortMapper = {
  [HomePageSortEnum.INTERESTING]: {
    sortBy: SearchQuestionSortByEnum.DATE,
  },
  [HomePageSortEnum.HOT]: {
    sortBy: SearchQuestionSortByEnum.RATE,
    filterBy: SearchQuestionFilterByEnum.MONTHLY,
  },
  [HomePageSortEnum.WEEK]: {
    sortBy: SearchQuestionSortByEnum.DATE,
    filterBy: SearchQuestionFilterByEnum.WEEKLY,
  },
  [HomePageSortEnum.MONTH]: {
    sortBy: SearchQuestionSortByEnum.DATE,
    filterBy: SearchQuestionFilterByEnum.MONTHLY,
  },
}

const HomeTab = () => {
  const [totalQuestions, setTotalQuestions] = useState<number>();
  const [questions, setQuestions] = useState<SearchQuestionDataItem[]>([]);
  const [activeTab, setActiveTab] = useState<HomePageSortEnum>(HomePageSortEnum.INTERESTING);
  const navigate = useNavigate();

  useEffect(() => {
    SearchService.searchQuestion({
      ...QuestionSortMapper[activeTab],
      page: config.defaultPage,
      pageSize: 30,
    }).then((data) => {
      setQuestions(data.questions);
      setTotalQuestions(data.pagination.totalAmount);
    });
  }, [activeTab]);

  return (
    <div className="page homePage">
      <div className="header">
        <h3>Home page</h3>
        { totalQuestions ? <p>{totalQuestions} questions</p> : ''}
        <div className="search">
          <div className="sort">
            <Nav variant='pills' defaultActiveKey={HomePageSortEnum.INTERESTING} onSelect={(e) => {
              setActiveTab(e as HomePageSortEnum);
            }}>
              <Nav.Item>
                <Nav.Link eventKey={HomePageSortEnum.INTERESTING}>Interesting</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey={HomePageSortEnum.HOT}>Hot</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey={HomePageSortEnum.WEEK}>Week</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey={HomePageSortEnum.MONTH}>Month</Nav.Link>
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
    </div>
  );
}

export default HomeTab;