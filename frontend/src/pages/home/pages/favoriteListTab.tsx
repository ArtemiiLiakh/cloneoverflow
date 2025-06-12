import * as React from 'react';

import { SearchService } from '@/api/services/search.service';
import Pagination from '@/components/pagination/pagination';
import config from '@/config';
import { PaginationInfo, SearchQuestionFilterByEnum } from '@cloneoverflow/common';
import { SearchQuestionDataItem } from '@cloneoverflow/common/api/search';
import { useEffect, useState } from 'react';
import { ListGroup } from 'react-bootstrap';
import { useNavigate, useSearchParams } from 'react-router-dom';
import QuestionItem from '../components/questionItem';

const FavoriteListTab = () => {
  const [questions, setQuestions] = useState<SearchQuestionDataItem[]>([]);

  const [page, setPage] = useState<number>(config.defaultPage);
  const [pagination, setPagination] = useState<Partial<PaginationInfo>>({
    page: config.defaultPage,
    pageSize: config.defaultPageSize,
    totalPages: 0,
    totalAmount: 0,
  });

  const [searchParams] = useSearchParams();

  useEffect(() => {
    SearchService.searchQuestion({
      search: searchParams.get('q') ?? '',
      filterBy: SearchQuestionFilterByEnum.FAVORITE,
      page,
      pageSize: pagination.pageSize,
    }).then((res) => {
      setQuestions(res.questions);
      setPagination(res.pagination);
    });
  }, [page, searchParams]);

  return (
    <div className='page questionPage'>
      <div className="header">
        <h3>Favorite questions</h3>
        { pagination.totalAmount ? <p>{pagination.totalAmount} favorite questions</p> : ''}
      </div>
      <ListGroup className='questionList' variant='flush'>
        {questions.map((question) => <QuestionItem key={question.id} question={question} />)}
      </ListGroup>

      <Pagination page={page} setPage={setPage} totalPages={pagination.totalPages ?? 0} />
    </div>
  );
}

export default FavoriteListTab;