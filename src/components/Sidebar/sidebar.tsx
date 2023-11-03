import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import './sidebar.scss';

const _Sidebar = () => {
    return (
        <div>
            <Sidebar>
                <Menu className="menu">
                    <MenuItem className="menu-item" component={<Link to="/user"/>}>User</MenuItem>
                    <MenuItem className="menu-item" component={<Link to="/mealplans"/>}>Meal Plans</MenuItem>
                    <MenuItem className="menu-item" component={<Link to="/inventory"/>}>Inventory</MenuItem>
                    <MenuItem className="menu-item" component={<Link to="/health"/>}>Health</MenuItem>  
                </Menu>
            </Sidebar>
        </div>
    );
};

export default _Sidebar;