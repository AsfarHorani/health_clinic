import React from 'react';
import { NavLink } from 'react-router-dom';
import './navItem.css';

const navitem = (props)=>{
return(
<ul className="NavigationItem">
    <li>
        <NavLink
         activeClassName="active"
         to={props.link}
        
         exact = {props.exact}
         onClick={props.clicked}
         
         >
         {props.children}

        </NavLink>
    </li>
</ul>
)
}

export default navitem;