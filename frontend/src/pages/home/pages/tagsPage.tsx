import React, { useEffect, useState } from 'react';
import { MappedSearchTagsResponse, OrderBy, PaginationResponse, SearchTagsSortBy } from '@cloneoverflow/common';
import { SearchService } from '../../../api/services/search.service';
import config from '../../../config';
import { Card, Col, Form, Nav, Row } from 'react-bootstrap';
import Pagination from '../../../components/pagination/pagination';
import { GetPassedDate } from '../../../utils/stringUtils';
import { Link, createSearchParams } from 'react-router-dom';

const TagsPage = () => {
  const [tags, setTags] = useState<MappedSearchTagsResponse[]>([]);
  const [name, setName] = useState<string>('');
  const [sortBy, setSortBy] = useState<SearchTagsSortBy>(SearchTagsSortBy.POPULAR);
  const [pagination, setPagination] = useState<Partial<PaginationResponse>>({
    page: config.defaultPage,
    pageSize: 20,
    totalPages: 0,
    totalAmount: 0,
  });
  const [page, setPage] = useState<number>(0);

  useEffect(() => {
    SearchService.searchTags({
      name,
      sortBy,
      pagination: {
        page,
        pageSize: 20,
      }
    }).then((res) => {
      setTags(res.tags);
      setPagination(res.pagination);
    })
  }, [sortBy, name])

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
              <Card.Text>{GetPassedDate(tag.createdAt)}</Card.Text>
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
    <div className='page tagsPages'>
      <div className="header">
        <h3>Tags</h3>
        <p>Total amount: {pagination.totalAmount}</p>
        <div className="search">
          <Form onSubmit={(e) => {
            e.preventDefault();
          }}>
            <Form.Control type='text' placeholder='Search tags' onChange={(e) => {
              setTimeout(() => {
                setName(e.target.value);
              }, 1000);
            }}/>
          </Form>
          <div className="sort">
            <Nav variant='pills' defaultActiveKey={SearchTagsSortBy.POPULAR} onSelect={(e) => {
              setSortBy(e as SearchTagsSortBy);
              setPage(0);
            }}>
              <Nav.Item>
                <Nav.Link eventKey={SearchTagsSortBy.POPULAR}>Popular</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey={SearchTagsSortBy.NEWEST}>Newest</Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey={SearchTagsSortBy.NAME}>Name</Nav.Link>
              </Nav.Item>
            </Nav>
          </div>
        </div>
      </div>
      <div className="tagList">
        { tagList }
        <Pagination page={page} setPage={setPage} totalPages={pagination.totalPages ?? 0}/>
      </div>
    </div>
  );
}
 
export default TagsPage;