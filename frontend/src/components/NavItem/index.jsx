import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { MouseOverNavItemContext } from "../../App";

export default function NavItem({to, title, setNavOpen}) {
  const { setMouseOverNavItem } = useContext(MouseOverNavItemContext);
  const path = useLocation().pathname;

  return (
    <li
      style={path === to ? { fontWeight: "bold" } : {}}
      className="nav-item flex align-middle px-4"
      onMouseOver={() => setMouseOverNavItem(true)}
      onMouseLeave={() => setMouseOverNavItem(false)}
      onClick={() => setNavOpen(false)}
    >

      <Link className="my-auto md:hover:text-white transition-all" to={to}>
        {title}
      </Link>
    </li>
  );
}
