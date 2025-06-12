import * as React from 'react';

import { PaginationInfo, SearchTagsSortByEnum } from '@cloneoverflow/common';
import { SearchTagsDataItem } from '@cloneoverflow/common/api/search';
import { useEffect, useRef, useState } from 'react';
import { Card, Col, Form, Nav, Row } from 'react-bootstrap';
import { Link, createSearchParams } from 'react-router-dom';
import config from '@/config';
import { SearchService } from '@/api/services/search.service';
import Pagination from '@/components/pagination/pagination';

const TagsTab = () => {
  const [tags, setTags] = useState<SearchTagsDataItem[]>([]);
  const [name, setName] = useState<string>('');
  const [sortBy, setSortBy] = useState<SearchTagsSortByEnum>(SearchTagsSortByEnum.POPULAR);
  const [pagination, setPagination] = useState<Partial<PaginationInfo>>({
    page: config.defaultPage,
    pageSize: 20,
    totalPages: 0,
    totalAmount: 0,
  });
  const [page, setPage] = useState<number>(config.defaultPage);
  const currTimeout = useRef<NodeJS.Timeout>();

  useEffect(() => {
    SearchService.searchTags({
      name,
      sortBy,
      page,
      pageSize: 20,
    }).then((res) => {
      setTags(res.tags);
      setPagination(res.pagination);
    })
  }, [sortBy, name, page])

  const tagList = [];

  for (let row = 0; row < tags.length; row += 3) {
    const tagItems = [];
    for (let col = 0; col < 3; col++) {
      const tag = tags[row + col];
      if (!tag) {
        break;
      }
      tagItems.push(
        <Col key={tag.id} md={3} className='tagItem'>
          <Card key={tag.id}>
            <Card.Body>
              <Card.Title>
                <Link to={`/questions?${createSearchParams({
                  'q': `?#${tag.name}`,
                })}`}
                >{tag.name}</Link>
              </Card.Title>
              <Card.Text>Questions: {tag.questionsAmount}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      )
    }

    tagList.push(
      <Row key={row}>
        {tagItems}
      </Row>
    );
  }

  return (
    <div className='page tagsPage'>
      <div className="header">
        <h3>Tags</h3>
        <p>Total amount: {pagination.totalAmount}</p>
        <div className="search">
          <Form onSubmit={(e) => {
            e.preventDefault();
          }}>
            <Form.Control type='text' placeholder='Search tags' onChange={(e) => {
              if (currTimeout.current) {
                clearTimeout(currTimeout.current);
              }

              currTimeout.current = setTimeout(() => {
                setName(e.target.value);
              }, 1000);
            }} />
          </Form>
          <div className="sort">
            <Nav variant='pills' defaultActiveKey={SearchTagsSortByEnum.POPULAR} onSelect={(e) => {
              setSortBy(e as SearchTagsSortByEnum);
              setPage(0);
            }}>
              <Nav.Item>
                <Nav.Link eventKey={SearchTagsSortByEnum.POPULAR}>Popular</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey={SearchTagsSortByEnum.NEWEST}>Newest</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey={SearchTagsSortByEnum.NAME}>Name</Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
        </div>
      </div>
      <div className="tags">
        {tagList}
        <Pagination page={page} setPage={setPage} totalPages={pagination.totalPages ?? 0} />
      </div>
    </div>
  );
}

export default TagsTab;