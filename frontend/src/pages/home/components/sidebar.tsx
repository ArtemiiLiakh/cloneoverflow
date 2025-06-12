import * as React from 'react';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {
  return ( 
    <div className="sidebar">
      <ul className="sidebar-list">
        <NavLink to='/' end>
          <li className='sidebar-item'><i className="fa-sharp fa-solid fa-house"></i>  Home</li>
        </NavLink>

        <NavLink to='/questions' end>
          <li className='sidebar-item'><i className="fas fa-question-circle"></i>  Questions</li>
        </NavLink>

        <NavLink to='/tags' end>
          <li className='sidebar-item'><i className="fas fa-tags"></i>  Tags</li>
        </NavLink>

        <NavLink to='/questions/favorite' end>
          <li className='sidebar-item'><i className="fa-solid fa-bookmark"></i>  Saves</li>
        </NavLink>
      </ul>
    </div>
  );
}
 
export default Sidebar;