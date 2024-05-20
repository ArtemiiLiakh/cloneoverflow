import React, { useEffect, useState } from 'react';
import { Button, ListGroup, Nav } from 'react-bootstrap';
import config from '../../../config';
import QuestionItem from '../components/questionItem';
import { MappedSearchQuestionResponse, SearchQuestionFilterBy, SearchQuestionSortBy, SearchQuestionsDTO } from '@cloneoverflow/common';
import { SearchService } from '../../../api/services/search.service';
import { useNavigate } from 'react-router-dom';

enum HomePageSortEnum {
  INTERESTING = 'interesting',
  HOT = 'hot',
  WEEK = 'week',
  MONTH = 'month',
}

interface IQuestionSortMapper {
  [key: string]: SearchQuestionsDTO;
}

const QuestionSortMapper: IQuestionSortMapper = {
  [HomePageSortEnum.INTERESTING]: {
    sortBy: [SearchQuestionSortBy.DATE, SearchQuestionSortBy.RATE, SearchQuestionSortBy.ANSWERS],
  },
  [HomePageSortEnum.HOT]: {
    sortBy: [SearchQuestionSortBy.RATE, SearchQuestionSortBy.ANSWERS, SearchQuestionSortBy.DATE],
  },
  [HomePageSortEnum.WEEK]: {
    sortBy: [SearchQuestionSortBy.DATE, SearchQuestionSortBy.RATE, SearchQuestionSortBy.ANSWERS],
    filterBy: [SearchQuestionFilterBy.WEEKLY],
  },
  [HomePageSortEnum.MONTH]: {
    sortBy: [SearchQuestionSortBy.DATE, SearchQuestionSortBy.RATE, SearchQuestionSortBy.ANSWERS],
    filterBy: [SearchQuestionFilterBy.MONTHLY],
  },
}

const HomeTab = () => {
  const [questions, setQuestions] = useState<MappedSearchQuestionResponse[]>([]);
  const [activeTab, setActiveTab] = useState<HomePageSortEnum>(HomePageSortEnum.INTERESTING);
  const navigate = useNavigate();

  useEffect(() => {
    SearchService.searchQuestion({
      ...QuestionSortMapper[activeTab],
      pagination: {
        page: config.defaultPage,
        pageSize: 30,
      },
    }).then((res) => {
      setQuestions(res.questions);
    });
  }, [activeTab]);

  return (
    <div className="page homePage">
      <div className="header">
        <h3>Home page</h3>
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
        {questions.map((question, index) => <QuestionItem key={index} question={question} />)}
      </ListGroup>
    </div>
  );
}

export default HomeTab;