import React, { SetStateAction, Dispatch } from 'react';
import { Pagination as BSPagination } from 'react-bootstrap';

interface BootPaginationProps {
  page: number;
  setPage: Dispatch<SetStateAction<number>>,
  totalPages: number;
}

const Pagination = ({ page, setPage, totalPages }: BootPaginationProps) => {
  const getPageItems = () => {
    const minPages = Math.floor(page/5)*5;
    const maxPages = Math.min(minPages+5, totalPages);
    const items = [];
    for (let number = minPages; number < maxPages; number++) {
      items.push(
        <BSPagination.Item key={number} active={number === page} onClick={() => {
          setPage(number);
        }}>
          {number+1}
        </BSPagination.Item>,
      );
    }
    return items;
  }

  const prev = <BSPagination.Prev disabled={page === 1} onClick={() => setPage(page > 0 ? page : 0)}/>
  const next = <BSPagination.Next disabled={page === totalPages} onClick={() => setPage(page < totalPages ? page+1 : totalPages)}/>

  return (
    <BSPagination>
      {prev}
      <BSPagination.First onClick={() => {
        setPage(0);
      }}>{1}</BSPagination.First>

      <BSPagination.Ellipsis disabled/>     
      {getPageItems()}
      <BSPagination.Ellipsis disabled/>

      <BSPagination.Last onClick={() => {
        setPage(totalPages ?? 0);
      }}>{(totalPages ?? 0)+1}</BSPagination.Last>
      {next}
    </BSPagination>
  );
}
 
export default Pagination;