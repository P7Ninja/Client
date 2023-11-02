import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link } from 'react-router-dom';
import './sidebar.css'

const _Sidebar = () => {
    return (
        <div>
            <Sidebar>
                <Menu>
                    <MenuItem className="menu-item" component={<Link to="/user"/>}>User</MenuItem>
                    <MenuItem className="menu-item" component={<Link to="/meal_plans"/>}>Meal Plans</MenuItem>
                    <MenuItem className="menu-item" component={<Link to="/inventory"/>}>Inventory</MenuItem>
                    <MenuItem className="menu-item" component={<Link to="/health"/>}>Health</MenuItem>  
                </Menu>
            </Sidebar>
        </div>
    );
};

export default _Sidebar;