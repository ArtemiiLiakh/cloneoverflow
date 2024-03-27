import * as React from 'react';
import { NavLink } from 'react-router-dom';
import './taglist.css';

interface TaglistProps {
  tags?: string[];
}

const Taglist = ({ tags }: TaglistProps) => {
  const renderedTags = tags?.map((tag, index) => (
    <li key={index}>
      <NavLink to={`/?tags=[${tag}]`}>#{tag}</NavLink>
    </li>
  ));

  return (
    <ul className='taglist'>
      {renderedTags}
    </ul>
  );
}
 
export default Taglist;