import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link, useLocation } from 'react-router-dom';
import './sidebar.scss';

const _Sidebar = () => {
    const activeStyle = {
        color: 'white',
        backgroundColor: '#57d570',
    };

    const location = useLocation(); // Hook to get the current location

    // Function to determine if the item is active
    const isActive = (pathname: string): boolean => {
        return location.pathname === pathname;
    };

    return (
        <div className="sidebar">
            <Sidebar>
                <Menu className="menu">
                    <MenuItem className="menu-item" style={isActive('/user') ? activeStyle : undefined} component={<Link to="/user"/>}>User</MenuItem>
                    <MenuItem className="menu-item" style={isActive('/mealplans') ? activeStyle : undefined} component={<Link to="/mealplans"/>}>Meal Plans</MenuItem>
                    <MenuItem className="menu-item" style={isActive('/inventory') ? activeStyle : undefined} component={<Link to="/inventory"/>}>Inventory</MenuItem>
                    <MenuItem className="menu-item" style={isActive('/health') ? activeStyle : undefined} component={<Link to="/health"/>}>Health</MenuItem>  
                </Menu>
            </Sidebar>
        </div>
    );
};

export default _Sidebar;