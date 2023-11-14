import { Link, useLocation } from 'react-router-dom';
import './sidebar.scss';
import { useState } from 'react';

const _Sidebar = () => {
    const [showMenu, setShowMenu] = useState(false);
    const pages = [["/user", "User"],
                   ["/mealplans", "Meal Plans"],
                   ["/inventory", "Inventory"],
                   ["/health", "Health"]];
    return (
        <div style={{height: "100wh"}}>
            <div className='sidebar'>
                <div className='stuff'>
                    <div className='logo'>
                        <span>🥪</span>
                        <span>Yeee</span>
                    </div>
                    <button onClick={() => setShowMenu(!showMenu)} className={showMenu? "switch rotated" : "switch"}><div/><div/><div/></button>
                </div>
                <div className={showMenu ? "menu" : "menu hide"}>
                    {pages.map(page => {
                        return <Item key={page[0]} hideMenu={() => setShowMenu(false)} link={page[0]} name={page[1]}/>
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
    const isActive = loc.pathname.includes(props.link);
    return <Link to={props.link} onClick={props.hideMenu}><div className={isActive ? "menu-item item-active" : "menu-item"}>{props.name}</div></Link>
}

export default _Sidebar;