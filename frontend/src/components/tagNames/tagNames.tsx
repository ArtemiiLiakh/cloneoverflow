import * as React from 'react';
import { NavLink } from 'react-router-dom';

interface TaglistProps {
  tags?: string[];
}

const TagNames = ({ tags }: TaglistProps) => {
  const renderedTags = tags?.map((tag, index) => (
    <li key={index}>
      <NavLink to={`/?tags=[${tag}]`}>#{tag}</NavLink>
    </li>
  ));

  return (
    <ul className='tagNames'>
      {renderedTags}
    </ul>
  );
}
 
export default TagNames;