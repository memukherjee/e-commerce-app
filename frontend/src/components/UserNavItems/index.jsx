import { useContext } from "react";
import { UserContext } from "../../contexts/userContext";
import NavItem from "../NavItem";

export default function UserNavItems({ setNavOpen }) {
  const { user } = useContext(UserContext);

  return (
    <>
      <NavItem to="/" title="Home" setNavOpen={setNavOpen} />
      <NavItem to="/categories" title="Categories" setNavOpen={setNavOpen} />
      <NavItem to="/about" title="About" setNavOpen={setNavOpen} />
      {user ? (
        <NavItem to="/account" title="Account" setNavOpen={setNavOpen} />
      ) : (
        <NavItem to="/auth" title="Sign Up" setNavOpen={setNavOpen} />
      )}
      {user ? (
        <NavItem to="/cart" title="My Cart" user={user} setNavOpen={setNavOpen} />
      ) : (
        <NavItem to="/contact-us" title="Contact Us" setNavOpen={setNavOpen} />
      )}
    </>
  );
}
