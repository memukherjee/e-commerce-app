import { AnimatePresence } from "framer-motion";
import { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { MouseOverNavItemContext } from "../../contexts/mouseOverNavItemContext";
import NavPopup from "../NavPopup";

export default function NavItem({ to, title, setNavOpen, ...rest }) {
  const { setMouseOverNavItem } = useContext(MouseOverNavItemContext);
  const path = useLocation().pathname;
  return (
    <li
      style={path === to ? { fontWeight: "bold" } : {}}
      className="nav-item flex items-center px-4"
      onMouseOver={() => setMouseOverNavItem(true)}
      onMouseLeave={() => setMouseOverNavItem(false)}
      onClick={() => setNavOpen(false)}
    >
      <Link className="my-auto md:hover:text-white transition-all" to={to}>
        {title}
      </Link>
      <AnimatePresence>
        {to === "/admin/seller-requests" &&
          rest?.admin?.totalPendingReq > 0 && (
            <NavPopup text={rest?.admin?.totalPendingReq} />
          )}
        {to === "/seller/orders" && rest?.seller?.totalOrderCount > 0 && (
          <NavPopup text={rest?.seller?.totalOrderCount} />
        )}
        {to === "/cart" && rest?.user?.totalCartItems > 0 && (
          <NavPopup text={rest?.user?.totalCartItems} />
        )}
      </AnimatePresence>
    </li>
  );
}
