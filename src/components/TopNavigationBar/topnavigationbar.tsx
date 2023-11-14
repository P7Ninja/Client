import { Link, useLocation } from 'react-router-dom';
import './topnavigationbar.scss';


const border = () => {

   const activeStyle = {
      color: 'white',
      backgroundColor: '#57d570',
  };

  const location = useLocation(); // Hook to get the current location

  // Function to determine if the item is active
  const isActive = (pathname: string): boolean => {
      return location.pathname === pathname;
  };

   return <div className="topnav">
      <Link to="/home" style={isActive('/home') ? activeStyle : undefined}>
         Home
      </Link>
      <Link to="/contact" style={isActive('/contact') ? activeStyle : undefined}>
         Contact
      </Link>
      <Link to="/about" style={isActive('/about') ? activeStyle : undefined}>
         About
      </Link>
 </div>
};

export default border;