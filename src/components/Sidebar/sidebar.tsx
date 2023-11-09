import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import { Link, useLocation } from 'react-router-dom';
import './sidebar.scss';

const _Sidebar = () => {
    const activeStyle = {
        color: 'white',
        backgroundColor: '#57d570',
        borderRadius: '8px',
        fontWeight: 'bold',
    };

    const location = useLocation(); // Hook to get the current location

    // Function to determine if the item is active
    const isActive = (pathname: string): boolean => {
        return location.pathname === pathname;
    };

    return (
        <div className="sidebar">
            <Sidebar>
                <Menu className="menu" 
                    menuItemStyles={{
                        button: () => {
                            return {
                                "&:hover": {
                                    backgroundColor: "#04AA6D",
                                    color: "white !important",
                                    borderRadius: "8px !important",
                                    fontWeight: "bold !important"
                                }
                            }
                        }
                    }}    
                >
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