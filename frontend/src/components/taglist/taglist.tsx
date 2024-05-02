import * as React from 'react';
import { NavLink, createSearchParams } from 'react-router-dom';

interface TaglistProps {
  tags?: string[];
}

const Taglist = ({ tags }: TaglistProps) => {
  const renderedTags = tags?.map((tag, index) => (
    <li key={index}>
      <NavLink to={`/questions?${
        createSearchParams({
          'q': `?#${tag}`,
        })}`}
      >#{tag}</NavLink>
    </li>
  ));

  return (
    <ul className='taglist'>
      {renderedTags}
    </ul>
  );
}
 
export default Taglist;