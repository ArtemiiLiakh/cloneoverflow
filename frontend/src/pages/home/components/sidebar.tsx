import * as React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return ( 
    <div className="sidebar">
      <ul className="sidebar-list">
        <NavLink to='/'>
          <li className='sidebar-item'><i className="fa-sharp fa-solid fa-house"></i> Home</li>
        </NavLink>

        <NavLink to='/questions'>
          <li className='sidebar-item'><i className="fas fa-question-circle"></i> Questions</li>
        </NavLink>

        <NavLink to='/tags'>
          <li className='sidebar-item'><i className="fas fa-tags"></i> Tags</li>
        </NavLink>
      </ul>
    </div>
  );
}
 
export default Sidebar;