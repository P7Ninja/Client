import { Link, useLocation } from 'react-router-dom';
import './sidebar.scss';
import { useContext, useState } from 'react';
import { UserContext } from '../../App';

const _Sidebar = () => {
    const [showMenu, setShowMenu] = useState(false);
    const pages = [
        ["/mealplans", "Meal Plans"],
        ["/inventory", "Inventory"],
        ["/health", "Health"],
        ["/account", "Account"],
    ];
    const userContext = useContext(UserContext);
    return (
        <div style={{ height: "100wh" }}>
            <div className='sidebar'>
                <div className='stuff'>
                    <div className='logo'>
                        <img src="/logo.png"/>
                        <span>Mealplanner</span>
                    </div>
                    <button onClick={() => setShowMenu(!showMenu)} className={(showMenu ? "switch rotated " : "switch ") + (userContext.user == null ? "invisible" : "")}><div /><div /><div /></button>
                </div>
                <div className={(showMenu ? "menu " : "menu hide ") + (userContext.user == null ? "invisible" : "")}>
                    {pages.map(page => {
                        return <Item key={page[0]} hideMenu={() => setShowMenu(false)} link={page[0]} name={page[1]} />
                    })}
                </div>
            </div>
        </div>
    );
};

interface ItemProps {
    link: string,
    name: string,
    hideMenu: () => void,
}
const Item = (props: ItemProps) => {
    const loc = useLocation();
    const isActive = loc.pathname.includes(props.link) || (loc.pathname == "/" && props.link == "/mealplans");
    return <Link to={props.link} onClick={props.hideMenu}><div className={isActive ? "menu-item item-active" : "menu-item"}>{props.name}</div></Link>
}

export default _Sidebar;