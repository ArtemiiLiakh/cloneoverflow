import React, { useState, SetStateAction, Dispatch } from 'react';
import { Pagination as BootPagination } from 'react-bootstrap';

interface BootPaginationProps {
  page: number;
  setPage: Dispatch<SetStateAction<number>>,
  totalPages: number;
}

const Pagination = ({ page, setPage, totalPages }: BootPaginationProps) => {
  const getPageItems = () => {
    const minPages = Math.floor(page/5)*5;
    const maxPages = Math.min(minPages+5, totalPages+1);
    const items = [];
    for (let number = minPages; number < maxPages; number++) {
      items.push(
        <BootPagination.Item key={number} active={number === page} onClick={() => {
          setPage(number);
        }}>
          {number+1}
        </BootPagination.Item>,
      );
    }
    return items;
  }

  const prev = <BootPagination.Prev disabled={page === 0} onClick={() => setPage(page > 0 ? page-1 : 0)}/>
  const next = <BootPagination.Next disabled={page === totalPages} onClick={() => setPage(page < totalPages ? page+1 : totalPages)}/>

  return (
    <BootPagination>
      {prev}
      <BootPagination.First onClick={() => {
        setPage(0);
      }}>{1}</BootPagination.First>

      <BootPagination.Ellipsis disabled/>     
      {getPageItems()}
      <BootPagination.Ellipsis disabled/>

      <BootPagination.Last onClick={() => {
        setPage(totalPages ?? 0);
      }}>{(totalPages ?? 0)+1}</BootPagination.Last>
      {next}
    </BootPagination>
  );
}
 
export default Pagination;