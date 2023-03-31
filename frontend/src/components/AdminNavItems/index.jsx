import { useContext } from "react";
import { AdminContext } from "../../contexts/adminContext";
import NavItem from "../NavItem";

export default function AdminNavItems({ setNavOpen }) {
  const { admin } = useContext(AdminContext);

  return (
    <>
      {admin && (
        <NavItem
          to="/admin"
          title="Dashboard"
          setNavOpen={setNavOpen}
        />
      )}
      {admin && (
        <NavItem
          to="/admin/seller-requests"
          title="Seller Requests"
          setNavOpen={setNavOpen}
          admin={admin}
        />
      )}
      {/* {admin && (
        <NavItem
          to="/admin/messages"
          title="Messages"
          setNavOpen={setNavOpen}
        />
      )} */}
      {admin ? (
        <NavItem to="/admin/logout" title="Log Out" setNavOpen={setNavOpen} />
      ) : (
        <NavItem to="/admin" title="Hello, Admin. Please Login First!" setNavOpen={setNavOpen} />
      )}
    </>
  );
}
