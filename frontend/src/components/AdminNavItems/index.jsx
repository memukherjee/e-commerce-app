import { useContext } from "react";
import { UserContext } from "../../contexts/userContext";
import NavItem from "../NavItem";

export default function AdminNavItems({ setNavOpen }) {
  const { user } = useContext(UserContext);

  return (
    <>
      {user && (
        <NavItem
          to="/admin/seller-requests"
          title="Seller Requests"
          setNavOpen={setNavOpen}
        />
      )}
      {user && (
        <NavItem
          to="/admin/messages"
          title="Messages"
          setNavOpen={setNavOpen}
        />
      )}
      {user ? (
        <NavItem to="/admin/logout" title="Log Out" setNavOpen={setNavOpen} />
      ) : (
        <NavItem to="/admin" title="Hello, Admin. Please Login First!" setNavOpen={setNavOpen} />
      )}
    </>
  );
}
